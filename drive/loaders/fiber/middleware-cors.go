package fiber

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

var corsMiddleware = func() fiber.Handler {
	config := cors.Config{
		AllowOrigins:     "*",
		AllowCredentials: true,
	}

	return cors.New(config)
}()
