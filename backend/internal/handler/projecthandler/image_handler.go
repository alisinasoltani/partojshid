package projecthandler

import (
	"net/http"
	"strconv"

	"github.com/alisinasoltani/partojshid/internal/dto/project"
	"github.com/labstack/echo/v4"
)

const maxFileSize = 5 * 1024 * 1024 // 5 MB

func (h *Handler) UploadImage(c echo.Context) error {
	c.Request().Body = http.MaxBytesReader(c.Response(), c.Request().Body, maxFileSize)

	projectID, _ := strconv.ParseUint(c.Param("id"), 10, 32)

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
		return err // ← validation auto-triggered (max=255 on alt_text, min=0 on sort_order)
	}

	img, err := h.service.UploadImage(uint(projectID), src, file, req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusCreated, img)
}

func (h *Handler) ListImages(c echo.Context) error {
	projectID, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	imgs, err := h.service.ListImages(uint(projectID))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, imgs)
}

func (h *Handler) DeleteImage(c echo.Context) error {
	imageID, _ := strconv.ParseUint(c.Param("image_id"), 10, 32)
	if err := h.service.DeleteImage(uint(imageID)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}