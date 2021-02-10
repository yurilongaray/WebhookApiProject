import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientProxy,
  ClientProxyFactory,
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);
  // private clientAdminBackEnd: ClientProxy;

  constructor(private readonly appService: AppService) {
    //  Running docker RMQ
    // docker run -d --hostname rabbit-project --name rabbit-project -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password -e RABBITMQ_NODENAME=rabbit@rabbit-project -p 15672:15672 -p 5672:5672 rabbitmq:3-management

    // this.clientAdminBackEnd = ClientProxyFactory.create({
    //   transport: Transport.RMQ,
    //   options: {
    //     urls: ['amqp://user:password@127.0.0.1:5672'],
    //     queue: 'route',
    //     noAck: false,
    //     // Get one by one
    //     prefetchCount: 1
    //   }
    // });
  }

  // @Get('hi')
  // async getHello() {

  //   return this.clientAdminBackEnd.send('hi', { key: 'keyValue' });
  // }

  /* Captura a mensagem enviada */
  @EventPattern('create')
  async getCreatedRoute(@Payload() route: {}, @Ctx() context: RmqContext) {

    console.log('CHEGUEI')

    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    console.log('channel', channel);
    console.log('originalMessage', originalMessage);
    console.log('route', route);

    /* Para confirmar que recebeu e apagar a mensagem: */
    await channel.ack(originalMessage);

    return route;
  }

  /* USAR ESTE AQUI POIS ESTÁ FUNFANDO PERFEITAMENTE */
  /* Captura a mensagem enviada */
  @EventPattern('edit')
  async getEditedRoute(@Payload() route: {}, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    console.log('channel', channel);
    console.log('originalMessage', originalMessage);
    console.log('route', route);

    return setTimeout(async () => {

      /* Para confirmar que recebeu e apagar a mensagem: */
      await channel.ack(originalMessage);
  
      console.log('FINISHED');
      return 'Hellop'
    }, 20000)
  }
}
