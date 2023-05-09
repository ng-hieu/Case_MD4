import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product"
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    idCategory: number;
    @Column({type: "varchar", length: 255})
    nameCategory: string;
    @OneToMany(()=>Product, (product)=> product.categoryId)
    products: Product[];
}