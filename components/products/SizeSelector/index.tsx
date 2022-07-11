import { Box, Button } from "@mui/material";
import React from "react";
import { ISize } from "../../../interfaces";

type Props = {
  selectedSize?: string;
  sizes: Array<ISize>;
  onChangeSize: (size: ISize) => void;
};

const SizeSelector = ({ selectedSize, sizes, onChangeSize }: Props) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          onClick={() => onChangeSize(size)}
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
