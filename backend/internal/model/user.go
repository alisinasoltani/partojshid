package model

import (
	"database/sql"
	"time"
)

type User struct {
	ID             uint           `db:"id"`
	Username       string         `db:"username"`
	Email          string         `db:"email"`
	PasswordHash   string         `db:"password_hash"`
	FullName       string         `db:"full_name"`
	Role           string         `db:"role"` // admin or editor
	CreatedAt      time.Time      `db:"created_at"`
	UpdatedAt      time.Time      `db:"updated_at"`
	LastLoginAt    sql.NullTime   `db:"last_login_at"`
	FailedAttempts int            `db:"failed_attempts"`
	LockedUntil    sql.NullTime   `db:"locked_until"`
}