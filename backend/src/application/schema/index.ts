
import { buildSchema } from "type-graphql"
import Container from "typedi";
import { ProductResolver } from "../resolvers/productResolver";




export const createSchema = async () =>{

    return await buildSchema({
            resolvers:[
                ProductResolver
            ],
            container:Container
        });

    }