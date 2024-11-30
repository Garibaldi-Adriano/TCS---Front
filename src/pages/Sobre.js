import React from 'react';
import { Container, Box, Typography, Paper, Grid, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';

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

function About() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Título da Página */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            textAlign: 'center',
            background: 'linear-gradient(90deg, #1a237e, #3949ab)',
            color: '#fff',
          }}
        >
          <InfoIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Sobre o Sistema
          </Typography>
          <Typography variant="h6">
            Um projeto desenvolvido com o objetivo de aprendizado e prática de desenvolvimento de software.
          </Typography>
        </Paper>

        {/* Conteúdo Principal */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'background.paper' }}>
              <SchoolIcon sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Finalidade
              </Typography>
              <Typography>
                Este sistema foi desenvolvido como uma atividade prática na disciplina de 
                <strong> Tecnologias de Construção de Software</strong>, ministrada pelo professor 
                <strong> Daniel Corrêa da Silva</strong> na Pontifícia Universidade Católica de Goiás.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'background.paper' }}>
              <CodeIcon sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Tecnologia Utilizada
              </Typography>
              <Typography>
                O sistema foi desenvolvido utilizando tecnologias modernas como React no frontend e Node.js no backend, com integração a bancos de dados por meio do Prisma.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center', backgroundColor: 'background.paper' }}>
              <InfoIcon sx={{ fontSize: 50, color: 'primary.main' }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Sobre a Instituição
              </Typography>
              <Typography>
                Este projeto foi realizado na <strong>Pontifícia Universidade Católica de Goiás</strong>, uma das mais renomadas instituições de ensino superior do Brasil.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box
          sx={{
            textAlign: 'center',
            py: 3,
            mt: 4,
            backgroundColor: '#1a237e',
            color: '#fff',
          }}
        >
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} Sistema de Locação de Veículos. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default About;