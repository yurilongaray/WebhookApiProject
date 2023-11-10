import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Injectable()
export class AppService {

	constructor(private readonly rabbitMQService: RabbitMQService) { }

	private readonly webhook_config = {
		id: 1,
		name: 'teste',
		active: 'true',
		table: 'employee',
		event: 'edit',
		url: 'teste.com.br',
		authentication: 'Basic',
		user: 'user',
		password: 'password',
		token: null,
		deactivation_date: null,
		headers: [{ key: "Accept", value: "application/json" }, { key: "Content-Type", value: "application/json" }],
		created_at: '2021-02-09 22:14:00.301665+00',
		updated_at: '2021-02-09 22:14:00.301665+00',
		deleted_at: null,
		created_by_id: 2,
		updated_by_id: 2,
		deleted_by_id: null,
		owner_by_id: null
	}

	public async sendTest() {

		const data = { id: 1, name: 'newValue' };
		const old_data = { id: 1, name: 'oldValue' };
		const valueToSend = { data, old_data, webhook_config: this.webhook_config };

		await this.rabbitMQService.sendAsPromise('edit', valueToSend);

		console.info('Sending value', valueToSend);

		return { status: 'ok', statusCode: 200 };
	}
}