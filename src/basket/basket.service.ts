import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  DeleteProductFromBasketResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
} from 'src/interfaces/basket';
import { ShopItemInterface } from 'src/interfaces/shop';
import { ShopItem } from 'src/shop/shop-item.entity';
import { ShopService } from 'src/shop/shop.service';
import { AddProductDto } from './dtos/add-product-dto';
import { ItemInBasket } from './item-in-basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
  ) {}
  async addProductToBasket(
    item: AddProductDto,
  ): Promise<AddProductToBasketResponse> {
    const { id, count } = item;

    const shopItem = await this.shopService.getOneProduct(id);
    if (
      typeof id !== 'string' ||
      typeof count !== 'number' ||
      id === '' ||
      count < 1 ||
      !shopItem
    ) {
      return {
        isSuccess: false,
      };
    }
    const product = new ItemInBasket();
    product.count = count;

    await product.save();
    product.shopItem = shopItem;
    await product.save();

    return {
      isSuccess: true,
      id: product.id,
    };
  }
  async removeProduct(id: string): Promise<DeleteProductFromBasketResponse> {
    const item = await ItemInBasket.findOne(id);
    if (item) {
      await item.remove();
      return {
        isSuccess: false,
      };
    }
    return {
      isSuccess: true,
    };
  }
  async list(): Promise<ItemInBasket[]> {
    return ItemInBasket.find({
      relations: ['shopItem'],
    });
  }
  async clearBasket() {
      await ItemInBasket.delete({});
  }
  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    const items = await this.list();
    if (
      !items.every((item) => this.shopService.hasProduct(item.shopItem.name))
    ) {
      const alternativeBasket = items.filter((item) =>
        this.shopService.hasProduct(item.shopItem.name),
      );
      return {
        isSuccess: false,
        alternativeBasket,
      };
    }
    return (
      await Promise.all(items.map(async (item) => item.shopItem.price * item.count * 1.23))
    ).reduce((prev, curr) => prev + curr, 0)
  }
}
