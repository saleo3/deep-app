import { ConnectionOptions } from 'typeorm';
import configs from "../config";
import path from 'path'

const config: any = {
    type: 'mysql',
    host:  configs.db.host,
    port: Number(configs.db.port),
    username: configs.db.username,
    password: configs.db.password,
    database: configs.db.db_name,
    entities: [
        path.join(__dirname,configs.db.entity_path)
    ],
    synchronize: configs.db.synchronize,
    logger: configs.db.logger,
    logging: configs.db.logging,
    dropSchema: configs.db.drop_schema,
    cache: configs.db.cache,
    timezone:"Z"
};

export = config;