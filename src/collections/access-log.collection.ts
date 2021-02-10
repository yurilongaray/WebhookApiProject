import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('access_log')
export class AccessLogCollection {

	@ObjectIdColumn()
	public id: ObjectID;

	@Column()
	public url: string;

	@Column()
	public path: string;

	@Column()
	public method: string;

	@Column()
	public client: number;

	@Column()
	public user: { app_id: number, id: number, name: string, email: string } | null;

	@Column()
	public params: string | object;

	@Column()
	public payload: string | object | null;

	@Column()
	public query: string | object;

	@Column()
	public ip: string;

	@Column()
	public response: number | null;

	@Column()
	public referrer?: string;

	@Column()
	public userAgent?: string;

	@Column()
	public host?: string;

	@Column()
	public date: Date;

	@Column()
	public day_bucket: Date;

	@Column()
	public error_message?: string;
}