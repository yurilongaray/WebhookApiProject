import { HttpService, Injectable, Logger } from '@nestjs/common';
import { getManager } from 'typeorm';
import { AxiosResponse, Request, Response, EventPayload } from './app.types';
import { RequestBuilder } from './builders/request.builder';
import { ResponseBuilder } from './builders/response.builder';
import { startOfDay } from 'date-fns';
import { WebhookExecutionCollection } from './collections/webhook.collection';
// import { MONGO_CONNECTION } from './connections/mongo.connection';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class AppService {

	private readonly logger = new Logger('AppService');
	private readonly range_bewteen_requests = 10000;
	private readonly max_attempts = 3;

	constructor(private readonly httpService: HttpService) { }

	public async createEvent(payload: EventPayload, context: RmqContext) {

		this.logStartingInfo(payload);

		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();

		await this.sendAndSave(payload);

		this.logFinishingInfo(payload);

		return channel.ack(originalMessage);
	}

	public async editEvent(payload: EventPayload, context: RmqContext) {

		this.logStartingInfo(payload);

		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();

		await this.sendAndSave(payload);

		await new Promise(res => setTimeout(res, 10000))

		this.logFinishingInfo(payload);

		return channel.ack(originalMessage);
	}

	public async removeEvent(payload: EventPayload, context: RmqContext) {

		this.logStartingInfo(payload);

		const channel = context.getChannelRef();
		const originalMessage = context.getMessage();

		await this.sendAndSave(payload);

		this.logFinishingInfo(payload);

		return channel.ack(originalMessage);
	}

	private logStartingInfo(payload: EventPayload) {

		const { webhook_config } = payload;

		this.logger.log(`Started Event: ${webhook_config.event}, Table: ${webhook_config.table}`);
	}

	private logFinishingInfo(payload: EventPayload) {

		const { webhook_config} = payload;

		this.logger.log(`Finished Event: ${webhook_config.event}, Table: ${webhook_config.table}`);
	}

	private async sendAndSave(payload: EventPayload) {
		return;

		const request = new RequestBuilder(payload).build();
		const responseBuilder = new ResponseBuilder();

		// await this.sendRequest(request, responseBuilder);

		const response = responseBuilder.build();

		// return this.saveWebhook(payload, request, response);
	}

	private async saveWebhook(payload: EventPayload, request: Request, response: Response) {

		const webhookRequestToSave = new WebhookExecutionCollection();

		webhookRequestToSave.webhook_id = payload.webhook_config.id;
		webhookRequestToSave.url = payload.webhook_config.url;
		webhookRequestToSave.execution_date = new Date();
		webhookRequestToSave.day_bucket = startOfDay(new Date());
		webhookRequestToSave.headers = request.config;
		webhookRequestToSave.payload = request.payload;
		webhookRequestToSave.response_code = response.status || response.error?.status || null;
		webhookRequestToSave.attempts = response.attempts;
		webhookRequestToSave.error = response.error;

		// return getManager(MONGO_CONNECTION).save(webhookRequestToSave);
	}

	// private async sendRequest(request: Request, responseBuilder: ResponseBuilder): Promise<void> {

	// 	const { url, payload, config } = request;

	// 	try {

	// 		const response = await this.httpService.post(url, payload, config).toPromise<AxiosResponse>();

	// 		responseBuilder.setResponse(response);
	// 	} catch (error) {

	// 		responseBuilder.setError(error);

	// 		let attempts = responseBuilder.getAttempts();

	// 		if (attempts < this.max_attempts) {

	// 			responseBuilder.incrementAttempts();

	// 			return new Promise(resolve => {

	// 				setTimeout(() => resolve(this.sendRequest(request, responseBuilder)), this.range_bewteen_requests);
	// 			});
	// 		}
	// 	}
	// }
}