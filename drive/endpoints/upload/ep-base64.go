package upload

import (
	"encoding/base64"
	"os"
	"path"

	"github.com/gofiber/fiber/v2"

	"github.com/CSSIT21/CShop-Drive/loaders/storage"
	"github.com/CSSIT21/CShop-Drive/types"
	"github.com/CSSIT21/CShop-Drive/utils/config"
	"github.com/CSSIT21/CShop-Drive/utils/fs"
)

type base64Req struct {
	Payload string `json:"payload"`
	Mime    string `json:"mime"`
}

func Base64(c *fiber.Ctx) error {
	req := new(base64Req)

	if err := c.BodyParser(req); err != nil {
		return err
	}

	if len(req.Mime) < 3 || len(req.Mime) > 5 {
		return &types.PassError{
			Message: "MIMETYPE_LENGTH_EXCEED",
		}
	}

	var dec []byte
	if d, err := base64.StdEncoding.DecodeString(req.Payload); err != nil {
		panic(err)
	} else {
		dec = d
	}

	var rel string
	if r, err := fs.Date(storage.Dir); err != nil {
		return err
	} else {
		rel = *r
	}

	var file *os.File
	filePath := path.Join(rel, fs.Name(12)+"."+req.Mime)

	if f, err := os.Create(path.Join(storage.Dir, filePath)); err != nil {
		return err
	} else {
		file = f
	}
	defer file.Close()

	if _, err := file.Write(dec); err != nil {
		return err
	}

	if err := file.Sync(); err != nil {
		return err
	}

	return c.JSON(types.RespUploadStat{
		Success:      true,
		OriginalLink: config.C.URL + "files/" + filePath,
	})
}
