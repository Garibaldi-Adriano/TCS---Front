import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        py: 3,
        mt: 8,
        background: 'rgba(26, 35, 126, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        &copy; {new Date().getFullYear()} Sistema de Locação de Veículos. Todos os direitos reservados.
      </Typography>
    </Box>
  );
}

export default Footer;