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
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { CartContext, UIContext, useCart } from "../../context";
import SearchInput from "../SearchInput";

const Navbar = () => {
  const { asPath } = useRouter();

  const { toggleSideMenu } = useContext(UIContext);
  const { quantity } = useCart();
  const [isSearchHidden, setIsSearchHidden] = useState(true);

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

          {isSearchHidden && (
            <Box display={{ xs: "none", sm: "flex" }} gap={2}>
              <NextLink href="/category/men" passHref>
                <Link>
                  <Button
                    color={asPath === "/category/men" ? "primary" : "info"}
                  >
                    Men
                  </Button>
                </Link>
              </NextLink>
              <NextLink href="/category/women" passHref>
                <Link>
                  <Button
                    color={asPath === "/category/women" ? "primary" : "info"}
                  >
                    Women
                  </Button>
                </Link>
              </NextLink>
              <NextLink href="/category/kid" passHref>
                <Link>
                  <Button
                    color={asPath === "/category/kid" ? "primary" : "info"}
                  >
                    Kids
                  </Button>
                </Link>
              </NextLink>
            </Box>
          )}

          <Box flex={1} />

          <SearchInput
            onChangeHidden={(isHidden) => setIsSearchHidden(isHidden)}
            hidden
            sx={{ display: { xs: "none", sm: "flex" } }}
          />

          <IconButton
            onClick={toggleSideMenu}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <SearchOutlined />
          </IconButton>

          <NextLink href="/cart" passHref>
            <Link>
              <IconButton>
                <Badge
                  badgeContent={quantity > 9 ? "+9" : quantity}
                  color="secondary"
                >
                  <ShoppingCartCheckoutOutlined />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          <Button onClick={toggleSideMenu}>Menu</Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
