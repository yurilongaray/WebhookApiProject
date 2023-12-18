import { Controller } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { WebhookEvent } from './app.enums';
import { AppService } from './app.service';

const { Create, Edit, Remove } = WebhookEvent;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @RabbitRPC({
    exchange: 'rpc-test-exchange',
    routingKey: Create,
    queue: 'rpc-test-queue',
    queueOptions: {
      durable: true,
      exclusive: false,
      autoDelete: false,
    },

    // queueOptions: {
    //   channel: 'channel-1',
    // },
    // connection: 'conn1',
  })
  public async createEvent() {
    return;
  }

  @RabbitRPC({
    exchange: 'rpc-test-exchange',
    routingKey: Edit,
    queue: 'rpc-test-queue',
    queueOptions: {
      durable: true,
      exclusive: false,
      autoDelete: false,
    },
    // queueOptions: {
    //   channel: 'channel-1',
    // },
    // connection: 'conn1',
  })
  public async editEvent() {
    console.log('message arrived');
    return { response: 'test responssss' };
  }

  @RabbitRPC({
    exchange: 'rpc-test-exchange',
    routingKey: Remove,
    queue: 'rpc-test-queue',
    queueOptions: {
      durable: true,
      exclusive: false,
      autoDelete: false,
    },
    // queueOptions: {
    //   channel: 'channel-1',
    // },
    // connection: 'conn1',
  })
  public async removeEvent() {
    return;
  }
}
