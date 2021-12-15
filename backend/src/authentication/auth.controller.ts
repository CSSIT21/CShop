// import {
// 	Controller,
// 	Get,
// 	Post,
// 	Body,
// 	Patch,
// 	Param,
// 	Delete,
// 	UseGuards,
// 	Request,
// 	Response,
// 	Res,
// 	Req,
// } from '@nestjs/common';
// // import { ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';
// // import { AuthenticationService } from './auth.service';
// import { RegisterDto } from './dto/register.dto';
// import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
// import { Public } from 'src/common/decorators/public.decorator';
// import { Roles } from 'src/common/decorators/roles.decorator';
// import { LoggedIn } from 'src/common/decorators/loggedIn.decorator';
// import { customer } from '@prisma/client';
// import { LoginDto } from './dto/login.dto';

// // @ApiTags("Authentication")
// @Controller('auth')
// export class AuthenticationController {
// 	// constructor(private readonly authenticationService: AuthenticationService) {}

// 	@Post('/register')
// 	@Public()
// 	public async register(@Body() data: RegisterDto) {
// 		return await this.authenticationService.register(data);
// 	}

// 	// @Post('/login')
// 	// @Public()
// 	// public async login(@Body() data: LoginDto, @Req() Req: any, @Res() res: any) {
// 	// 	const check = await this.authenticationService.login(data);
// 	// 	res.send({
// 	// 		success: check,
// 	// 	});
// 	// }

// 	// @Post('login')
// 	// @Public()
// 	// @UseGuards(AuthGuard('local'))
// 	// public login(@Req() request, @Res({ passthrough: true }) response) {
// 	// 	return request.user;
// 	// }

// 	// @Get('me')
// 	// @Roles('ADMIN')
// 	// public me(@CurrentUser() user: customer) {
// 	// 	return user;
// 	// }

// 	// @Post('me')
// 	// @Roles()
// 	// public updateMe(@CurrentUser() user: customer, @Body() body) {
// 	// 	return user;
// 	// }

// 	// @Get('test')
// 	// @LoggedIn()
// 	// public test(@CurrentUser() user: customer) {
// 	// 	return 'Hiii, this zone is for loggedIn user only.! ' + user.type;
// 	// }

// 	// @Get('user')
// 	// @Roles('ADMIN')
// 	// public allUsers(@CurrentUser() user: customer) {
// 	// 	return this.authenticationService.findAll();
// 	// }
// }
