// import express from 'express'
import "reflect-metadata";
import { ApolloServer, ApolloError} from 'apollo-server-express'

import { Container } from "typedi";
import * as TypeORM from "typeorm"; 
import {GraphQLError, GraphQLSchema} from 'graphql'
import {v4} from 'uuid'; 

//make the container
TypeORM.useContainer(Container);

export async function getApolloserver( SECRET:String,schema:GraphQLSchema){

    const server = new ApolloServer({
        schema :schema,
        context:({req}:any)=>({req}),

        formatError:(error) => 
        {
            if(error.originalError instanceof ApolloServer)
            {
                console.log("BROKE!!!")
                console.log(error.message);
                return error;
            }
            const errId = v4();
            console.log("errId: ", errId);
            console.log(error);
            return new GraphQLError(error.message);
        },
    })

    return server;
}