import NextLink from "next/link";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import AuthLayout from "../../components/AuthLayout";
import { useForm } from "react-hook-form";
import validator from "validator";
import { texanAPI } from "../../api";
import { useEffect, useState } from "react";
import { ErrorOutline } from "@mui/icons-material";
import useUser from "../../context/Auth/useUser";

export type RegisterFormInput = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInput>();

  const { registerUser } = useUser();

  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterUser = async (data: RegisterFormInput) => {
    try {
      await registerUser(data);
    } catch (error) {
      setErrorMessage((error as any).response.data.message);
    }
  };

  const { email, password } = watch();

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);
  return (
    <AuthLayout title={"Signup"}>
      <form onSubmit={handleSubmit(onRegisterUser)}>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Create an account
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Full Name"
                type="name"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "This field is required",
                  minLength: {
                    value: 5,
                    message: "name needs to have at least 5 characters",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />{" "}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "This field is required",
                  validate: (val) =>
                    validator.isEmail(val) || "Please type in a valid email",
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
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 10,
                    message: "Password needs to have at least 10 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            {errorMessage && (
              <Grid item xs={12}>
                <Chip
                  sx={{ display: "flex" }}
                  color="error"
                  className="fadeIn"
                  icon={<ErrorOutline />}
                  label={errorMessage}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Signup
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link underline="always">Already have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
