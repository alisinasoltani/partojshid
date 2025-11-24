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
	"log"
	"time"

	"github.com/alisinasoltani/partojshid/config"
	_ "github.com/alisinasoltani/partojshid/docs"
	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/handler/projecthandler"
	"github.com/alisinasoltani/partojshid/internal/handler/userhandler"
	"github.com/alisinasoltani/partojshid/internal/middlewares"
	"github.com/alisinasoltani/partojshid/internal/pkg/ratelimiter"
	"github.com/go-playground/validator/v10"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/swaggo/echo-swagger"
)

var validate *validator.Validate

func main() {
	// Load config
	config.Load()

	// Connect to DB
	database.Get()

	validate = validator.New(validator.WithRequiredStructEnabled())

	// In-memory rate limiter (used by middlewares)
	limiter := ratelimiter.New()                              // ← fixed: used
	rateLimits := middlewares.NewRateLimitMiddleware(limiter) // ← now limiter is used

	// Echo
	e := echo.New()
	e.Static("/uploads", "uploads")

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
	e.Use(middleware.RequestID())
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: `{"time":"${time_rfc3339}","id":"${id}","remote_ip":"${remote_ip}",` +
			`"method":"${method}","uri":"${uri}","status":${status},"error":"${error}"}` + "\n",
	}))
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAuthorization},
	}))
	e.Use(middlewares.ValidationMiddleware())
	e.Use(middlewares.CustomErrorHandler())

	// Health check
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]any{"status": "ok", "time": time.Now().UTC().Format(time.RFC3339)})
	})

	// Handlers
	projectH := projecthandler.NewHandler()
	userH := userhandler.NewHandler() // ← one instance, reused

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
		// @tags Projects (Admin)
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
		// @tags Users (Admin)
	}

	// Start server
	cfg := config.Load()
	log.Printf("Server starting on http://localhost:%s", config.Load().Port)
	log.Fatal(e.Start(":" + config.Load().Port))
	log.Printf("Health → Health:     http://localhost:%s/health", cfg.Port)
	log.Printf(" → Projects:   http://localhost:%s/api/projects", cfg.Port)
	log.Printf(" → Admin users: http://localhost:%s/api/users (admin only)", cfg.Port)

	log.Fatal(e.Start(":" + cfg.Port))
}
