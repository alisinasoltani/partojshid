package projecthandler

import (
	"net/http"
	"strconv"

	"github.com/alisinasoltani/partojshid/internal/dto/project"
	"github.com/alisinasoltani/partojshid/internal/service/project_service"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	service *project_service.Service
}

func NewHandler() *Handler {
	return &Handler{service: project_service.New()}
}

// GET /api/projects
//   - Public: only visible projects (default)
//   - Editor/Admin + ?editor=1 → show hidden projects too
func (h *Handler) List(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("page"))
	if page < 1 {
		page = 1
	}
	perPage, _ := strconv.Atoi(c.QueryParam("per_page"))
	if perPage < 1 || perPage > 100 {
		perPage = 10
	}

	// Detect if caller is editor/admin
	isEditor := false
	if role := c.Get("role"); role != nil {
		r := role.(string)
		isEditor = r == "admin" || r == "editor"
	}
	editorMode := c.QueryParam("editor") == "1" && isEditor

	params := project_service.ListParams{
		Page:    page,
		PerPage: perPage,
		Public:  !editorMode,
		Editor:  editorMode,
	}

	resp, err := h.service.List(params)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to fetch projects")
	}
	return c.JSON(http.StatusOK, resp)
}

// GET /api/projects/:id
func (h *Handler) Get(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid project id")
	}

	p, err := h.service.Get(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "project not found")
	}

	// Hide non-visible projects from public
	if !p.IsVisible {
		if role := c.Get("role"); role == nil || (role.(string) != "admin" && role.(string) != "editor") {
			return echo.NewHTTPError(http.StatusNotFound, "project not found")
		}
	}

	return c.JSON(http.StatusOK, p)
}

// POST /api/projects   (editor+ only)
func (h *Handler) Create(c echo.Context) error {
	var req project.CreateProjectRequest
	if err := c.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	userID := c.Get("userID").(uint)
	p, err := h.service.Create(req, userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusCreated, p)
}

// PUT /api/projects/:id   (editor+ only)
func (h *Handler) Update(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid project id")
	}

	var req project.UpdateProjectRequest
	if err := c.Bind(&req); err != nil {
		return err
	}

	p, err := h.service.Update(uint(id), req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, p)
}

// DELETE /api/projects/:id   (editor+ only)
func (h *Handler) Delete(c echo.Context) error {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid project id")
	}

	if err := h.service.Delete(uint(id)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to delete project")
	}

	return c.NoContent(http.StatusNoContent)
}