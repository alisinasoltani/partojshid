package model

import "time"

type Project struct {
	ID               uint      `db:"id"`
	Slug             string    `db:"slug"`
	FullName         string    `db:"full_name"`
	Description      *string   `db:"description"` // TEXT → can be NULL
	StartedAt        string    `db:"started_at"`
	EndedAt          string    `db:"ended_at"`
	StartedAtJalali  *string   `db:"started_at_jalali"`
	EndedAtJalali    *string   `db:"ended_at_jalali"`
	Employer         string    `db:"employer"`
	IsVisible        bool      `db:"is_visible"`
	DisplayOrder     int       `db:"display_order"`
	CreatedBy        string    `db:"created_by"` // jeyshid or lodge
	CreatedAt        time.Time `db:"created_at"`
	UpdatedAt        time.Time `db:"updated_at"`
}