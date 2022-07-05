import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

type Props = {
  maxNumber: number;
};

const ItemCounter = ({ maxNumber }: Props) => {
  const [count, setCount] = useState(1);

  const handleChangeCount = (add: boolean) => {
    setCount((cur) => {
      if (cur <= 1 && !add) return cur;
      if (cur >= maxNumber && add) return cur;

      return add ? ++cur : --cur;
    });
  };

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => handleChangeCount(false)}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography width={40} textAlign="center">
        {count}
      </Typography>

      <IconButton onClick={() => handleChangeCount(true)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
