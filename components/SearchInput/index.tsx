import { SearchOutlined } from "@mui/icons-material";
import { Input, InputAdornment, IconButton } from "@mui/material";
import router, { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { UIContext } from "../../context";

const SearchInput = () => {
  const router = useRouter();

  const { isSidemenuOpen, toggleSideMenu } = useContext(UIContext);

  const [searchTerm, setSearchTerm] = useState("");

  const navigateTo = (url: string) => {
    if (isSidemenuOpen) toggleSideMenu();

    router.push(url);
  };

  const handleSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };
  return (
    <Input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDownCapture={(e) => (e.key === "Enter" ? handleSearchTerm() : null)}
      placeholder="Search..."
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            type="submit"
            aria-label="toggle password visibility"
            onClick={handleSearchTerm}
          >
            <SearchOutlined />
          </IconButton>
        </InputAdornment>
      }
      onSubmit={(e) => router.push(`/products?search=${e}`)}
    />
  );
};

export default SearchInput;
