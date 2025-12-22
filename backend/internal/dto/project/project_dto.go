package project

type CreateProjectRequest struct {
	Slug            string  `json:"slug" validate:"required,alphanum,max=100"`
	FullName        string  `json:"full_name" validate:"required,max=255"`
	Description     *string `json:"description,omitempty"`
	StartedAt       string  `json:"started_at,omitempty"`
	EndedAt         string  `json:"ended_at,omitempty"`
	StartedAtJalali *string `json:"started_at_jalali,omitempty"`
	EndedAtJalali   *string `json:"ended_at_jalali,omitempty"`
	Employer        string  `json:"employer,omitempty"`
	IsVisible       *bool   `json:"is_visible,omitempty"`
	DisplayOrder    *int    `json:"display_order,omitempty"`
	CreatedBy       string  `json:"created_by" validate:"required,oneof=jeyshid lodge"`
}

type UpdateProjectRequest struct {
	FullName        *string `json:"full_name,omitempty"`
	Description     *string `json:"description,omitempty"`
	StartedAt       *string `json:"started_at,omitempty"`
	EndedAt         *string `json:"ended_at,omitempty"`
	StartedAtJalali *string `json:"started_at_jalali,omitempty"`
	EndedAtJalali   *string `json:"ended_at_jalali,omitempty"`
	Employer        *string `json:"employer,omitempty"`
	IsVisible       *bool   `json:"is_visible,omitempty"`
	DisplayOrder    *int    `json:"display_order,omitempty"`
}

// Add this field to ProjectResponse struct
type ProjectResponse struct {
	ID              uint   `json:"id"`
	Slug            string `json:"slug"`
	FullName        string `json:"full_name"`
	Description     string `json:"description"`
	StartedAt       string `json:"started_at"`
	EndedAt         string `json:"ended_at"`
	StartedAtJalali string `json:"started_at_jalali"`
	EndedAtJalali   string `json:"ended_at_jalali"`
	Employer        string `json:"employer"`
	IsVisible       bool   `json:"is_visible"`
	DisplayOrder    int    `json:"display_order"`
	CreatedBy       string `json:"created_by"`
	CreatedAt       string `json:"created_at"`
	UpdatedAt       string `json:"updated_at"`
	Images []ImageResponse `json:"images,omitempty"`
}

type PaginatedProjectsResponse struct {
	Data       []ProjectResponse `json:"data"`
	Total      int64             `json:"total"`
	Page       int               `json:"page"`
	PerPage    int               `json:"per_page"`
	TotalPages int               `json:"total_pages"`
}
