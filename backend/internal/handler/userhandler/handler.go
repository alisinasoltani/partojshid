package userhandler

import (
	"net/http"
	"strconv"

	"github.com/alisinasoltani/partojshid/internal/dto/user"
	"github.com/alisinasoltani/partojshid/internal/service/user_service"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	service *user_service.Service
}

func NewHandler() *Handler {
	return &Handler{service: user_service.New()}
}

// Create godoc
// @Summary      Create new user (admin only)
// @Tags         Users (Admin)
// @Accept       json
// @Produce      json
// @Param        user  body      user.CreateUserRequest  true  "User data"
// @Security     BearerAuth
// @Success      201  {object}  user.UserResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /users [post]
func (h *Handler) Create(c echo.Context) error {
	var req user.CreateUserRequest
	if err := c.Bind(&req); err != nil {
		return err // ← validation happens automatically
	}

	resp, err := h.service.Create(req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusCreated, resp)
}

// Update godoc
// @Summary      Update user (admin only)
// @Tags         Users (Admin)
// @Accept       json
// @Produce      json
// @Param        id    path      int                     true  "User ID"
// @Param        user  body      user.UpdateUserRequest  true  "Updated fields"
// @Security     BearerAuth
// @Success      200  {object}  user.UserResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /users/{id} [put]
func (h *Handler) Update(c echo.Context) error {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)

	var req user.UpdateUserRequest
	if err := c.Bind(&req); err != nil {
		return err // ← validation auto-triggered
	}

	resp, err := h.service.Update(uint(id), req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, resp)
}

// List godoc
// @Summary      List all users (admin only)
// @Tags         Users (Admin)
// @Produce      json
// @Security     BearerAuth
// @Success      200  {array}   user.UserResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /users [get]
func (h *Handler) List(c echo.Context) error {
	users, err := h.service.List()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, users)
}

// Get godoc
// @Summary      Get user by ID (admin only)
// @Tags         Users (Admin)
// @Produce      json
// @Param        id   path      int  true  "User ID"
// @Security     BearerAuth
// @Success      200  {object}  user.UserResponse
// @Failure      404  {object}  middlewares.ErrorResponse
// @Router       /users/{id} [get]
func (h *Handler) Get(c echo.Context) error {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	resp, err := h.service.Get(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "user not found")
	}
	return c.JSON(http.StatusOK, resp)
}

// Delete godoc
// @Summary      Delete user (admin only)
// @Tags         Users (Admin)
// @Security     BearerAuth
// @Param        id   path      int  true  "User ID"
// @Success      204
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /users/{id} [delete]
func (h *Handler) Delete(c echo.Context) error {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	if err := h.service.Delete(uint(id)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}