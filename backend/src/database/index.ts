import {createConnection } from 'typeorm'
// import {connect} from './config/typeorm'
// import { runSeed as seedDatabase} from './seeder'
import ormconfig from "./ormconfig";

export async function connectDatabase(loggerService:any,configs:any){

    return await createConnection(ormconfig);
}
