import {  Field,ObjectType } from "type-graphql";

@ObjectType()
export class ProductType
{
    @Field(type=>String,{nullable:true})
    id!:string;

    @Field(type=>String)
    name!:string;

    @Field(type=>Number)
    price!:number;

}

@ObjectType()
export class ProductOrderType
{
    @Field(type=>String,{nullable:true})
    id?:string;

    @Field(type=>ProductType)
    product!:ProductType;

    @Field(type=>Number)
    cantidad!:number;

    @Field(type=>Number)
    totalPrice!:number;

    @Field(type=>Date)
    fechaEnvio!:Date;
}

