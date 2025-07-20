package main

import (
	"context"
	"embed"
	"fmt"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend
var assets embed.FS

type Calculator struct {
	ctx context.Context
}

func NewCalculator() *Calculator {
	return &Calculator{}
}

func (c *Calculator) Startup(ctx context.Context) {
	c.ctx = ctx
}

func (c *Calculator) Add(x, y int) int {
	return x + y
}

func (c *Calculator) Subtract(x, y int) int {
	return x - y
}

func main() {
	calc := NewCalculator()

	fmt.Println("Запущено приложение")
	err := wails.Run(&options.App{
		Title:  "Калькулятор",
		Width:  400,
		Height: 500,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		Bind: []interface{}{
			calc,
		},
	})

	if err != nil {
		fmt.Println("Ошибка:", err)
	}
}
