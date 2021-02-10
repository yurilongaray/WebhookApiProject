import { EventPayload, Request } from '../app.types';

export class RequestBuilder {

    private request: Request;
    private readonly default_settings = { timeout: 10000 };

    constructor(private readonly payload: EventPayload) {

        this.reset();

        this.request.url = payload.webhook_config.url;
        this.request.payload = this.setPayload();
        this.request.config = {
            ...this.default_settings,
            ...this.setHeaders()
        };
    }

    public build() {

        return this.request;
    }

    private reset() {

        this.request = {
            url: '',
            payload: {
                event: '',
                table: '',
                data: {},
                old_data: {}
            },
            config: {}
        };
    }

    private setPayload() {

        const { webhook_config, data } = this.payload;
        const { event, table } = webhook_config;
        const defaultData = { event, table, data };

        return !this.payload.old_data
            ? defaultData
            : { ...defaultData, old_data: this.payload.old_data };
    }

    private setHeaders() {

        const headers = {};
        const { webhook_config } = this.payload;

        for (const header of webhook_config.headers) {

            headers[header.key] = header.value;
        }

        return { ...headers, 'Authorization': this.setAuthorization() };
    }

    private setAuthorization() {

        const { webhook_config } = this.payload;

        if (webhook_config.token) {

            return `${webhook_config.authentication} ${webhook_config.token}`;
        }

        return `${webhook_config.authentication} ${Buffer.from(`${webhook_config.user}:${webhook_config.password}`).toString('base64')}`;
    }
}