package fiber

import (
"github.com/gofiber/fiber/v2"
"github.com/gofiber/fiber/v2/middleware/recover"
)

var recoverMiddleware = func() fiber.Handler {
	return recover.New()
}()