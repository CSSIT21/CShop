package main

import (
	"math/rand"
	"time"

	"github.com/CSSIT21/CShop-Drive/loaders/fiber"
	"github.com/CSSIT21/CShop-Drive/loaders/storage"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	// sqlite.Init()
	storage.Init()
	fiber.Init()
}
