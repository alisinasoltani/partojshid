package projecthandler

import (
	"net/http"
	"strconv"

	"github.com/alisinasoltani/partojshid/internal/dto/project"
	"github.com/labstack/echo/v4"
)

const maxFileSize = 5 * 1024 * 1024 // 5 MB

// UploadImage godoc
// @Summary      Upload image to project
// @Description  Upload a single image (max 5MB, jpg/png/webp)
// @Tags         Projects (Admin)
// @Accept       multipart/form-data
// @Produce      json
// @Param        id         path      int       true  "Project ID"
// @Param        image      formData  file      true  "Image file"
// @Param        alt_text   formData  string    false "Alt text (max 255 chars)"
// @Param        sort_order formData  int       false "Sort order" minimum(0)
// @Security     BearerAuth
// @Success      201  {object}  project.ImageResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /projects/{id}/images [post]
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

// ListImages godoc
// @Summary      List project images
// @Description  Get all images for a project
// @Tags         Projects
// @Produce      json
// @Param        id   path      int  true  "Project ID"
// @Success      200  {array}   project.ImageResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Router       /projects/{id}/images [get]
func (h *Handler) ListImages(c echo.Context) error {
	projectID, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	imgs, err := h.service.ListImages(uint(projectID))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, imgs)
}

// DeleteImage godoc
// @Summary      Delete project image
// @Description  Permanently delete an image (admin/editor only)
// @Tags         Projects (Admin)
// @Security     BearerAuth
// @Param        id         path      int  true  "Project ID"
// @Param        image_id   path      int  true  "Image ID"
// @Success      204
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /projects/{id}/images/{image_id} [delete]
func (h *Handler) DeleteImage(c echo.Context) error {
	imageID, _ := strconv.ParseUint(c.Param("image_id"), 10, 32)
	if err := h.service.DeleteImage(uint(imageID)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}