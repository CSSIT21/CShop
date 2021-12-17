package storage

import (
	"os"
	"path/filepath"

	"github.com/CSSIT21/CShop-Drive/utils/config"
	"github.com/CSSIT21/CShop-Drive/utils/fs"
	"github.com/CSSIT21/CShop-Drive/utils/wrapper"
)

var Dir string

func Init() {
	Dir = config.C.Path

	// Convert directory to absolute path
	if dir, err := filepath.Abs(Dir); err != nil {
		wrapper.Fatal("UNKNOWN STORAGE PATH")
	} else {
		Dir = dir
	}

	// Confirm directory is existed
	if _, err := os.Stat(Dir); os.IsNotExist(err) {
		wrapper.Fatal("NONEXISTENT STORAGE PATH")
	}

	// Confirm directory is writable
	if !fs.Writable(Dir) {
		wrapper.Fatal("UNWRITABLE STORAGE PATH")
	}
}
