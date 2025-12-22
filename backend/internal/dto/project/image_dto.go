package project

type UploadImageRequest struct {
	ImagePath string `json:"image_path" validate:"required"`
	AltText   string `json:"alt_text" validate:"max=255"`
	SortOrder *int   `json:"sort_order" validate:"omitempty,min=0"`
}

type ImageResponse struct {
	ID        uint   `json:"id"`
	ProjectID uint   `json:"project_id"`
	ImageURL  string `json:"image_url"`
	AltText   string `json:"alt_text,omitempty"`
	SortOrder int    `json:"sort_order"`
	CreatedAt string `json:"created_at"`
}

type UpdateImageRequest struct {
	AltText   *string `json:"alt_text" validate:"omitempty,max=255"`
	SortOrder *int    `json:"sort_order" validate:"omitempty,min=0"`
}