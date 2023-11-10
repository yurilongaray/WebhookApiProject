import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { getConnectionManager } from 'typeorm';
import { AppModule } from './src/app.module';
// import { MongoConnectionService } from './src/connections/mongo.connection';
import { AppInterceptor } from './src/app.interceptor';

async function bootstrap() {

    // await new MongoConnectionService().connect();

    console.info('Active Connections', getConnectionManager());

    const app = await NestFactory.createMicroservice(AppModule, {
        name: 'WEBHOOK_CONSUMER',
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://guest:guest@127.0.0.1:5672'],
            queue: 'webhook_queue',
            noAck: false
        }
      });

    app.useGlobalInterceptors(new AppInterceptor());

    await app.listen(() => new Logger('Sofit-View-Webhook').log('Started'));
}

bootstrap();