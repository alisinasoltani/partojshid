package middlewares

import (
	"net/http"
	"strings"

	"github.com/alisinasoltani/partojshid/internal/pkg/jwt"
	"github.com/labstack/echo/v4"
)

func AuthJWT() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "missing Authorization header")
			}

			parts := strings.Split(authHeader, " ")
			if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid Authorization format")
			}

			tokenString := parts[1]
			claims, err := jwt.ValidateToken(tokenString)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "invalid or expired token")
			}

			c.Set("userID", claims.UserID)
			c.Set("role", claims.Role)

			return next(c)
		}
	}
}

func RequireRole(role string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			userRole, ok := c.Get("role").(string)
			if !ok || userRole != role {
				return echo.NewHTTPError(http.StatusForbidden, "insufficient permissions")
			}
			return next(c)
		}
	}
}

func RequireEditorOrAdmin() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			userRole, ok := c.Get("role").(string)
			if !ok || (userRole != "admin" && userRole != "editor") {
				return echo.NewHTTPError(http.StatusForbidden, "editor or admin required")
			}
			return next(c)
		}
	}
}

// Usage:
// e.Use(middleware.AuthJWT())
// e.Group("/admin").Use(middleware.RequireRole("admin"))
// e.Group("/projects").Use(middleware.RequireEditorOrAdmin())