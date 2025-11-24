package middlewares

import (
	"net/http"
	"fmt"

	"github.com/labstack/echo/v4"
)

type ErrorResponse struct {
	Error string `json:"error"`
}

func CustomErrorHandler() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) (err error) {
			defer func() {
				if r := recover(); r != nil {
					if r == http.ErrAbortHandler {
						panic(r)
					}
					err, ok := r.(error)
					if !ok {
						err = fmt.Errorf("%v", r)
					}
					c.Logger().Error(err)
					_ = c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "internal server error"})
				}
			}()

			err = next(c)
			if err == nil {
				return
			}

			// Echo HTTPError
			if he, ok := err.(*echo.HTTPError); ok {
				if he.Internal != nil {
					c.Logger().Errorf("Internal error: %v → %v", he.Message, he.Internal)
				}
				_ = c.JSON(he.Code, ErrorResponse{Error: toString(he.Message)})
				return
			} else {
				// Other errors (validation, business logic, etc.)
				c.Logger().Error(err)
				_ = c.JSON(http.StatusInternalServerError, ErrorResponse{Error: "internal server error"})
			}
			return
		}
	}
}

func toString(msg interface{}) string {
	if s, ok := msg.(string); ok {
		return s
	}
	if s, ok := msg.(fmt.Stringer); ok {
		return s.String()
	}
	return "an error occurred"
}