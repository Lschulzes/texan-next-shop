import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { UIContext } from "../../context";
import NextLink from "next/link";
import { useRouter } from "next/router";

export const SideMenu = () => {
  const router = useRouter();

  const { isSidemenuOpen, toggleSideMenu } = useContext(UIContext);

  return (
    <Drawer
      open={isSidemenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type="text"
              placeholder="Search..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    aria-label="toggle password visibility"
                  >
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
              onSubmit={(e) => router.push(`/products?search=${e}`)}
            />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary="My orders" />
          </ListItem>

          <NextLink href="/category/men" passHref>
            <Link>
              <ListItem button>
                <ListItemIcon>
                  <MaleOutlined />
                </ListItemIcon>
                <ListItemText primary="Men" />
              </ListItem>
            </Link>
          </NextLink>

          <NextLink href="/category/women" passHref>
            <Link>
              <ListItem button>
                <ListItemIcon>
                  <FemaleOutlined />
                </ListItemIcon>
                <ListItemText primary="Women" />
              </ListItem>
            </Link>
          </NextLink>

          <NextLink href="/category/kid" passHref>
            <Link>
              <ListItem button>
                <ListItemIcon>
                  <EscalatorWarningOutlined />
                </ListItemIcon>
                <ListItemText primary="Kids" />
              </ListItem>
            </Link>
          </NextLink>

          <NextLink href="/auth/login" passHref>
            <Link>
              <ListItem button>
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary="Signin" />
              </ListItem>
            </Link>
          </NextLink>

          <ListItem button>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem button>
            <ListItemIcon>
              <CategoryOutlined />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>

          <NextLink href="/orders/history" passHref>
            <Link>
              <ListItem button>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
            </Link>
          </NextLink>

          <ListItem button>
            <ListItemIcon>
              <AdminPanelSettings />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
