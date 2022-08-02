import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { BillingAddress } from "../../context";
import { useIsHydrated } from "../../hooks/useIsHydrated";
import { COUNTRIES, CountryCodes } from "../../utils";

export const getAddressDataFromCookies = (): BillingAddress => {
  try {
    return JSON.parse(Cookies.get("address_data") || "");
  } catch (error) {
    return {
      name: "",
      lastName: "",
      address: "",
      ZIP: "",
      country: "USA",
      phoneNumber: "",
    };
  }
};

const AddressPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BillingAddress>({
    defaultValues: { ...getAddressDataFromCookies() },
  });

  const { push } = useRouter();
  const { isHydrated } = useIsHydrated();

  const onSubmit = async (formData: BillingAddress) => {
    Cookies.set("address_data", JSON.stringify(formData));
    push("/checkout/summary");
  };

  return (
    <Layout title="Address" description="Confirm address">
      <Typography variant="h1" component="h1">
        Address
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="filled"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register("name", {
                required: "This field is required",
                minLength: 4,
                maxLength: 16,
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Last name"
              variant="filled"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register("lastName", {
                required: "This field is required",
                minLength: 4,
                maxLength: 20,
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register("address", {
                required: "This field is required",
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="ZIP code"
              variant="filled"
              fullWidth
              error={!!errors.ZIP}
              helperText={errors.ZIP?.message}
              {...register("ZIP", {
                required: "This field is required",
                minLength: 7,
                maxLength: 12,
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {isHydrated ? (
              <FormControl fullWidth>
                <FormHelperText>{errors.country?.message}</FormHelperText>
                <Select
                  defaultValue={getAddressDataFromCookies().country}
                  error={!!errors.country}
                  variant="filled"
                  label="Country"
                  {...register("country", {
                    required: "This field is required",
                    validate: (val) =>
                      Object.keys(CountryCodes).includes(val) ||
                      `Only ${Object.values(
                        CountryCodes
                      )} are valid countries.`,
                  })}
                >
                  {COUNTRIES.map(({ code, name }, i) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Skeleton
                height="5.8rem"
                sx={{ mt: "-1.3rem", borderBottom: "3px solid gray" }}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              {...register("phoneNumber", {
                required: "This field is required",
                minLength: 8,
                maxLength: 14,
              })}
            />
          </Grid>

          <Box display="flex" mt={4} justifyContent="center" width="100%">
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
            >
              Review Order
            </Button>
          </Box>
        </Grid>
      </form>
    </Layout>
  );
};

export default AddressPage;
