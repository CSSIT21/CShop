package upload

import (
	"os"
	"path"
	"strings"

	"github.com/gofiber/fiber/v2"

	"github.com/CSSIT21/CShop-Drive/loaders/storage"
	"github.com/CSSIT21/CShop-Drive/types"
)

type deleteReq struct {
	Path string `json:"path"`
}

type deleteRes struct {
	Success bool `json:"success"`
	Deleted bool `json:"deleted"`
}

func Delete(c *fiber.Ctx) error {
	req := new(deleteReq)

	if err := c.BodyParser(req); err != nil {
		return err
	}

	var actualPath string
	if a := strings.Split(req.Path, "/files/"); len(a) != 2 {
		return &types.PassError{Message: "INVALID_PATH"}
	}else {
		actualPath = a[1]
	}

	fullPath := path.Join(storage.Dir, actualPath)
	if err := os.Remove(fullPath);	err != nil {
		return c.JSON(deleteRes{
			Success: true,
			Deleted: false,
		})
	}

	return c.JSON(deleteRes{
		Success: true,
		Deleted: true,
	})
}
