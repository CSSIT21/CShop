// import { faker, Faking } from './faker';

const Bestseller1 = "https://hbr.org/resources/images/article_assets/2019/11/Nov19_14_sb10067951dd-001.jpg";

// const products = faker(10)((el,id) => ({
// 	id: id,
// 	title: Faking.commerce.productName(),
// 	price: ~~Faking.commerce.price(10,2500),
// 	status: "Hot sale",
// 	favourite: false,
// 	image: Faking.image.avatar(),
// }))

const products = [
	{
		id: 0,
		title: "Cheese Pizza very อร่อย มากๆๆๆ",
		price: "500",
		status: "Hot sale",
		favourite: true,
		image: Bestseller1,
	  },
	  {
		id: 1,
		title: "Cheese Pizza",
		price: "500",
		status: "Hot sale",
		favourite: false,
		image: Bestseller1,
	  },
	  {
		id: 2,
		title: "Cheese Pizza",
		price: "500",
		status: "Hot sale",
		favourite: false,
		image: Bestseller1,
	  },
	  {
		id: 3,
		title: "Cheese Pizza",
		price: "500",
		status: "Hot sale",
		favourite: false,
		image: Bestseller1,
	  },
	  {
		id: 4,
		title: "Cheese Pizza",
		price: "500",
		status: "Hot sale",
		favourite: true,
		image: Bestseller1,
	  },
	  {
		id: 5,
		title: "Cheese Pizza",
		price: "500",
		status: "Hot sale",
		favourite: true,
		image: Bestseller1,
	  },
	  {
		id: 6,
		title: "Cheese Pizza",
		price: "500",
		status: "Hot sale",
		favourite: false,
		image: Bestseller1,
	  },
];

export default products;