import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getConnectionManager } from 'typeorm';
import { AppModule } from './src/app.module';
// import { MongoConnectionService } from './src/connections/mongo.connection';
import { AppInterceptor } from './src/app.interceptor';

async function bootstrap() {
  // await new MongoConnectionService().connect();

  console.info('Active Connections', getConnectionManager());

  const app = await NestFactory.createMicroservice(AppModule);
  app.useGlobalInterceptors(new AppInterceptor());

  await app.listen(() => new Logger('Sofit-View-Webhook').log('Started'));
}

bootstrap();
