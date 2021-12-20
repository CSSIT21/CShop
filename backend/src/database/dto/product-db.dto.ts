export class ProductDB {
	category: string
	description: string
	price: number
	quantity: number
	sold: number
	title: string
	reviews: [{
		content: string
		images: string[]
		star: number
	}]
	options: [{
		option: string
		choice: string[]
	}]
}