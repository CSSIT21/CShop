import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { User } from './dto/user.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Patch('/update')
	@Public()
	public async update(@Body() data: User) {
		return await this.profileService.update(data);
	}

	@Get('/me')
	public async getInfo(@CurrentUser() currentUser) {
		const user = await this.profileService.fetch(currentUser.id);
		delete user.password;
		return {
			success: true,
			message: "Fetching user's info successfully",
			user,
		};
	}

	@Patch('/update/image')
	@Public()
	public async updateImage(@Body() data: User) {
		return await this.profileService.updateImage(data);
	}
}
