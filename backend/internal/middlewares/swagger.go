package middlewares

import "github.com/labstack/echo/v4"

func AdminOnlySwagger(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		role, ok := c.Get("role").(string)
		if !ok || role != "admin" {
			return echo.NewHTTPError(404, "not found") // 404 so no one knows it exists
		}
		return next(c)
	}
}