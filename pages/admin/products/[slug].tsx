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
  Snackbar,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import { texanAPI } from '../../../api';
import AdminLayout from '../../../components/AdminLayout';
import { getAllProductsSlugs, getProductBySlug } from '../../../database/dbProducts';
import { IProduct, ISize, IType, ProductGender } from '../../../interfaces';

type PageProps = {
  product: IProduct;
};

const validTypes: Array<IType> = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender: Array<ProductGender> = ['men', 'women', 'kid', 'unisex'];
const validSizes: Array<ISize> = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const Slug: FC<PageProps> = ({ product }) => {
  const [toastMessage, setToastMessage] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<IProduct>({ defaultValues: { ...product } });

  const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files || !target.files.length) return;

    try {
      for (const file of target.files) {
        const formData = new FormData();
        formData.append('file', file);
        await texanAPI.post(`/admin/upload?path=products/${product.slug}/`, formData);
      }
    } catch (error) {}
  };

  const onChangeSize = (size: ISize) => {
    const currentSizes = getValues('sizes') || [];
    if (currentSizes.includes(size))
      return setValue(
        'sizes',
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true },
      );

    setValue('sizes', currentSizes.concat(size), { shouldValidate: true });
  };

  const onSubmit = async (formData: IProduct) => {
    setIsSaving(true);
    try {
      await texanAPI({
        url: '/admin/products',
        method: formData._id ? 'PATCH' : 'POST',
        data: formData,
      });
      if (!formData._id) router.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setToastMessage(String(error.response?.data as string));
      }
    }
    setIsSaving(false);
  };

  const onDeleteTag = (tag: string) => {
    const currentTags = getValues('tags') || [];
    setValue(
      'tags',
      currentTags.filter((t) => t !== tag),
    );
  };

  useEffect(() => {
    if (!currentTag.includes(' ')) return;

    const currentTags = getValues('tags') || [];
    if (currentTags.includes(currentTag)) return setCurrentTag('');

    setValue('tags', currentTags.concat(currentTag));

    return setCurrentTag('');
  }, [currentTag, setValue, getValues]);

  const { title } = watch();

  useEffect(() => {
    const newSlug = slugify(title || '', '_').toLowerCase();
    setValue('slug', newSlug);
  }, [title, setValue]);

  if (!product) return <div>No product found</div>;

  return (
    <AdminLayout title={'Product'} subTitle={`Editing: ${product.title}`} icon={<DriveFileRenameOutline />}>
      <Snackbar
        open={!!toastMessage.length}
        autoHideDuration={6000}
        onClose={() => setToastMessage('')}
        message={toastMessage}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            disabled={isSaving}
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: '150px' }}
            type="submit"
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              {...register('title', {
                required: 'Required field',
                minLength: { value: 2, message: 'At least 2 characters' },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              {...register('description', {
                required: 'Required field',
                minLength: { value: 50, message: 'At least 50 characters' },
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
              label="Description"
              variant="filled"
              fullWidth
              multiline
              sx={{ mb: 1 }}
            />

            <TextField
              {...register('inStock', {
                required: 'Required field',
                min: { value: 0, message: 'At least 0 products in stock' },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
              label="Inventory"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
            />

            <TextField
              {...register('price', {
                required: 'Required field',
                min: { value: 0, message: 'At least $0' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
              label="Price"
              type="number"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl sx={{ mb: 1 }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues('type')}
                onChange={({ target }) => setValue('type', target.value as IType, { shouldValidate: true })}
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
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                value={getValues('gender')}
                onChange={({ target }) => setValue('gender', target.value as ProductGender, { shouldValidate: true })}
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
              <FormLabel>Sizes</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox checked={getValues('sizes')?.includes(size)} />}
                  label={size}
                  onChange={() => onChangeSize(size)}
                />
              ))}
            </FormGroup>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register('slug', {
                required: 'Required field',
                min: { value: 0, message: 'At least 0 products in stock' },
                validate: (value: string) => !value.trim().includes(' ') || 'No spaces are allowed',
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
              label="Slug - URL"
              variant="filled"
              fullWidth
              focused={!!getValues('slug')?.length}
              sx={{ mb: 1 }}
            />

            <TextField
              value={currentTag}
              onChange={({ target }) => setCurrentTag(target.value)}
              label="Tags"
              variant="filled"
              fullWidth
              sx={{ mb: 1 }}
              helperText="Press [spacebar] to add"
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
              {getValues('tags')?.map((tag) => {
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
              <FormLabel sx={{ mb: 1 }}>Images</FormLabel>
              <Button color="secondary" component="label" fullWidth startIcon={<UploadOutlined />} sx={{ mb: 3 }}>
                <input onChange={onFilesSelected} hidden accept="image/png image/jpeg image/gif" multiple type="file" />
                Load Image
              </Button>

              <Chip label="At least 2 images are required" color="error" variant="outlined" />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img}>
                    <Card>
                      <CardMedia component="img" className="fadeIn" image={`/products/${img}`} alt={img} />
                      <CardActions>
                        <Button fullWidth color="error">
                          Remove
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

  const paths = slugs.map(({ slug }) => ({ params: { slug } })).concat({ params: { slug: 'new' } });

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };

  if (slug === 'new')
    return { props: { product: { slug: 'new', images: [], sizes: [], tags: [], inStock: 0, price: 0 } } };

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
