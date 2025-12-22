package model

import (
	"encoding/json"
	"time"
)

type SiteConfig struct {
	ID        uint      `db:"id"`
	Data      json.RawMessage `db:"data"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}