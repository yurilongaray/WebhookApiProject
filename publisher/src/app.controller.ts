import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

	@Get('test')
	public async test() {

		console.log('started')
		await this.appService.sendTest();
		console.log('finished')
	}
}
