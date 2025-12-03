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

// Login godoc
// @Summary      Login user
// @Description  Authenticate and receive JWT token
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Param        credentials  body      dto.LoginRequest  true  "Login credentials"
// @Success      200  {object}  dto.LoginResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Router       /auth/login [post]
func (h *Handler) Login(c echo.Context) error {
	// fixes double-read EOF
	c.Request().Body = http.MaxBytesReader(c.Response(), c.Request().Body, 1024*1024)
	var req dto.LoginRequest
	if err := c.Bind(&req); err != nil {
		if err.Error() == "EOF" || err == http.ErrBodyReadAfterClose {
			// It's a preflight OPTIONS request — ignore
			return c.NoContent(http.StatusOK)
		}
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

// Register godoc
// @Summary      Register new user (admin only)
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Param        user  body      dto.RegisterRequest  true  "User registration data"
// @Security     BearerAuth
// @Success      201  {object}  user.UserResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /auth/register [post]
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

// Me godoc
// @Summary      Get current user
// @Description  Returns authenticated user's profile
// @Tags         Auth
// @Produce      json
// @Security     BearerAuth
// @Success      200  {object}  dto.MeResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Router       /auth/me [get]
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