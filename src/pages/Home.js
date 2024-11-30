import React from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ExploreIcon from '@mui/icons-material/Explore';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

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

function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Banner */}
        <Paper
          elevation={3}
          sx={{
            textAlign: 'center',
            py: 5,
            px: 3,
            mb: 4,
            background: 'linear-gradient(90deg, #1a237e, #3949ab)',
            color: '#fff',
          }}
        >
          <DirectionsCarIcon sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Sistema de Locação de Veículos
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            O lugar certo para alugar veículos de forma prática, rápida e segura.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 3 }}
            onClick={() => alert('Navegar para cadastro ou locação!')}
          >
            Comece Agora
          </Button>
        </Paper>

        {/* Recursos Principais */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'background.paper' }}>
              <ExploreIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Explore a Frota
              </Typography>
              <Typography>
                Descubra uma ampla variedade de carros para atender às suas necessidades.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'background.paper' }}>
              <DirectionsCarIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Locação Simplificada
              </Typography>
              <Typography>
                Alugue em minutos com nosso sistema fácil e intuitivo.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'background.paper' }}>
              <ContactSupportIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Suporte 24/7
              </Typography>
              <Typography>
                Nossa equipe está disponível para ajudá-lo a qualquer momento.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Paper
          elevation={2}
          sx={{
            textAlign: 'center',
            py: 5,
            mt: 4,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Pronto para Começar?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Cadastre-se agora e comece a alugar o veículo ideal para você.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => alert('Redirecionar para página de cadastro!')}
          >
            Cadastre-se
          </Button>
        </Paper>


      </Container>
    </ThemeProvider>
  );
}

export default Home;
