import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import {
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import { getAllProductsSlugs, getProductBySlug } from '../../../database/dbProducts';
import { IProduct } from '../../../interfaces';

type PageProps = {
  product: IProduct;
};

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const Slug: FC<PageProps> = ({ product }) => {
  const router = useRouter();

  const onDeleteTag = (tag: string) => {
    //
  };

  if (!product) return <div>No product found</div>;

  return (
    <AdminLayout title={'Producto'} subTitle={`Editando: ${product.title}`} icon={<DriveFileRenameOutline />}>
      <form>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button color="secondary" startIcon={<SaveOutlined />} sx={{ width: '150px' }} type="submit">
            Guardar
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Título"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              // { ...register('name', {
              //     required: 'Este campo es requerido',
              //     minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              // })}
              // error={ !!errors.name }
              // helperText={ errors.name?.message }
            />

            <TextField label="Descripción" variant="filled" fullWidth multiline sx={{ mb: 1 }} />

            <TextField label="Inventario" type="number" variant="filled" fullWidth sx={{ mb: 1 }} />

            <TextField label="Precio" type="number" variant="filled" fullWidth sx={{ mb: 1 }} />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Tipo</FormLabel>
              <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Género</FormLabel>
              <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Tallas</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel key={size} control={<Checkbox />} label={size} />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid item xs={12} sm={6}>
            <TextField label="Slug - URL" variant="filled" fullWidth sx={{ mb: 1 }} />

            <TextField
              label="Etiquetas"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Presiona [spacebar] para agregar"
            />

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0,
                m: 0,
              }}
              component="ul"
            >
              {product.tags.map((tag) => {
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => onDeleteTag(tag)}
                    color="primary"
                    size="small"
                    sx={{ ml: 1, mt: 1 }}
                  />
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" flexDirection="column">
              <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
              <Button color="secondary" fullWidth startIcon={<UploadOutlined />} sx={{ mb: 3 }}>
                Cargar imagen
              </Button>

              <Chip label="Es necesario al 2 imagenes" color="error" variant="outlined" />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia component="img" className="fadeIn" image={`/products/${img}`} alt={img} />
                      <CardActions>
                        <Button fullWidth color="error">
                          Borrar
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllProductsSlugs();

  if (!slugs) return { paths: [], fallback: true };

  const paths = slugs.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await getProductBySlug(slug);

  if (!product)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return { props: { product }, revalidate: 60 * 60 * 24 };
};

export default Slug;

/************************ */
const mapProductToCartProduct = (product: IProduct) => {
  if (!product) return null;

  return {
    _id: product._id,
    gender: product.gender,
    image: product.images[0],
    price: product.price,
    slug: product.slug,
    title: product.title,
    inStock: product.inStock,
    quantity: 1,
    size: undefined,
  };
};
