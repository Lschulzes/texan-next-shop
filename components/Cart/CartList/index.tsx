import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useCart } from '../../../context';
import { ICartProduct, IOrderItem } from '../../../interfaces';
import { getImageUrl } from '../../../pages/admin/products/[slug]';
import ItemCounter from '../../ItemCounter';

type CartListProps = {
  editable?: boolean;
  orderItems?: Array<IOrderItem>;
};

const CartList = ({ editable = false, orderItems }: CartListProps) => {
  const { products, updateProductQuantity, removeProduct } = useCart();

  const onProductQuantityChange = (count: number, product: ICartProduct) => {
    product.quantity = count;
    updateProductQuantity(product);
  };

  const data = editable ? products : orderItems || products;

  if (!data) return <></>;

  return (
    <>
      {data.map((product) => {
        const { slug, image, title, _id, price, size, quantity } = product;
        return (
          <Grid container spacing={2} mb={1} key={_id}>
            <Grid item xs={3}>
              <NextLink href={`/product/${slug}`}>
                <Link>
                  <CardActionArea>
                    <CardMedia image={getImageUrl(image)} sx={{ borderRadius: '5px' }} component="img" />
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
                    maxNumber={(product as ICartProduct)?.inStock}
                    count={quantity}
                    onQuantityChange={(count) => onProductQuantityChange(count, product as ICartProduct)}
                  />
                ) : (
                  <Typography variant="h5">
                    {quantity} item{quantity > 1 ? 's' : ''}
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
              <Typography variant="subtitle1">${price}</Typography>

              {editable && (
                <Button variant="text" color="secondary" onClick={() => removeProduct(product as ICartProduct)}>
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
