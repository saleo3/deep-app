import dotenv from 'dotenv';
import {v4} from 'uuid'; 

function convertToBoolean(input: string): boolean | undefined {
  try {
      return JSON.parse(input);
  }
  catch (e) {
      return undefined;
  }
}
const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("  Couldn't find .env file. ");
}




export default {
    graphql: {
        prefix: '/graphql',
    },
    port:process.env.PORT,
    db:{
        type:process.env.DB_TYPE || 'mysql',
        host:process.env.DB_HOST || "localhost",
        port:process.env.DB_PORT || "3306",
        username: process.env.DB_USERNAME || "db",
        password: process.env.DB_PASSWORD || '',
        db_name: process.env.DB_NAME || "database",
        entity_path: process.env.ENTITY_PATH || "./entity/**/**.ts",
        drop_schema: convertToBoolean(process.env.DB_DROP_SCHEMA|| "false"),
        synchronize: convertToBoolean(process.env.DB_SYNCHRONIZE|| "false"),
        logging: convertToBoolean(process.env.DB_LOGGING || "false"),
        logger: process.env.DB_LOGGER,
        cache: convertToBoolean(process.env.DB_CACHE|| "false"),
    }
}