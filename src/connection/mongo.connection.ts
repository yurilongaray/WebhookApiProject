import { Injectable } from '@nestjs/common';
import path from 'path';
import { createConnection } from 'typeorm';

@Injectable()
export class MongoConnectionService {

    public async connect() {

        return createConnection({
            name: 'mongo-view',
            type: 'mongodb',
            host: process.env.MONGO_HOST || 'localhost',
            port: 27017,
            database: 'new_fleet',
            entities: [path.join(process.cwd(), 'src/collections/**/*.collection.{js,ts}')],
            extra: { useNewUrlParser: true },
            useUnifiedTopology: true
        });
    }
}