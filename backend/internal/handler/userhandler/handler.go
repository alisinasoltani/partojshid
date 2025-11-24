// internal/handler/userhandler/handler.go
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

func (h *Handler) Create(c echo.Context) error {
	var req user.CreateUserRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	resp, err := h.service.Create(req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusCreated, resp)
}

func (h *Handler) Update(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid user id")
	}

	var req user.UpdateUserRequest
	if err := c.Bind(&req); err != nil {
		return err
	}

	resp, err := h.service.Update(uint(id), req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, resp)
}

// ... List, Get, Delete unchanged ...