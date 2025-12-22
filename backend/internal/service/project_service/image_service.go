package project_service

import (
	"fmt"
	"strings"
	"time"

	"github.com/alisinasoltani/partojshid/internal/dto/project"
	"github.com/alisinasoltani/partojshid/internal/model"
)

func (s *Service) UploadImage(projectID uint, imagePath string, req project.UploadImageRequest) (*project.ImageResponse, error) {
	if !strings.HasPrefix(imagePath, "/images/projects/") || !strings.HasSuffix(imagePath, ".avif") {
		return nil, fmt.Errorf("invalid image path: must start with /images/projects/ and end with .avif")
	}

	altText := (*string)(nil)
	if req.AltText != "" {
		altText = &req.AltText
	}

	sortOrder := 999
	if req.SortOrder != nil {
		sortOrder = *req.SortOrder
	}

	img := model.ProjectImage{
		ProjectID: projectID,
		ImagePath: imagePath,
		AltText:   altText,
		SortOrder: sortOrder,
	}

	res, err := s.db.NamedExec(`
		INSERT INTO project_images (project_id, image_path, alt_text, sort_order)
		VALUES (:project_id, :image_path, :alt_text, :sort_order)`, &img)
	if err != nil {
		return nil, err
	}

	id, _ := res.LastInsertId()
	img.ID = uint(id)

	return &project.ImageResponse{
		ID:        img.ID,
		ProjectID: img.ProjectID,
		ImageURL:  img.ImagePath,
		AltText:   req.AltText,
		SortOrder: sortOrder,
		CreatedAt: img.CreatedAt.Format(time.RFC3339),
	}, nil
}

// ListImages – get all images for a project, sorted
func (s *Service) ListImages(projectID uint) ([]project.ImageResponse, error) {
	var imgs []model.ProjectImage
	err := s.db.Select(&imgs, `
		SELECT id, project_id, image_path, alt_text, sort_order, created_at 
		FROM project_images 
		WHERE project_id = ? 
		ORDER BY sort_order ASC, created_at ASC`, projectID)
	if err != nil {
		return nil, err
	}

	resp := make([]project.ImageResponse, len(imgs))
	for i, img := range imgs {
		resp[i] = project.ImageResponse{
			ID:        img.ID,
			ProjectID: img.ProjectID,
			ImageURL:  img.ImagePath,
			AltText:   "",
			SortOrder: img.SortOrder,
			CreatedAt: img.CreatedAt.Format(time.RFC3339),
		}
		if img.AltText != nil {
			resp[i].AltText = *img.AltText
		}
	}
	return resp, nil
}

// GetImage – get a single image by ID
func (s *Service) GetImage(imageID uint) (*project.ImageResponse, error) {
	var img model.ProjectImage
	err := s.db.Get(&img, "SELECT * FROM project_images WHERE id = ?", imageID)
	if err != nil {
		return nil, err
	}

	resp := project.ImageResponse{
		ID:        img.ID,
		ProjectID: img.ProjectID,
		ImageURL:  img.ImagePath,
		AltText:   "",
		SortOrder: img.SortOrder,
		CreatedAt: img.CreatedAt.Format(time.RFC3339),
	}
	if img.AltText != nil {
		resp.AltText = *img.AltText
	}
	return &resp, nil
}

// UpdateImage – update image details
func (s *Service) UpdateImage(imageID uint, req project.UpdateImageRequest) (*project.ImageResponse, error) {
	updates := map[string]interface{}{}
	if req.AltText != nil {
		updates["alt_text"] = *req.AltText
	}
	if req.SortOrder != nil {
		updates["sort_order"] = *req.SortOrder
	}

	if len(updates) == 0 {
		return s.GetImage(imageID)
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
	args = append(args, imageID)

	var count int
	s.db.Get(&count, "SELECT COUNT(*) FROM project_images WHERE id = ?", imageID)
	fmt.Printf("DEBUG: Looking for image ID %d, found count: %d\n", imageID, count)

	query := "UPDATE project_images SET " + setClause + " WHERE id = ?"
	_, err := s.db.Exec(query, args...)
	if err != nil {
		return nil, err
	}

	return s.GetImage(imageID)
}

// DeleteImage – delete from DB only
func (s *Service) DeleteImage(imageID uint) error {
	_, err := s.db.Exec("DELETE FROM project_images WHERE id = ?", imageID)
	return err
}
