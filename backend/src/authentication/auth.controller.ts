import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Request,
	Response,
	Res,
	Req,
} from '@nestjs/common';
// import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationService } from './auth.service';
import { RegisterDto } from './dto/register.dts';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { LoggedIn } from 'src/common/decorators/loggedIn.decorator';
import { User } from '@prisma/client';

// @ApiTags("Authentication")
@Controller('auth')
export class AuthenticationController {
	constructor(private readonly authenticationService: AuthenticationService) {}

	@Post('/register')
	@Public()
	public async register(@Body() data: RegisterDto) {
		return await this.authenticationService.register(data);
	}

	@Post('login')
	@Public()
	@UseGuards(AuthGuard('local'))
	public login(@Req() request, @Res({ passthrough: true }) response) {
		return request.user;
	}

	@Get('me')
	@Roles('ADMIN')
	public me(@CurrentUser() user: User) {
		return user;
	}

	@Post('me')
	@Roles()
	public updateMe(@CurrentUser() user: User, @Body() body) {
		return user;
	}

	@Get('test')
	@LoggedIn()
	public test(@CurrentUser() user: User) {
		return 'Hiii, this zone is for loggedIn user only.! ' + user.type;
	}

	@Get('user')
	@Roles('ADMIN')
	public allUsers(@CurrentUser() user: User) {
		return this.authenticationService.findAll();
	}
}
