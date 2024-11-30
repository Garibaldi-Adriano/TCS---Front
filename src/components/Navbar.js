import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 3 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/clientes">
            Clientes
          </Button>
          <Button color="inherit" component={Link} to="/contratos">
            Contratos
          </Button>
          <Button color="inherit" component={Link} to="/devolucao">
            Devolução
          </Button>
          <Button color="inherit" component={Link} to="/veiculos">
            Veículos
          </Button>
          <Button color="inherit" component={Link} to="/manutencao">
            Manutenção
          </Button>
          <Button color="inherit" component={Link} to="/relatorios">
            Relatórios
          </Button>
          <Button color="inherit" component={Link} to="/sobre">
            Sobre
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;