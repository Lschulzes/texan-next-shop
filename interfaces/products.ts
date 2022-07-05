export interface IProduct {
  _id: string;
  description: string;
  images: Array<string>;
  inStock: number;
  price: number;
  sizes: Array<ISizes>;
  slug: string;
  tags: Array<string>;
  title: string;
  type: ITypes;
  gender: "men" | "women" | "kid" | "unisex";
}

export type ISizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ITypes = "shirts" | "pants" | "hoodies" | "hats";
