import { Controller, Get, Inject } from '@nestjs/common';
import { get } from 'http';
import { GetListOfItemsResponse, ShopItemInterface } from 'src/interfaces/shop';
import { ShopItem } from './shop-item.entity';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getItems(): Promise<GetListOfItemsResponse> {
    return this.shopService.getItems();
  }
  @Get('/test')
  test() {
    throw new Error('error')
  }
}
