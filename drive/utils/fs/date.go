package fs

import (
	"os"
	"path"
	"strconv"
	"time"
)

func Date(dir string) (*string, error) {
	year, month, day := time.Now().Date()

	y := strconv.Itoa(year)
	md := strconv.Itoa(int(month)) + "-" + strconv.Itoa(day)

	// Confirm year directory is existed
	yPath := path.Join(dir, y)
	if _, err := os.Stat(yPath); os.IsNotExist(err) {
		if err := os.Mkdir(yPath, 0755); err != nil {
			return nil, err
		}
	}

	// Confirm year-month-day directory is existed
	ymdPath := path.Join(dir, y, md)
	if _, err := os.Stat(ymdPath); os.IsNotExist(err) {
		if err := os.Mkdir(ymdPath, 0755); err != nil {
			return nil, err
		}
	}

	relPath := path.Join(y, md)
	return &relPath, nil
}
