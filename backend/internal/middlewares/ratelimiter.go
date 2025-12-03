package middlewares

import (
	"bytes"
	"io"
	"time"

	"github.com/alisinasoltani/partojshid/internal/pkg/ratelimiter"
	"github.com/labstack/echo/v4"
)

// Global shared limiter
var limiter = ratelimiter.New()

var RateLimits = map[string]echo.MiddlewareFunc{

	// Public reads — 100 req/min per IP
	"global": limiter.Middleware(
		100,
		time.Minute,
		func(c echo.Context) string {
			return "global:" + c.RealIP()
		},
	),

	// Authenticated writes — 30 req/min per user
	"write": limiter.Middleware(
		30,
		time.Minute,
		func(c echo.Context) string {
			userID := c.Get("userID").(uint)
			return "write:" + ratelimiter.UserKey(userID)
		},
	),

	// SMART LOGIN RATE LIMIT — per IP + username (safe & working!)
	"login": limiter.Middleware(
		10,
		time.Minute,
		func(c echo.Context) string {
			username := "unknown"

			// 1. Try FormValue (works for both form and JSON)
			if u := c.FormValue("username"); u != "" {
				username = u
				return "login:" + c.RealIP() + ":" + username
			}

			// 2. Safe JSON body peek (only if not already consumed)
			if c.Request().Body != nil {
				// Prefer GetBody() if available (Echo 4.10+)
				if getBody := c.Request().GetBody; getBody != nil {
					body, err := io.ReadAll(c.Request().Body)
					if err != nil {
						return "login:" + c.RealIP() + ":" + username
					}

					// Re-inject body correctly — THIS WAS THE BUG
					c.Request().Body = io.NopCloser(bytes.NewReader(body))

					// Fast username extraction
					if len(body) > 0 && body[0] == '{' {
						if u := extractUsernameFromJSON(body); u != "" {
							username = u
						}
					}
				}
			}

			return "login:" + c.RealIP() + ":" + username
		},
	),
}

// Fast username extraction from JSON (no full unmarshal)
func extractUsernameFromJSON(data []byte) string {
	// Look for "username":"..."
	needle := []byte(`"username"`)
	idx := bytes.Index(data, needle)
	if idx == -1 {
		return ""
	}

	start := idx + len(needle)
	for start < len(data) && (data[start] == ' ' || data[start] == ':') {
		start++
	}
	if start >= len(data) || data[start] != '"' {
		return ""
	}
	start++
	end := start
	for end < len(data) && data[end] != '"' {
		end++
	}
	return string(data[start:end])
}