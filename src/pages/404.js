import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Stack,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function NotFound() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box 
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#121212',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper
            elevation={24}
            sx={{
              textAlign: 'center',
              p: { xs: 4, md: 8 },
              backgroundColor: '#1e1e1e',
              borderRadius: 4,
              maxWidth: '600px',
              width: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                animation: 'pulse 2s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            >
              <ErrorOutlineIcon 
                sx={{ 
                  fontSize: { xs: 80, md: 120 }, 
                  mb: 2,
                  color: 'primary.main',
                  filter: 'drop-shadow(0 0 10px rgba(144, 202, 249, 0.5))',
                }} 
              />
            </Box>

            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '4rem', md: '6rem' },
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(45deg, #90caf9, #f48fb1)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </Typography>

            <Typography 
              variant="h4" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: 3,
                fontWeight: 500,
              }}
            >
              Página Não Encontrada
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                mb: 6,
                opacity: 0.9,
                maxWidth: '80%',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Desculpe, a página que você está procurando não existe ou foi movida para outro endereço.
            </Typography>

            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                }}
              >
                Página Inicial
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default NotFound;