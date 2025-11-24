package project_service

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/alisinasoltani/partojshid/internal/dto/project"
	"github.com/alisinasoltani/partojshid/internal/model"
	"github.com/google/uuid"
)

const (
	uploadDir   = "./uploads/projects"
	maxFileSize = 5 * 1024 * 1024 // 5 MB
)

var allowedExt = map[string]bool{
	".jpg":  true,
	".jpeg": true,
	".png":  true,
	".webp": true,
}

func init() {
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		panic("cannot create upload directory: " + err.Error())
	}
}

// UploadImage – 5MB max, only jpg/png/webp, UUID filename
func (s *Service) UploadImage(projectID uint, file multipart.File, header *multipart.FileHeader, req project.UploadImageRequest) (*project.ImageResponse, error) {
	if header.Size > maxFileSize {
		return nil, fmt.Errorf("file too large: max 5MB")
	}

	ext := strings.ToLower(filepath.Ext(header.Filename))
	if !allowedExt[ext] {
		return nil, fmt.Errorf("invalid file type: only .jpg, .jpeg, .png, .webp allowed")
	}

	filename := uuid.New().String() + ext
	destPath := filepath.Join(uploadDir, filename)

	out, err := os.Create(destPath)
	if err != nil {
		return nil, fmt.Errorf("failed to save file: %v", err)
	}
	defer out.Close()

	if _, err = io.Copy(out, file); err != nil {
		os.Remove(destPath)
		return nil, fmt.Errorf("failed to write file: %v", err)
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
		ImagePath: "/uploads/projects/" + filename,
		AltText:   altText,
		SortOrder: sortOrder,
	}

	res, err := s.db.NamedExec(`
		INSERT INTO project_images (project_id, image_path, alt_text, sort_order)
		VALUES (:project_id, :image_path, :alt_text, :sort_order)`, &img)
	if err != nil {
		os.Remove(destPath)
		return nil, err
	}

	id, _ := res.LastInsertId()
	img.ID = uint(id)

	return &project.ImageResponse{
		ID:         img.ID,
		ProjectID:  img.ProjectID,
		ImageURL:   img.ImagePath,
		AltText:    req.AltText,
		SortOrder:  sortOrder,
		CreatedAt:  img.CreatedAt.Format(time.RFC3339),
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
			ID:         img.ID,
			ProjectID:  img.ProjectID,
			ImageURL:   img.ImagePath,
			AltText:    "",
			SortOrder:  img.SortOrder,
			CreatedAt:  img.CreatedAt.Format(time.RFC3339),
		}
		if img.AltText != nil {
			resp[i].AltText = *img.AltText
		}
	}
	return resp, nil
}

// DeleteImage – delete from disk + DB
func (s *Service) DeleteImage(imageID uint) error {
	var path string
	err := s.db.Get(&path, "SELECT image_path FROM project_images WHERE id = ?", imageID)
	if err != nil {
		return err
	}

	// Remove file from disk
	if err := os.Remove("." + path); err != nil && !os.IsNotExist(err) {
		// Log but don't fail if file already gone
		fmt.Printf("Warning: could not delete file %s: %v\n", path, err)
	}

	// Delete from DB
	_, err = s.db.Exec("DELETE FROM project_images WHERE id = ?", imageID)
	return err
}