import { Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import Joi from 'joi';
import { WebhookAuthentication, WebhookEvent } from '../app.enums';
import { EventPayload } from '../app.types';

const EVENT_PAYLOAD_VALIDATION = Joi.object({
    data: Joi.object().required(),
    old_data: Joi.any().when('webhook_config.event', {
        is: WebhookEvent.Edit,
        then: Joi.object().required(),
        otherwise: Joi.object().optional().allow(null)
    }),
    client_id: Joi.number().integer().required(),
    webhook_config: Joi.object({
        id: Joi.number().integer().required(),
        active: Joi.boolean().required(),
        table: Joi.string().required(),
        event: Joi.string().valid(...Object.values(WebhookEvent)).required(),
        url: Joi.string().required(),
        authentication: Joi.string().valid(...Object.values(WebhookAuthentication)).required(),
        user: Joi.any().when('authentication', {
            is: WebhookAuthentication.Basic,
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null)
        }),
        password: Joi.any().when('authentication', {
            is: WebhookAuthentication.Basic,
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null)
        }),
        token: Joi.any().when('authentication', {
            is: WebhookAuthentication.Bearer,
            then: Joi.string().required(),
            otherwise: Joi.string().optional().allow(null)
        }),
        deactivation_date: Joi.date().optional().allow(null),
        headers: Joi.array().items(Joi.object({
            key: Joi.string().required(),
            value: Joi.alternatives(Joi.string(), Joi.number()).optional()
        }))
    }).unknown(true)
});

@Injectable()
export class WebhookEventPipe implements PipeTransform {

    public transform(body: EventPayload) {

        const { value, error } = EVENT_PAYLOAD_VALIDATION.validate(body);

        if (error) {

            throw new UnprocessableEntityException(error.details.map(e => e.message).join(';'));
        }

        return value;
    }
}