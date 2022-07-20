import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React, { useContext } from "react";
import { CartContext } from "../../../context";
import { initialData } from "../../../database/seed-data";
import { ICartProduct } from "../../../interfaces";
import ItemCounter from "../../ItemCounter";

type CartListProps = {
  editable?: boolean;
};

const CartList = ({ editable = false }: CartListProps) => {
  const { products, updateProductQuantity, removeProduct } =
    useContext(CartContext);

  const onProductQuantityChange = (count: number, product: ICartProduct) => {
    product.quantity = count;
    updateProductQuantity(product);
  };

  return (
    <>
      {products.map((product) => {
        const { slug, image, title, _id, price, size, quantity, inStock } =
          product;
        return (
          <Grid container spacing={2} mb={1} key={_id}>
            <Grid item xs={3}>
              <NextLink href={`/product/${slug}`}>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${image}`}
                      sx={{ borderRadius: "5px" }}
                      component="img"
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={7}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{title}</Typography>

                <Typography variant="body1">
                  Size: <strong>{size}</strong>
                </Typography>

                {editable ? (
                  <ItemCounter
                    maxNumber={inStock}
                    count={quantity}
                    onQuantityChange={(count) =>
                      onProductQuantityChange(count, product)
                    }
                  />
                ) : (
                  <Typography variant="h5">
                    {quantity} item{quantity > 1 ? "s" : ""}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid
              item
              xs={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="subtitle1">${price}</Typography>

              {editable && (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => removeProduct(product)}
                >
                  Remove
                </Button>
              )}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
};

export default CartList;
