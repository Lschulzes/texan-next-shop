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
import React from "react";
import { initialData } from "../../../database/products";
import ItemCounter from "../../ItemCounter";

const products = initialData.products.slice(0, 3);

type CartListProps = {
  editable?: boolean;
};

const CartList = ({ editable = false }: CartListProps) => {
  return (
    <>
      {products.map(({ slug, images, title, inStock, price }) => (
        <Grid container spacing={2} mb={1} key={slug}>
          <Grid item xs={3}>
            <NextLink href={`/product/${slug}`}>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`products/${images[0]}`}
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
                Size: <strong>{"M"}</strong>
              </Typography>

              {editable ? (
                <ItemCounter maxNumber={inStock} />
              ) : (
                <Typography variant="h5">3 items</Typography>
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

            <Button variant="text" color="secondary">
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CartList;
