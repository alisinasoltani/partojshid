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

// List godoc
// @Summary      List projects
// @Description  Get paginated list of projects. Public sees only visible ones. Use ?editor=1 with admin/editor token to see hidden projects.
// @Tags         Projects
// @Accept       json
// @Produce      json
// @Param        page      query     int     false  "Page number"        minimum(1) default(1)
// @Param        per_page  query     int     false  "Items per page"     minimum(1) maximum(100) default(10)
// @Param        editor    query     boolean false  "Show hidden projects (admin/editor only)"
// @Success      200       {object}  project.PaginatedProjectsResponse
// @Failure      400       {object}  middlewares.ErrorResponse
// @Failure      500       {object}  middlewares.ErrorResponse
// @Router       /projects [get]
func (h *Handler) List(c echo.Context) error {
	page, _ := strconv.Atoi(c.QueryParam("page"))
	if page < 1 { page = 1 }
	perPage, _ := strconv.Atoi(c.QueryParam("per_page"))
	if perPage < 1 || perPage > 100 { perPage = 10 }

	isEditor := c.Get("role") != nil && (c.Get("role").(string) == "admin" || c.Get("role").(string) == "editor")
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

// Get godoc
// @Summary      Get a project
// @Description  Retrieve a single project by ID. Hidden projects return 404 for public users.
// @Tags         Projects
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Project ID"
// @Success      200  {object}  project.ProjectResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      404  {object}  middlewares.ErrorResponse
// @Router       /projects/{id} [get]
func (h *Handler) Get(c echo.Context) error {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	p, err := h.service.Get(uint(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "project not found")
	}

	if !p.IsVisible {
		if role := c.Get("role"); role == nil || (role.(string) != "admin" && role.(string) != "editor") {
			return echo.NewHTTPError(http.StatusNotFound, "project not found")
		}
	}
	return c.JSON(http.StatusOK, p)
}

// Create godoc
// @Summary      Create a new project
// @Description  Only editors and admins can create projects
// @Tags         Projects (Admin)
// @Accept       json
// @Produce      json
// @Param        project  body      project.CreateProjectRequest  true  "Project data"
// @Security     BearerAuth
// @Success      201  {object}  project.ProjectResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /projects [post]
func (h *Handler) Create(c echo.Context) error {
	var req project.CreateProjectRequest
	if err := c.Bind(&req); err != nil {
		return err // ← validation auto-triggered
	}

	userID := c.Get("userID").(uint)
	p, err := h.service.Create(req, userID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusCreated, p)
}

// Update godoc
// @Summary      Update a project
// @Description  Only editors and admins can update
// @Tags         Projects (Admin)
// @Accept       json
// @Produce      json
// @Param        id       path      int                       true  "Project ID"
// @Param        project  body      project.UpdateProjectRequest  true  "Updated fields"
// @Security     BearerAuth
// @Success      200  {object}  project.ProjectResponse
// @Failure      400  {object}  middlewares.ErrorResponse
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Router       /projects/{id} [put]
func (h *Handler) Update(c echo.Context) error {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)

	var req project.UpdateProjectRequest
	if err := c.Bind(&req); err != nil {
		return err // ← validation auto-triggered
	}

	p, err := h.service.Update(uint(id), req)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, p)
}

// Delete godoc
// @Summary      Delete a project
// @Description  Only editors and admins can delete
// @Tags         Projects (Admin)
// @Security     BearerAuth
// @Param        id   path      int  true  "Project ID"
// @Success      204  {string}  string  "No Content"
// @Failure      401  {object}  middlewares.ErrorResponse
// @Failure      403  {object}  middlewares.ErrorResponse
// @Failure      500  {object}  middlewares.ErrorResponse
// @Router       /projects/{id} [delete]
func (h *Handler) Delete(c echo.Context) error {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	if err := h.service.Delete(uint(id)); err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to delete project")
	}
	return c.NoContent(http.StatusNoContent)
}