import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category";
import {JoinColumn} from "typeorm";

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
    @JoinColumn({name: 'categoryId',referencedColumnName: 'idCategory'})
    categoryId: number;
}