import {
  SearchOutlined,
  ShoppingCartCheckoutOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      <AppBar>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center">
              <Typography color="black" variant="h6">
                Texan |
              </Typography>
              <Typography color="black" variant="h6" fontWeight="100" ml={0.5}>
                Shop
              </Typography>
            </Link>
          </NextLink>

          <Box flex={1} />

          <Box display={{ xs: "none", sm: "block" }}>
            <NextLink href="/category/men" passHref>
              <Link>
                <Button>Men</Button>
              </Link>
            </NextLink>
            <NextLink href="/category/women" passHref>
              <Link>
                <Button>Women</Button>
              </Link>
            </NextLink>
            <NextLink href="/category/kids" passHref>
              <Link>
                <Button>Kids</Button>
              </Link>
            </NextLink>
          </Box>

          <Box flex={1} />

          <IconButton>
            <SearchOutlined />
          </IconButton>

          <NextLink href="/cart" passHref>
            <Link>
              <IconButton>
                <Badge badgeContent={2} color="secondary">
                  <ShoppingCartCheckoutOutlined />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          <Button>Menu</Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
