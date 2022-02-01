import { ItemInBasket } from "src/basket/item-in-basket.entity";
import { ShopItemInterface } from "src/interfaces/shop";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShopItem extends BaseEntity implements ShopItemInterface{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({
        length: 25
    })
    name: string;
    @Column({
        length: 255,
        default: '(brak)'
    })
    description: string;
    @Column({
        type: 'float',
        precision: 6,
        scale: 2
    })
    price: number
    @OneToOne(type => ItemInBasket, entity => entity.shopItem)
    itemInBasket: ItemInBasket
}
