import { ProductGender } from "./../interfaces/products";
type ShopConstantTypes = {
  validGenders: Array<ProductGender>;
};

export const SHOP_CONSTANTS: ShopConstantTypes = {
  validGenders: ["men", "women", "kid", "unisex"],
};
