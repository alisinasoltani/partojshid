package project

type UploadImageRequest struct {
	AltText   string `form:"alt_text" json:"alt_text,omitempty"`
	SortOrder *int   `form:"sort_order" json:"sort_order,omitempty"`
}

type ImageResponse struct {
	ID         uint   `json:"id"`
	ProjectID  uint   `json:"project_id"`
	ImageURL   string `json:"image_url"`
	AltText    string `json:"alt_text,omitempty"`
	SortOrder  int    `json:"sort_order"`
	CreatedAt  string `json:"created_at"`
}