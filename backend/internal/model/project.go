package model

import "time"

type Project struct {
    ID              uint      `db:"id" json:"id"`
    Slug            string    `db:"slug" json:"slug"`
    FullName        string    `db:"full_name" json:"full_name"`
    Description     *string   `db:"description" json:"description,omitempty"`
    StartedAt       *string   `db:"started_at" json:"started_at,omitempty"`        // ← fixed
    EndedAt         *string   `db:"ended_at" json:"ended_at,omitempty"`            // ← fixed
    StartedAtJalali *string   `db:"started_at_jalali" json:"started_at_jalali,omitempty"`
    EndedAtJalali   *string   `db:"ended_at_jalali" json:"ended_at_jalali,omitempty"`
    Employer        string    `db:"employer" json:"employer"`
    IsVisible       bool      `db:"is_visible" json:"is_visible"`
    DisplayOrder    int       `db:"display_order" json:"display_order"`
    CreatedBy       string    `db:"created_by" json:"created_by"`
    CreatedAt       time.Time `db:"created_at" json:"created_at"`
    UpdatedAt       time.Time `db:"updated_at" json:"updated_at"`
}