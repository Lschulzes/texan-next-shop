import { CloseOutlined, SearchOutlined } from "@mui/icons-material";
import { Input, InputAdornment, IconButton, InputProps } from "@mui/material";
import router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UIContext } from "../../context";

type Props = {
  hidden?: boolean;
  neverHide?: boolean;
  onChangeHidden?: (isHidden: boolean) => void;
} & InputProps;

const SearchInput = ({
  hidden,
  onChangeHidden,
  neverHide = false,
  ...props
}: Props) => {
  const router = useRouter();

  const { isSidemenuOpen, toggleSideMenu } = useContext(UIContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isHidden, setIsHidden] = useState(hidden ?? false);

  const navigateTo = (url: string) => {
    if (isSidemenuOpen) toggleSideMenu();

    router.push(url);
  };

  const handleSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };

  useEffect(() => {
    onChangeHidden?.(isHidden);
  }, [hidden, onChangeHidden, isHidden]);

  return (
    <>
      {isHidden && !neverHide ? (
        <IconButton onClick={() => setIsHidden(false)}>
          <SearchOutlined />
        </IconButton>
      ) : (
        <Input
          className="fadeIn"
          autoFocus
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDownCapture={(e) =>
            e.key === "Enter" ? handleSearchTerm() : null
          }
          placeholder="Search..."
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                type="submit"
                aria-label="toggle password visibility"
                onClick={() =>
                  neverHide ? handleSearchTerm() : setIsHidden(true)
                }
              >
                {neverHide ? <SearchOutlined /> : <CloseOutlined />}
              </IconButton>
            </InputAdornment>
          }
          onSubmit={(e) => router.push(`/products?search=${e}`)}
          {...props}
        />
      )}
    </>
  );
};

export default SearchInput;
