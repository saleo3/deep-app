import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { Inject } from "typedi";
import { ProductInput, OrderInput, OrderUpdateInput } from "../inputs/productInputs";
import { ProductType, ProductOrderType } from "../types/productType";
import { ProductService } from "../../service/productService";

@Resolver()
export class ProductResolver {
    // private contactService: ContactService;
    constructor(
        @Inject("productService") private readonly productoService: ProductService,
    ) {
        // this.contactService = contactService;
    }

    @Query(returns => [ProductType])
    async products() {
        let response = await this.productoService.getProducts();
        return response;
    }

    @Mutation(returns => ProductOrderType)
    async createOrder(@Arg("order") order:OrderInput){
        return await this.productoService.createOrders(order);
    }

    @Query(returns=>[ProductOrderType])
    async orders(){
        return await this.productoService.getOrders();
    }

    @Mutation(returns => Boolean)
    async deleteOrder(@Arg("orderId") orderId:number){
        return this.productoService.deleteOrder(orderId);
    }

    @Mutation(returns=>ProductOrderType)
    async updateOrder(@Arg("order") order:OrderUpdateInput){
        return this.productoService.updateOrder(order);
    }
}