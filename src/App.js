// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ClientManagement from './components/ClientManagement';
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Navbar from './components/Navbar';
import EmConstrucao from './components/EmConstrucao';
import NotFound from './pages/404';
import Footer from './components/Footer';

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

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<ClientManagement />} />
          <Route path="/contratos" element={<EmConstrucao />} />
          <Route path="/devolucao" element={<EmConstrucao />} />
          <Route path="/veiculos" element={<EmConstrucao />} />
          <Route path="/manutencao" element={<EmConstrucao />} />
          <Route path="/relatorios" element={<EmConstrucao />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;