package site_service

import (
	"encoding/json"

	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/dto/site"
	"github.com/jmoiron/sqlx"
)

type Service struct {
	db *sqlx.DB
}

func New() *Service {
	return &Service{db: database.Get()}
}

func (s *Service) Get() (*site.SiteConfig, error) {
	var cfg struct {
		Data json.RawMessage `db:"data"`
	}
	err := s.db.Get(&cfg, `SELECT data FROM site_config ORDER BY id DESC LIMIT 1`)
	if err != nil {
		return nil, err
	}

	var config site.SiteConfig
	if err := json.Unmarshal(cfg.Data, &config); err != nil {
		return nil, err
	}

	return &config, nil
}

func (s *Service) Update(req site.UpdateSiteConfigRequest) (*site.SiteConfig, error) {
	// Load current
	current, err := s.Get()
	if err != nil {
		current = &site.SiteConfig{}
	}

	// Merge
	if req.Title != nil {
		current.Title = *req.Title
	}
	if req.Navbar != nil {
		current.Navbar = *req.Navbar
	}
	if req.About != nil {
		current.About = *req.About
	}
	if req.Projects != nil {
		current.Projects = *req.Projects
	}
	if req.Stats != nil {
		current.Stats = *req.Stats
	}
	if req.Services != nil {
		current.Services = *req.Services
	}
	if req.Lodge != nil {
		current.Lodge = *req.Lodge
	}
	if req.LodgeProjects != nil {
		current.LodgeProjects = *req.LodgeProjects
	}
	if req.Licenses != nil {
		current.Licenses = *req.Licenses
	}
	if req.Footer != nil {
		current.Footer = *req.Footer
	}

	// Save
	data, err := json.Marshal(current)
	if err != nil {
		return nil, err
	}

	_, err = s.db.Exec(`INSERT INTO site_config (data) VALUES (?)`, data)
	if err != nil {
		return nil, err
	}

	return current, nil
}

func (s *Service) DeleteAll() error {
	_, err := s.db.Exec(`DELETE FROM site_config`)
	return err
}