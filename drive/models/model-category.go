package models

import (
	"time"
)

type Category struct {
	ID        uint64    `gorm:"primaryKey"`
	Name      string    `gorm:"type:VARCHAR(32); not null"`
	CreatedAt time.Time `gorm:"not null"`
	UpdatedAt time.Time `gorm:"not null"`
}
