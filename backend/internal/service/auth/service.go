// internal/service/auth/service.go
package auth

import (
	"database/sql"
	"errors"
	"time"

	"github.com/alisinasoltani/partojshid/internal/database"
	"github.com/alisinasoltani/partojshid/internal/dto"
	"github.com/alisinasoltani/partojshid/internal/model"
	"github.com/alisinasoltani/partojshid/internal/pkg/argon2"
	"github.com/alisinasoltani/partojshid/internal/pkg/jwt"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
)

type Service struct {
	db *sqlx.DB
}

func New() *Service {
	return &Service{db: database.Get()}
}

var (
	ErrInvalidCredentials = echo.NewHTTPError(401, "invalid username or password")
	ErrAccountLocked      = echo.NewHTTPError(423, "account locked due to too many failed attempts")
)

func (s *Service) Login(username, password string) (string, *model.User, error) {
	var user model.User
	err := s.db.Get(&user, "SELECT * FROM users WHERE username = ? LIMIT 1", username)
	if err == sql.ErrNoRows {
		return "", nil, ErrInvalidCredentials
	}
	if err != nil {
		return "", nil, err
	}

	// Check if account is locked (fixed: use .Valid)
	if user.LockedUntil.Valid && time.Now().Before(user.LockedUntil.Time) {
		return "", nil, ErrAccountLocked
	}

	// Verify password
	match, err := argon2.Verify(password, user.PasswordHash)
	if err != nil {
		return "", nil, err
	}
	if !match {
		// Increment failed attempts + possible lockout
		_, err := s.db.Exec(`
		UPDATE users 
		SET failed_attempts = failed_attempts + 1,
		    locked_until = CASE 
		        WHEN failed_attempts + 1 >= 5 
		        THEN DATE_ADD(NOW(), INTERVAL POW(2, LEAST(failed_attempts, 10)) MINUTE)
		        ELSE locked_until 
		    END 
		WHERE id = ?`, user.ID)
		if err != nil {
			// Log it – we don't want to leak DB errors, but we should know
			// In production you’d use a proper logger
			// log.Printf("Failed to update failed_attempts for user %d: %v", user.ID, err)
		}

		return "", nil, ErrInvalidCredentials
	}

	// Login successful → reset attempts
	_, err = s.db.Exec(`
		UPDATE users 
		SET failed_attempts = 0, 
		    locked_until = NULL, 
		    last_login_at = NOW() 
		WHERE id = ?`, user.ID)
	if err != nil {
		return "", nil, err
	}

	token, err := jwt.GenerateToken(user.ID, user.Role)
	if err != nil {
		return "", nil, err
	}

	return token, &user, nil
}

func (s *Service) Register(req dto.RegisterRequest) (*model.User, error) {
	// Prevent non-admin from creating admin (extra safety – also enforced by route middleware)
	if req.Role == "admin" {
		return nil, errors.New("cannot create admin account via API")
	}

	hash, err := argon2.Hash(req.Password)
	if err != nil {
		return nil, err
	}

	user := model.User{
		Username:     req.Username,
		Email:        req.Email,
		PasswordHash: hash,
		FullName:     req.FullName,
		Role:         req.Role,
	}

	res, err := s.db.NamedExec(`
		INSERT INTO users (username, email, password_hash, full_name, role)
		VALUES (:username, :email, :password_hash, :full_name, :role)`, &user)
	if err != nil {
		return nil, err
	}

	id, _ := res.LastInsertId()
	user.ID = uint(id)
	return &user, nil
}

func (s *Service) GetByID(id uint) (*model.User, error) {
	var user model.User
	err := s.db.Get(&user, `
		SELECT id, username, email, full_name, role, created_at 
		FROM users WHERE id = ?`, id)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
