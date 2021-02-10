import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {

	constructor(@Inject('WEBHOOK_PUBLISHER') private readonly client: ClientProxy) { }

	public sendAsSubscriber<E>(pattern: string, data: E) {

		return this.client.send(pattern, data).subscribe();
	}

	/* Notify and wait for response */
	public sendAsPromise<E>(pattern: string, data: E): Promise<E> {

		return this.client.send(pattern, data).toPromise();
	}

	/* Notify and dont wait for response */
	public emit<E>(pattern: string, data: E): void {

		this.client.emit(pattern, data);
	}
}