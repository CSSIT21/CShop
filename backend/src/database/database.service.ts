import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs'
import * as path from 'path';
import * as products from './file/products1.json'

@Injectable()
export class DatabaseService {

	constructor(private prisma: PrismaService) { }

	async loopData() {
		const checkCategory = (v: string) => {
			switch (v) {
				case "electronics":
					return 1;
				case "mobile":
					return 1;
				case "education":
					return 2;
				case "fashion":
					return 3;
				case "kids":
					return 4;
				case "beauty":
					return 5;
				case "furniture":
					return 6;
				case "accessories":
					return 7;
				case "food":
					return 8;
				case "sport":
					return 9;
				case "plants":
					return 10;
				default:
					return 11;
			}
		};

		// const products = JSON.parse(fs.readFileSync(path.join(__dirname, './file/products1.json'), 'utf-8'))

		try {

			const action = async (index, el) => {
				console.log(index, el.title);

				const fetchReviewPictureId = async (length, where) => {
					let reviewPicArray = [];
					for (var i = 0; i < length; i++) {
						const reviewPicID =
							await this.prisma.product_reviews_picture.create({
								data: {
									title: `Picture for review ${index}`,
									path: el.reviews[where].images[i],
									thumbnail: "review picture",
								},
							});
						reviewPicArray.push(reviewPicID.id);
					}
					return reviewPicArray;
				};

				if (!el.title || index < 19) {
					return;
				}

				const product = await this.prisma.product.create({
					data: {
						shop_id: 1,
						title: el.title,
						sub_title: "",
						category_id: checkCategory(el.category),
						price: el.price + 24,
						quantity: el.quantity,
						sold: el.sold,
						rating: 0,
						suggest_products: [],
						product_detail: {
							create: { info: el.description },
						},
						product_options: {
							create: [
								...el.options.slice(0, 6).map((op) => ({
									name: op.option,
									enable: true,
									product_choices: {
										create: [
											...op.choices.slice(0, 6).map((ch) => ({
												name: ch,
												enable: true,
												price: Math.round(
													Math.random() * 10000
												),
												quantity: Math.round(
													Math.random() * 10000
												),
											})),
										],
									},
								})),
							],
						},
						product_reviews: {
							create: [
								...(await (async () => {
									let rev = [];
									for (const [idx, cm] of el.reviews.entries()) {
										// console.log(idx, cm);
										rev.push({
											customer_id: 1,
											rating: cm.star,
											comment: cm.content,
											review_picture_id:
												await fetchReviewPictureId(
													cm.images.length,
													idx
												),
										});
									}
									return rev;
								})()),
							],
						},
					},
				});

				let product_id = product.id;

				el.images.map(async (pic) => {
					await this.prisma.product_picture.create({
						data: {
							product_id: product_id,
							title: `Product ${product_id}`,
							path: pic,
							thumbnail: "Product picture",
						},
					});
				});
			}

			let waitlist = [];
			for (const [index, el] of products.entries()) {
				waitlist.push({ index, el })
				if (waitlist.length >= 100) {
					await Promise.all(waitlist.map((el) => action(el.index, el.el)));
					waitlist = []
				}
			}
		} catch (e) {
			return e;
		}
	}
}


