package sqlite

import (
	"log"
	"os"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/CSSIT21/CShop-Drive/models"
	"github.com/CSSIT21/CShop-Drive/utils/config"
	"github.com/CSSIT21/CShop-Drive/utils/wrapper"
)

var SQLite gorm.Dialector
var DB *gorm.DB

func Init() {
	SQLite = sqlite.Open(config.C.SQLite)

	gormLogLevel := []logger.LogLevel{
		logger.Silent,
		logger.Error,
		logger.Warn,
		logger.Info,
	}

	gormLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             100 * time.Millisecond,
			LogLevel:                  gormLogLevel[config.C.LogLevel],
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	gormConfig := &gorm.Config{
		Logger: gormLogger,
	}

	if db, err := gorm.Open(SQLite, gormConfig); err != nil {
		wrapper.Fatal("SQLITE INITIALIZATION ERROR")
	} else {
		DB = db
	}

	if err := models.Load(DB); err != nil {
		wrapper.Fatal("SQLITE MODEL MIGRATION ERROR")
	}
}
