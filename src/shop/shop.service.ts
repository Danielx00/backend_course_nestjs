import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from 'src/basket/basket.service';
import { GetListOfItemsResponse, ShopItemInterface } from 'src/interfaces/shop';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}
  async getItems(): Promise<ShopItem[]> {
    return  ShopItem.find();
  }
  async hasProduct(name: string): Promise<boolean> {
    return (await this.getItems()).some((item) => item.name === name);
  }
  async getPriceOfProduct(name: string): Promise<number> {
    return (await this.getItems()).find((item) => item.name === name).price;
  }
  async getOneProduct(id: string) : Promise <ShopItem> {
    return await ShopItem.findOne(id)
  }
}
