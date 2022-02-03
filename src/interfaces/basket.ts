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
interface GetOneItemInBasket{ 
  id: string;
  count: number
}
export type ListProductsInBasketResponse = GetOneItemInBasket[];
export type GetTotalPriceResponse =
  | number
  | {
      isSuccess: false;
      alternativeBasket: GetOneItemInBasket[];
    };


export interface GetBasketStatsResponse {
  itemInBasketAvgPrice: number;
  basketAvgTotalPrice: number;
}
