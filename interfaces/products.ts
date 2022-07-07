export type ProductGender = "men" | "women" | "kid" | "unisex";

export interface IProduct {
  _id: string;
  description: string;
  images: Array<string>;
  inStock: number;
  price: number;
  sizes: Array<ISize>;
  slug: string;
  tags: Array<string>;
  title: string;
  type: IType;
  gender: ProductGender;
}

export type ISize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type IType = "shirts" | "pants" | "hoodies" | "hats";
