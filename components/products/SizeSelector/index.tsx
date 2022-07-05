import { Box, Button } from "@mui/material";
import React from "react";
import { ISize } from "../../../interfaces";

type Props = {
  selectedSize?: string;
  sizes: Array<ISize>;
  onClick: (size: ISize) => void;
};

const SizeSelector = ({ selectedSize, sizes, onClick }: Props) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          onClick={() => onClick(size)}
          key={size}
          size="small"
          color={selectedSize === size ? "primary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
