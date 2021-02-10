import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	controllers: [
		AppController
	],
	providers: [
		AppService
	],
	imports: [
		HttpModule
	]
})
export class AppModule { }