import { AddProductDto } from 'src/basket/dtos/add-product-dto';

export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      id: string;
    }
  | {
      isSuccess: false;
    };

export interface DeleteProductFromBasketResponse {
  isSuccess: boolean;
}
export type ListProductsInBasketResponse = AddProductDto[];
export type GetTotalPriceResponse =
  | number
  | {
      isSuccess: false;
      alternativeBasket: AddProductDto[];
    };
