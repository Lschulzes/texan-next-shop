import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Link,
} from "@mui/material";
import NextLink from "next/link";
import React, { useMemo, useState } from "react";
import { IProduct } from "../../../interfaces";

type Props = {
  product: IProduct;
};

const ProductCard = ({ product }: Props) => {
  const { slug, images, description, title, price } = product;

  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return !isHovered ? images[0] : images[1];
  }, [isHovered, images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <NextLink href={`/product/${slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              <CardMedia
                component="img"
                image={`products/${productImage}`}
                alt={description}
                className="fadeIn"
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box mt={1} className="fadeIn">
        <Typography>{title}</Typography>
        <Typography>${price}</Typography>
      </Box>
    </Grid>
  );
};

export default ProductCard;
