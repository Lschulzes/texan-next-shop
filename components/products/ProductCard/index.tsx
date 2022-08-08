import { Box, Card, CardActionArea, CardMedia, Chip, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useMemo, useState } from 'react';
import { IProduct } from '../../../interfaces';
import { getImageUrl } from '../../../pages/admin/products/[slug]';

type Props = {
  product: IProduct;
};

const ProductCard = ({ product }: Props) => {
  const { slug, images, description, title, price } = product;

  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const productImage = useMemo(() => {
    return !isHovered ? images[0] : images[1];
  }, [isHovered, images]);

  return (
    <Grid item xs={6} sm={4} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Card>
        <NextLink href={`/product/${slug}`} passHref prefetch={false}>
          <Link>
            <CardActionArea>
              {product.inStock === 0 && (
                <Chip
                  color="primary"
                  label="Not Available"
                  sx={{
                    position: 'absolute',
                    zIndex: 99,
                    top: '0.75rem',
                    left: '0.75rem',
                  }}
                />
              )}

              <CardMedia
                component="img"
                image={getImageUrl(productImage)}
                alt={description}
                className="fadeIn"
                onLoad={() => setIsImageLoaded(true)}
              />
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box mt={1} display={isImageLoaded ? 'block' : 'none'} className="fadeIn">
        <Typography>{title}</Typography>
        <Typography>${price}</Typography>
      </Box>
    </Grid>
  );
};

export default ProductCard;
