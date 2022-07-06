import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import NextLink from "next/link";
import AuthLayout from "../../components/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout title={"Login"}>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Start Session
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Email" variant="filled" fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink href="/auth/register" passHref>
              <Link underline="always">{"Don't have an account?"}</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
