import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    name: 'rabbit-mq-consumer',
    transport: Transport.RMQ,
    options: {
        urls: ['amqp://user:password@127.0.0.1:5672'],
        /* Força a notificação de entrega e processamento da mensagem */
        queue: 'dispatch_queue',
        noAck: false
    }
  });

  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen(() => logger.log('Microservice statarted'));
}
bootstrap();
