import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

type Props = {
  maxNumber: number;
  onQuantityChange: (count: number) => void;
  count: number;
};

const ItemCounter = ({ maxNumber, onQuantityChange, count }: Props) => {
  const handleChangeCount = (add: boolean) => {
    if (count <= 1 && !add) return;
    if (count >= maxNumber && add) return;

    const amountToReturn = add ? count + 1 : count - 1;

    onQuantityChange(amountToReturn);
    return amountToReturn;
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
