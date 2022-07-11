import { ISize, ProductGender } from "./products";

export interface ICartProduct {
  _id: string;
  image: string;
  price: number;
  size: ISize;
  slug: string;
  title: string;
  gender: ProductGender;
  quantity: number;
}
