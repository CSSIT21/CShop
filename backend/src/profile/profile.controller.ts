import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Public } from 'src/common/decorators/public.decorator';
import { User } from './dto/user.dto';

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Patch('/update')
	@Public()
	public async update(@Body() data: User) {
		return await this.profileService.update(data);
	}
}
