import { ShopItem } from 'src/shop/shop-item.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AddProductDto } from './dtos/add-product-dto';
@Entity()
export class ItemInBasket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;
  @ManyToOne((type) => ShopItem, (entity) => entity.itemsInBasket)
  @JoinColumn()
  shopItem: ShopItem;
  @ManyToOne(type => User , entity => entity.itemsInBasket)
  @JoinColumn()
  user:User;
}
