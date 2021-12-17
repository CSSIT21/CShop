import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import constants from './common/constants';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: 'http://localhost:3000',
			credentials: true,
		},
	});
	app.enableCors();
	await app.listen(constants.serverPort);
}

bootstrap();
