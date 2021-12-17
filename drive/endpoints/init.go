package endpoints

import (
	"github.com/gofiber/fiber/v2"

	"github.com/CSSIT21/CShop-Drive/endpoints/upload"
)

func Load(app *fiber.App) {
	api := app.Group("api/")

	uploadGroup := api.Group("upload/", upload.Middleware)
	uploadGroup.Post("base64", upload.Base64)
	uploadGroup.Post("form", upload.Form)
	uploadGroup.Delete("delete", upload.Delete)
}