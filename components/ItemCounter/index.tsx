import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const INITIAL_QUANTITY = 1;

type Props = {
  maxNumber: number;
  onQuantityChange?: (count: number) => void;
  initialCount?: number;
};

const ItemCounter = ({
  maxNumber,
  onQuantityChange,
  initialCount = INITIAL_QUANTITY,
}: Props) => {
  const [count, setCount] = useState(initialCount);

  const handleChangeCount = (add: boolean) => {
    setCount((cur) => {
      if (cur <= 1 && !add) return cur;
      if (cur >= maxNumber && add) return cur;

      const amountToReturn = add ? ++cur : --cur;

      onQuantityChange?.(amountToReturn);
      return amountToReturn;
    });
  };

  useEffect(() => {
    setCount(INITIAL_QUANTITY);
  }, [maxNumber]);

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
