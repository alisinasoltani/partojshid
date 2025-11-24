package auth

import (
	"database/sql"
	"errors"
	"time"
	"strings"
	"fmt"
	"log"

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

	// DEBUG: Log exactly what we're searching for
	log.Printf("Login attempt for username: %q (length: %d)", username, len(username))

	// FIXED: case-insensitive + trim + safe query
	query := `
		SELECT id, username, email, password_hash, full_name, role, 
		       failed_attempts, locked_until, created_at, updated_at, last_login_at
		FROM users 
		WHERE TRIM(LOWER(username)) = TRIM(LOWER(?))
		LIMIT 1`

	err := s.db.Get(&user, query, strings.TrimSpace(strings.ToLower(username)))

	if err == sql.ErrNoRows {
		log.Printf("No user found for username: %q", username)
		return "", nil, ErrInvalidCredentials
	}
	if err != nil {
		log.Printf("Database error during login for %q: %v", username, err)
		return "", nil, fmt.Errorf("login failed")
	}

	// User found — log it
	log.Printf("User found: ID=%d, Role=%s", user.ID, user.Role)

	// Check lockout
	if user.LockedUntil.Valid && time.Now().Before(user.LockedUntil.Time) {
		return "", nil, ErrAccountLocked
	}

	// Verify password
	match, err := argon2.Verify(password, user.PasswordHash)
	if err != nil {
		return "", nil, err
	}
	if !match {
		// Wrong password
		s.db.Exec(`
			UPDATE users 
			SET failed_attempts = failed_attempts + 1,
			    locked_until = IF(failed_attempts + 1 >= 5, 
			        DATE_ADD(NOW(), INTERVAL POW(2, LEAST(failed_attempts, 10)) MINUTE), 
			        locked_until)
			WHERE id = ?`, user.ID)
		return "", nil, ErrInvalidCredentials
	}

	// Success
	s.db.Exec("UPDATE users SET failed_attempts = 0, locked_until = NULL, last_login_at = NOW() WHERE id = ?", user.ID)

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
