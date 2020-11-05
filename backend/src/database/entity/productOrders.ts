import { PrimaryGeneratedColumn, Column, Entity, ManyToOne,OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Product } from "./product";

@Entity()
export class ProductOrder{
    
    @PrimaryGeneratedColumn()
    readonly id!:number;

    @ManyToOne(type=>Product,product=>product.orders,{nullable:true, onDelete:'CASCADE'})
    product!:Product;

    @Column()
    cantidad!:number;

    @Column("decimal", { precision: 5, scale: 2 })
    totalPrice!:number;

    @Column()
    fechaEnvio!:Date;

    @Column({type:'datetime',default: () => 'NOW()'})
    date_created!:string

    @Column({type:'datetime',default: () => 'NOW()'})
    date_updated!:string;
}