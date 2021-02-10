import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { WebhookExecutionPayload } from '../app.types';

@Entity('webhook_execution')
export class WebhookExecutionCollection {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	public client_id: number;

	@Column()
	public webhook_id: number;

	@Column()
	public execution_date: Date;

	@Column()
	public attempts: number;

	@Column()
	public error: object | null;

	@Column()
	public url: string;

	@Column()
	public payload: WebhookExecutionPayload | string;

	@Column()
	public headers: object;

	@Column()
	public response_code: number | null;

	@Column()
	public day_bucket: Date;
}