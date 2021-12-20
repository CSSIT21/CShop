import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
	constructor(private readonly databaseService: DatabaseService) { }

	@Get('test')
	async test() {
		return this.databaseService.loopData();
	}
}
