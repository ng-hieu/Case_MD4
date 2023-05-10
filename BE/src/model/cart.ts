import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import{Product} from "./product";
import {Category} from "./category";
import { User } from './User';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    idCart: number;
    @Column({default: "Buying"})
    status: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Product,(product: Product)=> product.id)
    product: Product;

    @ManyToOne(() => User,(user: User)=> user.idUser)
    user: User;
}
