import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';

import {
  AddProductToBasketResponse,
  DeleteProductFromBasketResponse,
  GetBasketStatsResponse,
  GetTotalPriceResponse,
  ListProductsInBasketResponse,
} from 'src/interfaces/basket';
import { BasketService } from './basket.service';
import { AddProductDto } from './dtos/add-product-dto';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  addProductToBasket(
    @Body() item: AddProductDto,
  ): Promise<AddProductToBasketResponse> {
    return this.basketService.addProductToBasket(item);
  }
  @Delete('/all/:userId')
  clearBasket(@Param('userId') userId: string) {
    this.basketService.clearBasket(userId);
  }
  @Delete('/:itemInBasketId/:userId')
  deleteProductFromBasket(
    @Param('itemInBasketId') itemInBasketId: string,
    @Param('userId') userId: string,
  ): Promise<DeleteProductFromBasketResponse> {
    return this.basketService.removeProduct(itemInBasketId, userId);
  }
  @Get('/admin')
  getBasketForAdmin(): Promise<ListProductsInBasketResponse> {
    return this.basketService.getAllForAdmin();
  }
  @Get('/stats')
  getStats() : Promise <GetBasketStatsResponse> {
    return this.basketService.getStats();
  }
  @Get('/:userId')
  listProductsInBasket(
    @Param('userId') userId: string,
  ): Promise<ListProductsInBasketResponse> {
    return this.basketService.getAllForUser(userId);
  }

  @Get('/total-price/:userId')
  getTotalPrice(
    @Param('userId') userId: string,
  ): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice(userId);
  }
}
