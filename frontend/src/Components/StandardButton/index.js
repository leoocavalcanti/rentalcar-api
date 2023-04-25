import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

export default function StandardButton({text}) {
  return (

    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button className="button" style={{height: 50, background: '#1D2950', color: '#fff'}} variant="soft">{text}</Button>
    </Box>

  );
}