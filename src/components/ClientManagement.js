import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Snackbar,
  DialogContentText,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Search, Close, Delete, Visibility } from '@mui/icons-material';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import axios from 'axios';

const API_URL = 'http://10.0.1.190:3000/api';;

const clientSchema = yup.object().shape({
  nomeCompleto: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpf: yup.string().required('CPF é obrigatório').matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  telefone: yup.string().required('Telefone é obrigatório').matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido'),
  cep: yup.string().required('CEP é obrigatório').matches(/^\d{5}-\d{3}$/, 'CEP inválido'),
  endereco: yup.string().required('Endereço é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  bairro: yup.string().required('Bairro é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Estado é obrigatório').matches(/^[A-Z]{2}$/, 'Estado inválido')
});

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

const MaskedTextField = ({ mask, value, onChange, ...props }) => (
  <InputMask mask={mask} value={value || ''} onChange={onChange}>
    {(inputProps) => <TextField {...inputProps} {...props} />}
  </InputMask>
);

function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '' });
  const [validationErrors, setValidationErrors] = useState({});
  const [openContractsDialog, setOpenContractsDialog] = useState(false);
  const [selectedClientContracts, setSelectedClientContracts] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes`);
      setClients(response.data);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Erro ao carregar clientes'
      });
    }
  };

  const handleCepSearch = async (cep) => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) return;

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (!response.data.erro) {
        setCurrentClient({
          ...currentClient,
          cep,
          endereco: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
          estado: response.data.uf,
        });
        setValidationErrors({});
      } else {
        setNotification({ open: true, message: 'CEP não encontrado' });
      }
    } catch (error) {
      setNotification({ open: true, message: 'Erro ao buscar CEP' });
    }
  };

  const validateForm = async () => {
    try {
      await clientSchema.validate(currentClient, { abortEarly: false });
      setValidationErrors({});
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setValidationErrors(errors);
      return false;
    }
  };

  const columns = [
    { field: 'nomeCompleto', headerName: 'Nome Completo', flex: 1 },
    { field: 'cpf', headerName: 'CPF', flex: 0.8 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'telefone', headerName: 'Telefone', flex: 0.8 },
    { field: 'cidade', headerName: 'Cidade', flex: 0.8 },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.7,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row)} color="primary">
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row)} color="error">
            <Delete />
          </IconButton>
          <IconButton onClick={() => handleViewContracts(params.row)} color="info">
            <Visibility />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleViewContracts = async (client) => {
    try {
      const response = await axios.get(`${API_URL}/clientes/${client.id}`);
      setSelectedClientContracts(response.data.contratos || []);
      setOpenContractsDialog(true);
    } catch (error) {
      setNotification({
        open: true,
        message: 'Erro ao carregar contratos do cliente'
      });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentClient(null);
    setValidationErrors({});
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setOpenDialog(true);
    setValidationErrors({});
  };

  const handleDeleteClick = (client) => {
    setCurrentClient(client);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/clientes/${currentClient.id}`);
      await fetchClients();
      setOpenDeleteDialog(false);
      setNotification({ open: true, message: 'Cliente excluído com sucesso!' });
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.error?.message || 'Erro ao excluir cliente'
      });
    }
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      setNotification({
        open: true,
        message: 'Por favor, corrija os erros antes de salvar'
      });
      return;
    }

    const clientData = {
      nomeCompleto: currentClient.nomeCompleto,
      cpf: currentClient.cpf,
      email: currentClient.email,
      telefone: currentClient.telefone,
      cep: currentClient.cep,
      endereco: currentClient.endereco,
      numero: currentClient.numero,
      complemento: currentClient.complemento,
      bairro: currentClient.bairro,
      cidade: currentClient.cidade,
      estado: currentClient.estado
    };

    try {
      if (currentClient.id) {
        await axios.put(`${API_URL}/clientes/${currentClient.id}`, clientData);
      } else {
        await axios.post(`${API_URL}/clientes`, clientData);
      }
      await fetchClients();
      setNotification({ open: true, message: 'Cliente salvo com sucesso!' });
      handleCloseDialog();
    } catch (error) {
      setNotification({
        open: true,
        message: error.response?.data?.error?.message || 'Erro ao salvar cliente'
      });
    }
  };

  const filteredClients = clients.filter(client =>
    client.nomeCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.cpf?.includes(searchTerm)
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Cadastro de Clientes
          </Typography>
          
          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <TextField
              label="Buscar cliente"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: <Search />,
              }}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setCurrentClient({});
                setOpenDialog(true);
              }}
            >
              Novo Cliente
            </Button>
          </Box>

          <DataGrid
            rows={filteredClients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            autoHeight
            disableSelectionOnClick
            sx={{ minHeight: 400 }}
          />
        </Paper>

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {currentClient?.id ? 'Editar Cliente' : 'Novo Cliente'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {/* Dados Pessoais */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Dados Pessoais</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nome Completo"
                  fullWidth
                  required
                  value={currentClient?.nomeCompleto || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, nomeCompleto: e.target.value })}
                  error={!!validationErrors.nomeCompleto}
                  helperText={validationErrors.nomeCompleto}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MaskedTextField
                  mask="999.999.999-99"
                  label="CPF"
                  fullWidth
                  required
                  value={currentClient?.cpf || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, cpf: e.target.value })}
                  error={!!validationErrors.cpf}
                  helperText={validationErrors.cpf}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  fullWidth
                  required
                  type="email"
                  value={currentClient?.email || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, email: e.target.value })}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MaskedTextField
                  mask="(99) 99999-9999"
                  label="Telefone"
                  fullWidth
                  required
                  value={currentClient?.telefone || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, telefone: e.target.value })}
                  error={!!validationErrors.telefone}
                  helperText={validationErrors.telefone}
                />
              </Grid>

              {/* Endereço */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Endereço</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <MaskedTextField
                  mask="99999-999"
                  label="CEP"
                  fullWidth
                  required
                  value={currentClient?.cep || ''}
                  onChange={(e) => {
                    const cep = e.target.value;
                    setCurrentClient({ ...currentClient, cep });
                    if (cep.replace(/\D/g, '').length === 8) {
                      handleCepSearch(cep);
                    }
                  }}
                  error={!!validationErrors.cep}
                  helperText={validationErrors.cep}
                  InputProps={{
                    endAdornment: (
                      <IconButton 
                        size="small"
                        onClick={() => currentClient?.cep && handleCepSearch(currentClient.cep)}
                      >
                        <Search />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Endereço"
                  fullWidth
                  required
                  value={currentClient?.endereco || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, endereco: e.target.value })}
                  error={!!validationErrors.endereco}
                  helperText={validationErrors.endereco}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Número"
                  fullWidth
                  required
                  value={currentClient?.numero || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, numero: e.target.value })}
                  error={!!validationErrors.numero}
                  helperText={validationErrors.numero}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Complemento"
                  fullWidth
                  value={currentClient?.complemento || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, complemento: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Bairro"
                  fullWidth
                  required
                  value={currentClient?.bairro || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, bairro: e.target.value })}
                  error={!!validationErrors.bairro}
                  helperText={validationErrors.bairro}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Cidade"
                  fullWidth
                  required
                  value={currentClient?.cidade || ''}
                  onChange={(e) => setCurrentClient({ ...currentClient, cidade: e.target.value })}
                  error={!!validationErrors.cidade}
                  helperText={validationErrors.cidade}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Estado"
                  fullWidth
                  required
                  value={currentClient?.estado || ''}
                  onChange={(e) => setCurrentClient({ 
                    ...currentClient, 
                    estado: e.target.value.toUpperCase() 
                  })}
                  error={!!validationErrors.estado}
                  helperText={validationErrors.estado}
                  inputProps={{ maxLength: 2 }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
           <Button onClick={handleCloseDialog}>Cancelar</Button>
           <Button onClick={handleSave} variant="contained">
             Salvar
           </Button>
         </DialogActions>
       </Dialog>

       <Dialog
          open={openContractsDialog}
          onClose={() => setOpenContractsDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Contratos do Cliente</DialogTitle>
          <DialogContent>
            {selectedClientContracts.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nº Contrato</TableCell>
                    <TableCell>Data Locação</TableCell>
                    <TableCell>Data Devolução</TableCell>
                    <TableCell>Valor Total</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedClientContracts.map((contrato) => (
                    <TableRow key={contrato.contratoId}>
                      <TableCell>{contrato.contrato.id}</TableCell>
                      <TableCell>
                        {new Date(contrato.contrato.dataLocacao).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(contrato.contrato.dataDevolucao).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {contrato.contrato.valorTotal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </TableCell>
                      <TableCell>{contrato.contrato.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Typography>Nenhum contrato encontrado para este cliente.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenContractsDialog(false)}>Fechar</Button>
          </DialogActions>
        </Dialog>

       <Dialog
         open={openDeleteDialog}
         onClose={() => setOpenDeleteDialog(false)}
       >
         <DialogTitle>Confirmar Exclusão</DialogTitle>
         <DialogContent>
           <DialogContentText>
             Tem certeza que deseja excluir o cliente {currentClient?.nomeCompleto}? Esta ação não pode ser desfeita.
           </DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
           <Button onClick={handleDelete} color="error" variant="contained">
             Excluir
           </Button>
         </DialogActions>
       </Dialog>

       <Snackbar
         open={notification.open}
         autoHideDuration={6000}
         onClose={() => setNotification({ ...notification, open: false })}
         message={notification.message}
         action={
           <IconButton
             size="small"
             color="inherit"
             onClick={() => setNotification({ ...notification, open: false })}
           >
             <Close />
           </IconButton>
         }
       />
     </Container>
   </ThemeProvider>
 );
}

export default ClientManagement;