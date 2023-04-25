import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';

export default function BooleanTag({text, disabled, size, color}) {
  return (
    <Box>
      <Chip color={color}
      disabled={disabled} size={size}>{text}</Chip>
    </Box>
  );
}