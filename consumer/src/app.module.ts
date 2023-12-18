import { HttpModule, Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    HttpModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'rpc-test-exchange',
          type: 'topic',
          createExchangeIfNotExists: true,
          options: {},
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
      enableControllerDiscovery: true,
      // connectionManagerOptions: {},
      connectionInitOptions: { wait: false },
      // channels: {
      //   'channel-1': {
      //     prefetchCount: 15,
      //     default: true,
      //   },
      // },
    }),
  ],
})
export class AppModule {}
