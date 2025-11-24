package auth

import (
	"net/http"
	"time"

	"github.com/alisinasoltani/partojshid/internal/dto"
	"github.com/alisinasoltani/partojshid/internal/service/auth"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	service *auth.Service
}

func NewHandler() *Handler {
	return &Handler{service: auth.New()}
}

func (h *Handler) Login(c echo.Context) error {
	var req dto.LoginRequest
	if err := c.Bind(&req); err != nil {
		return err // ← validation auto-triggered
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

func (h *Handler) Register(c echo.Context) error {
	var req dto.RegisterRequest
	if err := c.Bind(&req); err != nil {
		return err // ← validation auto-triggered
	}

	user, err := h.service.Register(req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusCreated, user)
}

func (h *Handler) Me(c echo.Context) error {
	userID := c.Get("userID").(uint)
	user, err := h.service.GetByID(userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "user not found")
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