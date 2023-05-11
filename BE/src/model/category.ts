import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./product"
import {JoinColumn} from "typeorm";
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    idCategory: number;
    @Column({type: "varchar", length: 255})
    nameCategory: string;
    @OneToMany(()=>Product, (product)=> product.categoryId)
    @JoinColumn({referencedColumnName: 'products'})
    products: Product[];
}