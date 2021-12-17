package models

import (
	"time"
)

type FileRecord struct {
	ID        uint64    `gorm:"primaryKey"`
	Path      string    `gorm:"type:VARCHAR(128); not null"`
	MD5       string    `gorm:"type:VARCHAR(32); not null"`
	Category  Category  `gorm:"foreignKey:ID"`
	CreatedAt time.Time `gorm:"not null"`
	UpdatedAt time.Time `gorm:"not null"`
}
