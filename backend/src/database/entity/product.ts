import { PrimaryGeneratedColumn, Column, Entity, ManyToOne,OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { ProductOrder } from "./productOrders";

@Entity()
export class Product
{
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column()
    name!:string

    @Column()
    description!:string

    @Column("decimal", { precision: 5, scale: 2 })
    price!:number

    @OneToMany(type=>ProductOrder,order=>order.product,{nullable:true, onDelete:'CASCADE'})
    orders?:ProductOrder[];

}
