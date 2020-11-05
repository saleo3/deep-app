import { InputType, Field, ObjectType } from "type-graphql";

@InputType()
export class ProductInput{

    @Field(type=>String)
    name!:string

    @Field(type=>String)
    description?:string

}


@InputType()
export class OrderInput{

    @Field(type=>Number)
    product!:number

    @Field(type=>Number)
    totalPrice?:number

    @Field(type=>Number)
    cantidad?:number

}



@InputType()
export class OrderUpdateInput{

    @Field(type=>Number)
    id!:number

    @Field(type=>Number)
    product!:number

    @Field(type=>Number)
    totalPrice?:number

    @Field(type=>Number)
    cantidad?:number

}
