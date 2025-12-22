package sitehandler

import (
	"net/http"

	"github.com/alisinasoltani/partojshid/internal/dto/site"
	"github.com/alisinasoltani/partojshid/internal/service/site_service"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	service *site_service.Service
}

func NewHandler() *Handler {
	return &Handler{service: site_service.New()}
}

// @Summary      Get site configuration (public)
// @Tags         Site
// @Produce      json
// @Success      200  {object}  site.SiteConfig
// @Router       /site [get]
func (h *Handler) Get(c echo.Context) error {
	config, err := h.service.Get()
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to load site config")
	}
	return c.JSON(http.StatusOK, config)
}

// @Summary      Update site configuration (admin only)
// @Tags         Site (Admin)
// @Accept       json
// @Produce      json
// @Param        config  body  site.UpdateSiteConfigRequest  true  "Full site config"
// @Security     BearerAuth
// @Success      200  {object}  site.SiteConfig
// @Router       /site [put]
func (h *Handler) Update(c echo.Context) error {
	var req site.UpdateSiteConfigRequest
	if err := c.Bind(&req); err != nil {
		return err
	}

	config, err := h.service.Update(req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, config)
}

// Optional: delete all (admin only)
// @Summary      Delete all site configs (admin only)
// @Tags         Site (Admin)
// @Security     BearerAuth
// @Success      204
// @Router       /site [delete]
func (h *Handler) Delete(c echo.Context) error {
	if err := h.service.DeleteAll(); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}