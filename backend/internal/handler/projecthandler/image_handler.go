package projecthandler

import (
	"net/http"
	"strconv"

	"github.com/alisinasoltani/partojshid/internal/dto/project"
	"github.com/labstack/echo/v4"
)

const maxFileSize = 5 * 1024 * 1024 // 5 MB — now defined here

// POST /api/projects/:id/images
func (h *Handler) UploadImage(c echo.Context) error {
	// Enforce max size at Echo level (prevents huge uploads early)
	c.Request().Body = http.MaxBytesReader(c.Response(), c.Request().Body, maxFileSize)

	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid project id")
	}

	file, err := c.FormFile("image")
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "image file required")
	}

	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	var req project.UploadImageRequest
	if err := c.Bind(&req); err != nil {
		return err
	}

	img, err := h.service.UploadImage(uint(projectID), src, file, req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusCreated, img)
}

// GET /api/projects/:id/images
func (h *Handler) ListImages(c echo.Context) error {
	projectID, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid project id")
	}

	imgs, err := h.service.ListImages(uint(projectID))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, imgs)
}

// DELETE /api/projects/:id/images/:image_id
func (h *Handler) DeleteImage(c echo.Context) error {
	imageID, err := strconv.ParseUint(c.Param("image_id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid image id")
	}

	if err := h.service.DeleteImage(uint(imageID)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}