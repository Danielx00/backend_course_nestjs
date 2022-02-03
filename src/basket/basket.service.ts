import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  AddProductToBasketResponse,
  DeleteProductFromBasketResponse,
  GetBasketStatsResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
} from 'src/interfaces/basket';
import { ShopItemInterface } from 'src/interfaces/shop';
import { ShopItem } from 'src/shop/shop-item.entity';
import { ShopService } from 'src/shop/shop.service';
import { UserService } from 'src/user/user.service';
import { getConnection } from 'typeorm';
import { AddProductDto } from './dtos/add-product-dto';
import { ItemInBasket } from './item-in-basket.entity';

@Injectable()
export class BasketService {
  constructor(
    @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}
  async addProductToBasket(
    item: AddProductDto,
  ): Promise<AddProductToBasketResponse> {
    const { productId, userId, count } = item;

    const shopItem = await this.shopService.getOneProduct(productId);

    const user = await this.userService.getOneUser(userId);
    if (
      typeof productId !== 'string' ||
      typeof userId !== 'string' ||
      typeof count !== 'number' ||
      productId === '' ||
      userId === '' ||
      count < 1 ||
      !shopItem ||
      !user
    ) {
      return {
        isSuccess: false,
      };
    }
    const product = new ItemInBasket();
    product.count = count;

    await product.save();
    product.shopItem = shopItem;
    product.user = user;
    await product.save();

    return {
      isSuccess: true,
      id: product.id,
    };
  }
  async removeProduct(
    itemInBasketId: string,
    userId: string,
  ): Promise<DeleteProductFromBasketResponse> {
    const user = await this.userService.getOneUser(userId);

    if (!userId) {
      throw new Error('User not found');
    }
    const item = await ItemInBasket.findOne({
      where: {
        id: itemInBasketId,
        user,
      },
    });
    if (item) {
      await item.remove();
      return {
        isSuccess: true,
      };
    }
    return {
      isSuccess: false,
    };
  }
  async getAllForUser(userId: string): Promise<ItemInBasket[]> {
    const user = await this.userService.getOneUser(userId);

    if (!userId) {
      throw new Error('User not found');
    }
    return ItemInBasket.find({
      where: {
        user,
      },
      relations: ['shopItem'],
    });
  }
  async clearBasket(userId: string) {
    const user = await this.userService.getOneUser(userId);

    if (!userId) {
      throw new Error('User not found');
    }
    await ItemInBasket.delete({
      user,
    });
  }
  async getTotalPrice(userId: string): Promise<GetTotalPriceResponse> {
    const items = await this.getAllForUser(userId);
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
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }

  async getAllForAdmin(): Promise<ItemInBasket[]> {
    return await ItemInBasket.find({
      relations: ['shopItem', 'user'],
    });
  }

  async getStats(): Promise<GetBasketStatsResponse> {
    const { itemInBasketAvgPrice } = await getConnection()
      .createQueryBuilder()
      .select('AVG(shopItem.price)', 'itemInBasketAvgPrice')
      .from(ItemInBasket, 'itemInBasket')
      .leftJoinAndSelect('itemInBasket.shopItem', 'shopItem')
      .getRawOne();

    const allItemsInBasket = await this.getAllForAdmin();
    const baskets :{
      [userId: string] : number;
    } = {};
    for (const oneItemInBasket of allItemsInBasket) {
      baskets[oneItemInBasket.user.id] = baskets[oneItemInBasket.user.id] || 0;
      baskets[oneItemInBasket.user.id] +=
        oneItemInBasket.shopItem.price * oneItemInBasket.count * 1.23;
    }

    const basketValues = Object.values(baskets);
    const basketAvgTotalPrice =
      basketValues.reduce((prev, curr) => prev + curr, 0) / basketValues.length;
    return {
      itemInBasketAvgPrice,
      basketAvgTotalPrice,
    };
  }
}
