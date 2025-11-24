package main

import (
	"log"
	"time"

	"github.com/alisinasoltani/partojshid/config"
	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/handler/projecthandler"
	"github.com/alisinasoltani/partojshid/internal/handler/userhandler"
	"github.com/alisinasoltani/partojshid/internal/middlewares"
	"github.com/alisinasoltani/partojshid/internal/pkg/ratelimiter"
	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/go-playground/validator/v10"
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

	// ================================================================
	// PUBLIC PROJECT ROUTES
	// ================================================================
	public := e.Group("/api/projects")
	public.GET("", projectH.List, rateLimits["global"])
	public.GET("/:id", projectH.Get, rateLimits["global"])

	// ================================================================
	// EDITOR + ADMIN PROJECT ROUTES
	// ================================================================
	editor := e.Group("/api/projects")
	editor.Use(
		middlewares.AuthJWT(),
		middlewares.RequireEditorOrAdmin(),
		rateLimits["write"],
	)
	{
		editor.POST("", projectH.Create)
		editor.PUT("/:id", projectH.Update)
		editor.DELETE("/:id", projectH.Delete)
		editor.GET("", projectH.List) // ?editor=1 shows hidden
		editor.GET("/:id", projectH.Get)
	}

	// ================================================================
	// ADMIN USER MANAGEMENT
	// ================================================================
	admin := e.Group("/api/users")
	admin.Use(
		middlewares.AuthJWT(),
		middlewares.RequireRole("admin"),
		rateLimits["write"],
	)
	{
		// Re-use the same handler instance — all methods exist
		admin.GET("", userH.List)
		admin.GET("/:id", userH.Get)
		admin.POST("", userH.Create)
		admin.PUT("/:id", userH.Update)
		admin.DELETE("/:id", userH.Delete)
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
