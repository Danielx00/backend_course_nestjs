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
  @Delete('/all')
  clearBasket() {
    this.basketService.clearBasket();
  }
  @Delete('/:index')
  deleteProductFromBasket(
    @Param('index') index: string,
  ): Promise<DeleteProductFromBasketResponse> {
    return this.basketService.removeProduct(index);
  }
  @Get('/')
  listProductsInBasket(): Promise<ListProductsInBasketResponse> {
    return this.basketService.list();
  }
  @Get('/total-price')
  getTotalPrice(): Promise<GetTotalPriceResponse> {
    return this.basketService.getTotalPrice();
  }
}
