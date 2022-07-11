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
import { useContext, useEffect, useState } from "react";
import { UIContext } from "../../context";
import NextLink from "next/link";
import { useRouter } from "next/router";
import SearchInput from "../SearchInput";

export const SideMenu = () => {
  const router = useRouter();

  const { isSidemenuOpen, toggleSideMenu } = useContext(UIContext);

  const navigateTo = (url: string) => {
    if (isSidemenuOpen) toggleSideMenu();

    router.push(url);
  };

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
            <SearchInput neverHide />
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

          <ListItem button onClick={() => navigateTo("/category/men")}>
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary="Men" />
          </ListItem>

          <ListItem button onClick={() => navigateTo("/category/women")}>
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary="Women" />
          </ListItem>

          <ListItem button onClick={() => navigateTo("/category/kid")}>
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary="Kids" />
          </ListItem>

          <ListItem button onClick={() => navigateTo("/category/login")}>
            <ListItemIcon>
              <VpnKeyOutlined />
            </ListItemIcon>
            <ListItemText primary="Signin" />
          </ListItem>

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

          <ListItem button onClick={() => navigateTo("/orders/history")}>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>

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
