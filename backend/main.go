// main.go
// @title           Partojshid API
// @version         1.0
// @description     Personal portfolio & project management API
// @termsOfService  https://partojshid.ir/terms

// @contact.name   Jeyshid
// @contact.email  jeyshid@example.com

// @license.name   MIT
// @license.url    https://opensource.org/licenses/MIT

// @host      localhost:8080
// @BasePath  /api

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

package main

import (
	"os"
	"time"

	"github.com/alisinasoltani/partojshid/config"
	_ "github.com/alisinasoltani/partojshid/docs"
	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/handler/auth"
	"github.com/alisinasoltani/partojshid/internal/handler/projecthandler"
	"github.com/alisinasoltani/partojshid/internal/handler/userhandler"
	"github.com/alisinasoltani/partojshid/internal/middlewares"
	// "github.com/alisinasoltani/partojshid/internal/pkg/ratelimiter"
	"github.com/go-playground/validator/v10"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"github.com/swaggo/echo-swagger"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
)

var validate *validator.Validate

func main() {
	// Load config
	config.Load()

	// Connect to DB
	database.Get()

	// SETUP LOGGING — FILE WITH MONTHLY ROTATION

	validate = validator.New(validator.WithRequiredStructEnabled())

	// In-memory rate limiter (used by middlewares)
	rateLimits := middlewares.RateLimits

	// Echo
	e := echo.New()
	e.Static("/uploads", "uploads")
	e.Logger = newEchoLogger()

	// Fix Postman/curl double-read EOF bug globally
	e.Pre(middleware.RemoveTrailingSlash())

	// Swagger UI
	e.GET("/swagger/*", echoSwagger.WrapHandler, func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			role := c.Get("role")
			if role != "admin" {
				return echo.NewHTTPError(404, "not found")
			}
			return next(c)
		}
	})

	// Global middlewares
	e.Use(middleware.Logger())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `{"time":"${time_rfc3339}","id":"${id}","remote_ip":"${remote_ip}",` +
			`"method":"${method}","uri":"${uri}","status":${status},"error":"${error}"}` + "\n",
	}))
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://127.0.0.1:3000"},         // Explicit for dev; add your prod domain later
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS}, // Explicitly include OPTIONS
		AllowHeaders: []string{
			echo.HeaderOrigin,
			echo.HeaderContentType,
			echo.HeaderAuthorization,
			echo.HeaderAccept,
			echo.HeaderXRequestedWith,
		},
		AllowCredentials: true,  // Required if using cookies/JWT in future
		MaxAge:           86400, // Cache preflight for 24 hours
	}))
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.BodyLimit("1M")) // ← safe body limit
	e.Use(middleware.Recover())       // ← built-in, safe
	e.Use(middleware.RequestID())
	e.Use(middlewares.ValidationMiddleware())

	// Health check
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]any{"status": "ok", "time": time.Now().UTC().Format(time.RFC3339)})
	})

	// Handlers
	projectH := projecthandler.NewHandler()
	userH := userhandler.NewHandler()
	authHandler := auth.NewHandler()

	// Auth routes
	auth := e.Group("/api/auth")
	// @tags Auth
	auth.POST("/login", authHandler.Login, rateLimits["login"])
	// @tags Auth
	auth.POST("/register", authHandler.Register, middlewares.AuthJWT(), middlewares.RequireRole("admin"))
	// @tags Auth
	auth.GET("/me", authHandler.Me, middlewares.AuthJWT())

	// Public routes
	public := e.Group("/api/projects")
	// @tags Projects
	public.GET("", projectH.List, rateLimits["global"])
	// @tags Projects
	public.GET("/:id", projectH.Get, rateLimits["global"])

	// Editor routes
	editor := e.Group("/api/projects")
	editor.Use(
		middlewares.AuthJWT(),
		middlewares.RequireEditorOrAdmin(),
		rateLimits["write"],
	)
	// @tags Projects (Admin)
	{
		editor.POST("", projectH.Create)
		// @tags Projects (Admin)
		editor.PUT("/:id", projectH.Update)
		// @tags Projects (Admin)
		editor.DELETE("/:id", projectH.Delete)
		// @tags Projects (Admin)
		editor.GET("", projectH.List)
		// @tags Projects (Admin)
		editor.GET("/:id", projectH.Get)
	}

	// Admin users
	admin := e.Group("/api/users")
	admin.Use(
		middlewares.AuthJWT(),
		middlewares.RequireRole("admin"),
		rateLimits["write"],
	)
	// @tags Users (Admin)
	{
		admin.GET("", userH.List)
		// @tags Users (Admin)
		admin.GET("/:id", userH.Get)
		// @tags Users (Admin)
		admin.POST("", userH.Create)
		// @tags Users (Admin)
		admin.PUT("/:id", userH.Update)
		// @tags Users (Admin)
		admin.DELETE("/:id", userH.Delete)
	}

	// Start server
	cfg := config.Load()
	log.Printf("Server starting on http://localhost:%s", config.Load().Port)
	log.Fatal(e.Start(":" + cfg.Port))
	log.Printf("Health → Health:     http://localhost:%s/health", cfg.Port)
	log.Printf(" → Projects:   http://localhost:%s/api/projects", cfg.Port)
	log.Printf(" → Admin users: http://localhost:%s/api/users (admin only)", cfg.Port)

}

func newEchoLogger() echo.Logger {
	// Create logs directory
	os.MkdirAll("logs", 0755)

	// Rotate logs monthly
	writer := zapcore.AddSync(&lumberjack.Logger{
		Filename:   "logs/app.log",
		MaxSize:    100, // MB
		MaxBackups: 12,  // keep 12 months
		MaxAge:     365, // days
		LocalTime:  true,
		Compress:   true,
	})

	// JSON format
	core := zapcore.NewCore(
		zapcore.NewJSONEncoder(zap.NewProductionEncoderConfig()),
		writer,
		zap.InfoLevel,
	)

	// Create zap logger + use Echo's official adapter
	zapLogger := zap.New(core)
	echoLogger := log.New("partojshid") // Echo's logger
	echoLogger.SetLevel(log.INFO)
	echoLogger.SetOutput(writer) // write to rotating file
	echoLogger.SetHeader("${time_rfc3339} ${level} ${prefix} ${message}")

	// Also sync on exit
	defer zapLogger.Sync()

	return echoLogger
}
