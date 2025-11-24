// internal/middleware/ratelimit.go
package middleware

import (
	"encoding/json"
	_ "net/http"
	"time"

	"github.com/alisinasoltani/partojshid/internal/pkg/ratelimiter"
	"github.com/labstack/echo/v4"
)

func NewRateLimitMiddleware(l *ratelimiter.Limiter) map[string]echo.MiddlewareFunc {
	return map[string]echo.MiddlewareFunc{
		"global": l.Middleware(300, time.Minute/300, ratelimiter.IPKey), // 300/min per IP for public reads (e.g., GET /projects, /health)

		"login": func(next echo.HandlerFunc) echo.HandlerFunc {
			ipLimiter := l.Middleware(10, time.Minute/10, ratelimiter.IPKey) // 10/min per IP
			userLimiter := l.Middleware(5, time.Minute/5, func(c echo.Context) string {
				// Extract username from JSON body (assume { "username": "..." })
				body := struct{ Username string `json:"username"` }{}
				if err := json.NewDecoder(c.Request().Body).Decode(&body); err == nil && body.Username != "" {
					return ratelimiter.LoginKey(body.Username)
				}
				return "unknown" // Fallback if no username
			})

			return func(c echo.Context) error {
				if err := ipLimiter(next)(c); err != nil {
					return err
				}
				return userLimiter(next)(c)
			}
		},

		"auth": l.Middleware(120, time.Minute/120, func(c echo.Context) string {
			userID, ok := c.Get("userID").(uint)
			if !ok {
				return "unauth" // Should not happen with auth middleware
			}
			return ratelimiter.UserKey(userID)
		}), // 120/min per user for authenticated routes

		"write": l.Middleware(60, time.Minute/60, func(c echo.Context) string {
			userID, ok := c.Get("userID").(uint)
			if !ok {
				return "unauth"
			}
			return ratelimiter.UserKey(userID)
		}), // 60/min per user for writes (POST/PUT/DELETE)
	}
}

// Usage in main.go or handlers:
// e.Use(middleware.NewRateLimitMiddleware(limiter)["global"])