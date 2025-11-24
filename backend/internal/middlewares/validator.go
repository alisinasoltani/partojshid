package middlewares

import (
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

// Global validator instance (set in main.go)
var validate *validator.Validate

// CustomValidator implements Echo's Validator interface
type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	if err := cv.validator.Struct(i); err != nil {
		// Convert validation errors to readable message
		var msg string
		for _, err := range err.(validator.ValidationErrors) {
			field := err.Field()
			switch err.Tag() {
			case "required":
				msg += field + " is required; "
			case "email":
				msg += "invalid email; "
			case "min":
				msg += field + " is too short; "
			case "max":
				msg += field + " is too long; "
			case "alphanum":
				msg += field + " must be alphanumeric; "
			case "oneof":
				msg += field + " must be one of allowed values; "
			default:
				msg += field + " is invalid; "
			}
		}
		return echo.NewHTTPError(http.StatusBadRequest, "Validation error: "+msg)
	}
	return nil
}

// ValidationMiddleware sets the validator for Echo
func ValidationMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Echo().Validator = &CustomValidator{validator: validate}
			return next(c)
		}
	}
}