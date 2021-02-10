import { ObjectLiteral } from 'typeorm';
import { AxiosError, AxiosResponse, Response } from '../app.types';

export class ResponseBuilder {

    private response: Response;

    constructor() {

        this.reset();
    }

    private reset() {

        this.response = {
            attempts: 1,
            error: null,
            status: null
        };
    }

    public getAttempts() {

        return this.response.attempts;
    }

    public build() {

        return this.response;
    }

    public setResponse({ status }: AxiosResponse) {

        if (status) this.response.status = status;

        return this;
    }

    public setError({ message = '', stack = '', response = {} }: AxiosError) {

        const error: ObjectLiteral = {};

        if (message) error.message = message;
        if (stack) error.stack = stack;
        if (response.status) error.status = response.status;

        this.response.error = { ...error };

        return this;
    }

    public incrementAttempts() {

        this.response.attempts++;

        return this;
    }
}