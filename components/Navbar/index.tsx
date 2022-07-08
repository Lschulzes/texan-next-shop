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
import React, { useContext } from "react";
import { UIContext } from "../../context";

const Navbar = () => {
  const router = useRouter();
  const { query } = router;
  const gender = query?.gender;

  const { openSideMenu } = useContext(UIContext);

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

          <Box display={{ xs: "none", sm: "flex" }} gap={2}>
            <NextLink href="/category/men" passHref>
              <Link>
                <Button color={gender === "men" ? "primary" : "info"}>
                  Men
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/category/women" passHref>
              <Link>
                <Button color={gender === "women" ? "primary" : "info"}>
                  Women
                </Button>
              </Link>
            </NextLink>
            <NextLink href="/category/kid" passHref>
              <Link>
                <Button color={gender === "kid" ? "primary" : "info"}>
                  Kids
                </Button>
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

          <Button onClick={openSideMenu}>Menu</Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Navbar;
