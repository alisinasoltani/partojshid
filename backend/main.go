package main

import (
	"log"

	"github.com/alisinasoltani/partojshid/config"
	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	cfg := config.Load()

	// Initialize DB (singleton + migrations)
	database.Get()

	e := echo.New()

	// Basic middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Health check
	e.GET("/health", func(c echo.Context) error {
		return c.JSON(200, map[string]string{"status": "ok"})
	})

	log.Printf("Server starting on :%s", cfg.Port)
	log.Fatal(e.Start(":" + cfg.Port))
}