import { WebhookEvent, WebhookAuthentication } from "./app.enums";

type Entity = {
    id: number
};

export type AxiosResponse = {
    data?: unknown;
    status?: number;
};

export type AxiosError = {
    config?: object;
    response?: {
        status?: number
    },
    request?: object;
    stack?: string;
    message?: string;
};

export type WebhookExecutionPayload = {
    event: WebhookEvent | string,
    table: string,
    data: object,
    old_data?: object
};

export type Request = {
    url: string;
    payload: WebhookExecutionPayload;
    config: object;
};

export type Response = {
    attempts: number;
    error: WebhookError | null;
    status: number | null;
};

export type WebhookError = {
    status?: number
    stack?: string;
    message?: string;
};

export type EventPayload = {
    data: Entity;
    old_data?: Entity;
    client_id: number;
    webhook_config: WebhookTableConfig;
};

export type WebhookTableConfig = {
    id: number;
    active: boolean;
    table: string;
    event: WebhookEvent;
    url: string;
    authentication: WebhookAuthentication;
    user?: string;
    password?: string;
    token?: string;
    deactivation_date?: Date;
    headers: { key: string; value?: string | number; }[];
};