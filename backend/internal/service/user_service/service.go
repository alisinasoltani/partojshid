package user_service

import (
	"errors"

	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/dto/user"
	"github.com/alisinasoltani/partojshid/internal/model"
	"github.com/alisinasoltani/partojshid/internal/pkg/argon2"
	"github.com/jmoiron/sqlx"
)

type Service struct {
	db *sqlx.DB
}

func New() *Service {
	return &Service{db: database.Get()}
}

func (s *Service) List() ([]user.UserResponse, error) {
	var users []model.User
	err := s.db.Select(&users, `
		SELECT id, username, email, full_name, role, created_at, updated_at 
		FROM users ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}

	resp := make([]user.UserResponse, len(users))
	for i, u := range users {
		resp[i] = toResponse(u)
	}
	return resp, nil
}

func (s *Service) Get(id uint) (*user.UserResponse, error) {
	var u model.User
	err := s.db.Get(&u, `
		SELECT id, username, email, full_name, role, created_at, updated_at 
		FROM users WHERE id = ?`, id)
	if err != nil {
		return nil, err
	}
	resp := toResponse(u)
	return &resp, nil
}

func (s *Service) Create(req user.CreateUserRequest) (*user.UserResponse, error) {
	hash, err := argon2.Hash(req.Password)
	if err != nil {
		return nil, err
	}

	u := model.User{
		Username:     req.Username,
		Email:        req.Email,
		PasswordHash: hash,
		FullName:     req.FullName,
		Role:         req.Role,
	}

	res, err := s.db.NamedExec(`
		INSERT INTO users (username, email, password_hash, full_name, role)
		VALUES (:username, :email, :password_hash, :full_name, :role)`, &u)
	if err != nil {
		return nil, err
	}

	id, _ := res.LastInsertId()
	u.ID = uint(id)
	resp := toResponse(u)
	return &resp, nil
}

func (s *Service) Update(id uint, req user.UpdateUserRequest) (*user.UserResponse, error) {
	updates := map[string]interface{}{}
	args := []interface{}{}
	argPos := 1

	if req.Email != nil {
		updates["email = ?"] = *req.Email
		args = append(args, *req.Email)
		argPos++
	}
	if req.FullName != nil {
		updates["full_name = ?"] = *req.FullName
		args = append(args, *req.FullName)
		argPos++
	}
	if req.Role != nil {
		updates["role = ?"] = *req.Role
		args = append(args, *req.Role)
		argPos++
	}
	if req.Password != nil {
		hash, err := argon2.Hash(*req.Password)
		if err != nil {
			return nil, err
		}
		updates["password_hash = ?"] = hash
		args = append(args, hash)
		argPos++
	}

	if len(updates) == 0 {
		return nil, errors.New("no fields to update")
	}

	setClause := ""
	for k := range updates {
		if setClause != "" {
			setClause += ", "
		}
		setClause += k
	}

	query := "UPDATE users SET " + setClause + " WHERE id = ?"
	args = append(args, id)

	_, err := s.db.Exec(query, args...)
	if err != nil {
		return nil, err
	}

	return s.Get(id)
}

func (s *Service) Delete(id uint) error {
	_, err := s.db.Exec("DELETE FROM users WHERE id = ?", id)
	return err
}

func toResponse(u model.User) user.UserResponse {
	return user.UserResponse{
		ID:        u.ID,
		Username:  u.Username,
		Email:     u.Email,
		FullName:  u.FullName,
		Role:      u.Role,
		CreatedAt: u.CreatedAt.Format("2006-01-02T15:04:05Z"),
		UpdatedAt: u.UpdatedAt.Format("2006-01-02T15:04:05Z"),
	}
}