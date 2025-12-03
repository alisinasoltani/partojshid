// internal/middlewares/error.go
package middlewares

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func CustomErrorHandler() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			err := next(c)
			if err == nil {
				return nil // Success → do nothing
			}

			// Only handle real HTTP errors
			if he, ok := err.(*echo.HTTPError); ok {
				if he.Internal != nil {
					c.Logger().Error(he.Internal)
				}
				return c.JSON(he.Code, map[string]string{"error": he.Message.(string)})
			}

			c.Logger().Error(err)
			return c.JSON(http.StatusInternalServerError, map[string]string{
				"error": "Internal server error",
			})
		}
	}
}