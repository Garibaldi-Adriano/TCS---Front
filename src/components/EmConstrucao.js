import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { Construction } from '@mui/icons-material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function EmConstrucao() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              minHeight: 400,
              justifyContent: 'center'
            }}
          >
            <Construction sx={{ fontSize: 100, color: '#90caf9' }} />
            <Typography variant="h4" gutterBottom>
              Página em Construção
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default EmConstrucao;