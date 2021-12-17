package upload

import (
	"github.com/gofiber/fiber/v2"

	"github.com/CSSIT21/CShop-Drive/types"
	"github.com/CSSIT21/CShop-Drive/utils/config"
)

func Middleware(c *fiber.Ctx) error {
	auth := c.Get("Authorization")
	if auth == "Bearer "+config.C.Token {
		return c.Next()
	}

	return &types.PassError{
		Message: "FORBIDDEN",
		Params: []string{auth},
	}
}
