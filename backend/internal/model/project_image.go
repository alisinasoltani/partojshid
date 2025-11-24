package model

import "time"

type ProjectImage struct {
	ID         uint      `db:"id"`
	ProjectID  uint      `db:"project_id"`
	ImagePath  string    `db:"image_path"`
	AltText    *string   `db:"alt_text"`
	SortOrder  int       `db:"sort_order"`
	CreatedAt  time.Time `db:"created_at"`
}