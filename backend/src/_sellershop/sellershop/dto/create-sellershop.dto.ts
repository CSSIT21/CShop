import { IsNotEmpty, MinLength } from 'class-validator';
export class CreateSellershopDto {
	/**Id */
	customer_id: number;
	shop_address_id: number;

	/**Shopinfo */
	name: string;
	phoneNumber: string;
	shopImage: Blob;
	description: string;

	/**Address */
	province: string;
	subDistrict: string;
	addressLine: string;
	district: string;
	postalCode: number;

	/**Bank Account */
	@IsNotEmpty()
	bank: string;

	@IsNotEmpty()
	firstname: string;

	@IsNotEmpty()
	lastname: string;

	@IsNotEmpty()
	@MinLength(10)
	accountNum: string;
}
