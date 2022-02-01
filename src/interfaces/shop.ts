export interface ShopItemInterface {
  name: string;
  description: string;
  price: number;
}



export type GetListOfItemsResponse = ShopItemInterface[];