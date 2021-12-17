package fiber

import (
	"time"

	"github.com/gofiber/fiber/v2"

	"github.com/CSSIT21/CShop-Drive/endpoints"
	"github.com/CSSIT21/CShop-Drive/loaders/storage"
	"github.com/CSSIT21/CShop-Drive/types"
	"github.com/CSSIT21/CShop-Drive/utils/config"
	"github.com/CSSIT21/CShop-Drive/utils/wrapper"
)

var App *fiber.App

func Init() {
	// Initialize fiber instance
	App = fiber.New(fiber.Config{
		Prefork:       false,
		StrictRouting: true,
		ReadTimeout:   30 * time.Second,
		WriteTimeout:  30 * time.Second,
		BodyLimit:     512 * 1024 * 1024,
		ErrorHandler:  defaultErrorHandler,
	})

	// Import middlewares
	App.Use(corsMiddleware)
	App.Use(recoverMiddleware)

	// Import static files
	App.Static("/files", storage.Dir)

	// Load endpoints
	App.Get("/", func(c *fiber.Ctx) error {
		return &types.PassError{Message: "API_ROOT"}
	})

	endpoints.Load(App)

	App.Use(notFoundMiddleware)

	// Startup
	err := App.Listen(config.C.Address)
	if err != nil {
		wrapper.Fatal(err.Error())
	}
}
