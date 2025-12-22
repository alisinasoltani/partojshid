package project_service

import (
	"time"

	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/dto/project"
	"github.com/alisinasoltani/partojshid/internal/model"
	"github.com/jmoiron/sqlx"
)

func strPtr(s *string) string {
	if s == nil {
		return ""
	}
	return *s
}

func stringPtrOrNil(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}

type Service struct {
	db *sqlx.DB
}

func New() *Service {
	return &Service{db: database.Get()}
}

type ListParams struct {
	Page    int
	PerPage int
	Public  bool // true = only visible projects (for public endpoint)
	Editor  bool // true = allow non-visible (for admin/editor)
}

type projectWithTotal struct {
	model.Project
	TotalCount int64 `db:"total_count"`
}

func (s *Service) List(params ListParams) (*project.PaginatedProjectsResponse, error) {
	if params.Page < 1 {
		params.Page = 1
	}
	if params.PerPage < 1 || params.PerPage > 100 {
		params.PerPage = 10
	}
	offset := (params.Page - 1) * params.PerPage

	var projects []projectWithTotal
	var total int64

	query := `
		SELECT p.*, COUNT(*) OVER() as total_count
		FROM projects p
		WHERE 1=1`
	args := []interface{}{}

	if params.Public {
		query += " AND p.is_visible = 1"
	}
	query += " ORDER BY p.display_order ASC, p.created_at DESC LIMIT ? OFFSET ?"
	args = append(args, params.PerPage, offset)

	err := s.db.Select(&projects, query, args...)
	if err != nil {
		return nil, err
	}

	if len(projects) > 0 {
		total = projects[0].TotalCount
	}

	resp := &project.PaginatedProjectsResponse{
		Data:       make([]project.ProjectResponse, len(projects)),
		Total:      total,
		Page:       params.Page,
		PerPage:    params.PerPage,
		TotalPages: (int(total) + params.PerPage - 1) / params.PerPage,
	}

	for i, p := range projects {
		projResp := toResponse(p.Project)

		// Fetch images for this project
		var images []model.ProjectImage
		err := s.db.Select(&images, `
        SELECT id, project_id, image_path, alt_text, sort_order, created_at
        FROM project_images
        WHERE project_id = ?
        ORDER BY sort_order ASC, created_at ASC`, p.ID)
		if err != nil {
			return nil, err
		}

		imgResponses := make([]project.ImageResponse, len(images))
		for j, img := range images {
			alt := ""
			if img.AltText != nil {
				alt = *img.AltText
			}
			imgResponses[j] = project.ImageResponse{
				ID:        img.ID,
				ProjectID: img.ProjectID,
				ImageURL:  img.ImagePath,
				AltText:   alt,
				SortOrder: img.SortOrder,
				CreatedAt: img.CreatedAt.Format(time.RFC3339),
			}
		}

		projResp.Images = imgResponses
		resp.Data[i] = *projResp
	}

	return resp, nil
}

func (s *Service) Get(id uint) (*project.ProjectResponse, error) {
	var p model.Project
	err := s.db.Get(&p, "SELECT * FROM projects WHERE id = ?", id)
	if err != nil {
		return nil, err
	}
	resp := toResponse(p)
	return resp, nil
}

func (s *Service) Create(req project.CreateProjectRequest, userID uint) (*project.ProjectResponse, error) {
	p := model.Project{
		Slug:            req.Slug,
		FullName:        req.FullName,
		Description:     req.Description,
		StartedAt:       stringPtrOrNil(req.StartedAt),
		EndedAt:         stringPtrOrNil(req.EndedAt),
		StartedAtJalali: req.StartedAtJalali,
		EndedAtJalali:   req.EndedAtJalali,
		Employer:        req.Employer,
		IsVisible:       true,
		DisplayOrder:    999,
		CreatedBy:       req.CreatedBy,
	}

	if req.IsVisible != nil {
		p.IsVisible = *req.IsVisible
	}
	if req.DisplayOrder != nil {
		p.DisplayOrder = *req.DisplayOrder
	}

	res, err := s.db.NamedExec(`
		INSERT INTO projects 
		(slug, full_name, description, started_at, ended_at, started_at_jalali, ended_at_jalali, employer, is_visible, display_order, created_by)
		VALUES (:slug, :full_name, :description, :started_at, :ended_at, :started_at_jalali, :ended_at_jalali, :employer, :is_visible, :display_order, :created_by)`, &p)
	if err != nil {
		return nil, err
	}

	id, _ := res.LastInsertId()
	p.ID = uint(id)

	resp := toResponse(p)
	return resp, nil
}

func (s *Service) Update(id uint, req project.UpdateProjectRequest) (*project.ProjectResponse, error) {
	updates := map[string]interface{}{}
	if req.FullName != nil {
		updates["full_name"] = *req.FullName
	}
	if req.Description != nil {
		updates["description"] = *req.Description
	}
	if req.StartedAt != nil {
		updates["started_at"] = *req.StartedAt
	}
	if req.EndedAt != nil {
		updates["ended_at"] = *req.EndedAt
	}
	if req.StartedAtJalali != nil {
		updates["started_at_jalali"] = *req.StartedAtJalali
	}
	if req.EndedAtJalali != nil {
		updates["ended_at_jalali"] = *req.EndedAtJalali
	}
	if req.Employer != nil {
		updates["employer"] = *req.Employer
	}
	if req.IsVisible != nil {
		updates["is_visible"] = *req.IsVisible
	}
	if req.DisplayOrder != nil {
		updates["display_order"] = *req.DisplayOrder
	}

	if len(updates) == 0 {
		return s.Get(id)
	}

	setClause := ""
	args := []interface{}{}
	for k, v := range updates {
		if setClause != "" {
			setClause += ", "
		}
		setClause += k + " = ?"
		args = append(args, v)
	}
	args = append(args, id)

	query := "UPDATE projects SET " + setClause + " WHERE id = ?"
	_, err := s.db.Exec(query, args...)
	if err != nil {
		return nil, err
	}

	return s.Get(id)
}

func (s *Service) Delete(id uint) error {
	_, err := s.db.Exec("DELETE FROM projects WHERE id = ?", id)
	return err
}

func toResponse(p model.Project) *project.ProjectResponse {
	resp := &project.ProjectResponse{
        ID:              p.ID,
        Slug:            p.Slug,
        FullName:        p.FullName,
        Description:     strPtr(p.Description),
        StartedAt:       strPtr(p.StartedAt),
        EndedAt:         strPtr(p.EndedAt),
        StartedAtJalali: strPtr(p.StartedAtJalali),
        EndedAtJalali:   strPtr(p.EndedAtJalali),
        Employer:        p.Employer,
        IsVisible:       p.IsVisible,
        DisplayOrder:    p.DisplayOrder,
        CreatedBy:       p.CreatedBy,
        CreatedAt:       p.CreatedAt.Format(time.RFC3339),
        UpdatedAt:       p.UpdatedAt.Format(time.RFC3339),
        Images:          []project.ImageResponse{},
    }
    return resp
}
