package projecthandler

import (
	"net/http"
	"strconv"
	"fmt"

	"github.com/alisinasoltani/partojshid/internal/dto/project"
	"github.com/labstack/echo/v4"
)

// UploadImage godoc
// @Summary      Upload image to project
// @Description  Provide image path (handled by frontend), alt text, and sort order
// @Tags         Projects (Admin)
// @Accept       json
// @Produce      json
// @Param        id         path      int       true  "Project ID"
// @Param        body       body      project.UploadImageRequest  true  "Image data"
// @Security     BearerAuth
// @Success      201  {object}  project.ImageResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /projects/{id}/images [post]
func (h *Handler) UploadImage(c echo.Context) error {
	projectID, _ := strconv.ParseUint(c.Param("id"), 10, 32)

	var req project.UploadImageRequest
	if err := c.Bind(&req); err != nil {
		return err // validation auto-triggered
	}

	img, err := h.service.UploadImage(uint(projectID), req.ImagePath, req)
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

// UpdateImage godoc
// @Summary      Update image details
// @Description  Update alt text or sort order for an image
// @Tags         Projects (Admin)
// @Accept       json
// @Produce      json
// @Param        id         path      int  true  "Project ID"
// @Param        image_id   path      int  true  "Image ID"
// @Param        body       body      project.UpdateImageRequest  true  "Update data"
// @Security     BearerAuth
// @Success      200  {object}  project.ImageResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /projects/{id}/images/{image_id} [put]
func (h *Handler) UpdateImage(c echo.Context) error {
    projectIDStr := c.Param("id")
    imageIDStr := c.Param("image_id")
    fmt.Printf("UPDATE IMAGE REQUEST: project_id=%s, image_id=%s\n", projectIDStr, imageIDStr)

    imageID, _ := strconv.ParseUint(imageIDStr, 10, 32)

    var req project.UpdateImageRequest
    if err := c.Bind(&req); err != nil {
        fmt.Printf("Bind error: %v\n", err)
        return err
    }

    fmt.Printf("Request body: %+v\n", req)

    img, err := h.service.UpdateImage(uint(imageID), req)
    if err != nil {
        fmt.Printf("Service error: %v\n", err)
        return echo.NewHTTPError(http.StatusBadRequest, err.Error())
    }
    return c.JSON(http.StatusOK, img)
}