import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar", length: 255})
    name: string;
    @Column({type: "int"})
    price: number;
    @Column({type: "text"})
    image: string;
    @ManyToOne(()=> Category, (category: Category)=> category.products)
    categoryId: number;
}