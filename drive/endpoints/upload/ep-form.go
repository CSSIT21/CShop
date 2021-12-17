package upload

import (
	"path"

	"github.com/gofiber/fiber/v2"

	"github.com/CSSIT21/CShop-Drive/loaders/storage"
	"github.com/CSSIT21/CShop-Drive/types"
	"github.com/CSSIT21/CShop-Drive/utils/config"
	"github.com/CSSIT21/CShop-Drive/utils/fs"
)

func Form(c *fiber.Ctx) error {
	mime := c.FormValue("mime")

	file, err := c.FormFile("file")
	if err != nil {
		return err
	}

	if len(mime) < 3 || len(mime) > 5 {
		return &types.PassError{
			Message: "MIMETYPE_LENGTH_EXCEED",
		}
	}

	rel, err := fs.Date(storage.Dir)
	if err != nil {
		return err
	}

	filePath := path.Join(*rel, fs.Name(12)+"."+mime)
	fullFilePath := path.Join(storage.Dir, filePath)

	err = c.SaveFile(file, fullFilePath)
	if err != nil {
		return err
	}

	return c.JSON(types.RespUploadStat{
		Success:      true,
		OriginalLink: config.C.URL + "files/" + filePath,
	})
}
