import { Injectable } from '@nestjs/common';
import { createConnection } from 'typeorm';
import { WebhookExecutionCollection } from '../collections/webhook.collection';

export const MONGO_CONNECTION = 'mongo-view';

@Injectable()
export class MongoConnectionService {

    public async connect() {

        return createConnection({
            name: MONGO_CONNECTION,
            type: 'mongodb',
            host: 'localhost',
            port: 27017,
            database: 'new_fleet',
            entities: [
                WebhookExecutionCollection
            ],
            extra: { useNewUrlParser: true },
            useUnifiedTopology: true,
            synchronize: true
        });
    }
}