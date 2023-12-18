import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

@Module({
	imports: [
		ClientsModule.register([{
			name: 'WEBHOOK_PUBLISHER',
			transport: Transport.RMQ,
			options: {
				urls: ['amqp://guest:guest@127.0.0.1:5672'],
				noAck: false,
				queue: 'rpc-test-queue',
				queueOptions: { durable: true,  },
				
			},
			
		}])
	],
	providers: [
		RabbitMQService
	],
	exports: [
		RabbitMQService
	]
})
export class RabbitMQModule { }