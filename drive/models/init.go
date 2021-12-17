package models

import (
	"gorm.io/gorm"
)

func Load(db *gorm.DB) error {
	if err := db.AutoMigrate(&FileRecord{}); err != nil {
		return err
	}
	if err := db.AutoMigrate(&Category{}); err != nil {
		return err
	}
	return nil
}
