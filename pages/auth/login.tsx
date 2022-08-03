import { ErrorOutline } from '@mui/icons-material';
import { Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';
import AuthLayout from '../../components/AuthLayout';
import useUser from '../../context/Auth/useUser';

export type FormInput = {
  email: string;
  password: string;
};

export type LoginRegisterError = { response: { data: { message: string } } };

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const { providers } = useUser();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormInput>();
  const router = useRouter();

  const { previousPath = '/' } = router.query;

  const onLoginUser = async (formData: FormInput) => {
    try {
      await signIn('credentials', formData);

      router.push(`${previousPath}`);
    } catch (error) {
      setErrorMessage((error as LoginRegisterError).response.data.message);
    }
  };

  const { email, password } = watch();

  useEffect(() => {
    setErrorMessage('');
  }, [email, password]);

  return (
    <AuthLayout title={'Login'}>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Start Session
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'This field is required',
                  validate: (val) => validator.isEmail(val) || 'Please type in a valid email',
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 10,
                    message: 'Password needs to have at least 10 characters',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            {errorMessage && (
              <Grid item xs={12}>
                <Chip
                  sx={{ display: 'flex' }}
                  color="error"
                  className="fadeIn"
                  icon={<ErrorOutline />}
                  label={errorMessage}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button color="secondary" className="circular-btn" size="large" fullWidth type="submit">
                Login
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" flexDirection="column" justifyContent="end">
              <Divider sx={{ width: '100%', mb: 2 }} />

              {providers.map(
                ({ id, name }) =>
                  id !== 'credentials' && (
                    <Button
                      onClick={() => signIn(id)}
                      key={id}
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb: 1 }}
                    >
                      <Grid display="flex" gap="0.5rem" alignItems="center" sx={{ pr: '1.75rem' }}>
                        <Image
                          src={`/assets/${id}_icon.png`}
                          width={30}
                          height={30}
                          alt={`${name} icon                  `}
                        />
                        {name}
                      </Grid>
                    </Button>
                  ),
              )}
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href={`/auth/register?previousPath=${previousPath}`} passHref>
                <Link underline="always">{"Don't have an account?"}</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
