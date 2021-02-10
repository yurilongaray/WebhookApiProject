import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { WebhookEvent } from './app.enums';
import { AppService } from './app.service';
import { EventPayload } from './app.types';
import { WebhookEventPipe } from './pipes/webhook-event.pipe';

const { Create, Edit, Remove } = WebhookEvent;

@Controller()
export class AppController {

	constructor(private readonly appService: AppService) { }

	@EventPattern(Create)
	public async createEvent(@Payload(WebhookEventPipe) payload: EventPayload, @Ctx() context: RmqContext) {

		return this.appService.createEvent(payload, context);
	}

	@EventPattern(Edit)
	public async editEvent(@Payload(WebhookEventPipe) payload: EventPayload, @Ctx() context: RmqContext) {

		return this.appService.editEvent(payload, context);
	}

	@EventPattern(Remove)
	public async removeEvent(@Payload(WebhookEventPipe) payload: EventPayload, @Ctx() context: RmqContext) {

		return this.appService.removeEvent(payload, context);
	}
}
