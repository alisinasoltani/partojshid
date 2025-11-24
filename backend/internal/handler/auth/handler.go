// internal/handler/auth/handler.go
package auth

import (
	"net/http"
	"time"

	"github.com/alisinasoltani/partojshid/internal/dto"
	"github.com/alisinasoltani/partojshid/internal/services/auth"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	service *auth.Service
}

func NewHandler() *Handler {
	return &Handler{service: auth.New()}
}

// POST /api/auth/login
func (h *Handler) Login(c echo.Context) error {
	var req dto.LoginRequest
	if err := c.Bind(&req); err != nil {
		return err
	}

	token, user, err := h.service.Login(req.Username, req.Password)
	if err != nil {
		return err
	}

	resp := dto.LoginResponse{Token: token}
	resp.User.ID = user.ID
	resp.User.Username = user.Username
	resp.User.Role = user.Role

	return c.JSON(http.StatusOK, resp)
}

// POST /api/auth/register → admin only
func (h *Handler) Register(c echo.Context) error {
	var req dto.RegisterRequest
	if err := c.Bind(&req); err != nil {
		return err
	}

	user, err := h.service.Register(req)
	if err != nil {
		return echo.NewHTTPError(400, err.Error())
	}

	return c.JSON(http.StatusCreated, user)
}

// GET /api/auth/me
func (h *Handler) Me(c echo.Context) error {
	userID := c.Get("userID").(uint)
	user, err := h.service.GetByID(userID)
	if err != nil {
		return echo.NewHTTPError(404, "user not found")
	}

	resp := dto.MeResponse{
		ID:        user.ID,
		Username:  user.Username,
		Email:     user.Email,
		FullName:  user.FullName,
		Role:      user.Role,
		CreatedAt: user.CreatedAt.Format(time.RFC3339),
	}

	return c.JSON(http.StatusOK, resp)
}