import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { hospedesMock } from '../../data/mockData';
import type { Hospede } from '../../types/hotel';

const emptyHospede: Omit<Hospede, 'id'> = {
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
  dataNascimento: '',
  endereco: '',
};

export function HospedesPage() {
  const [hospedes, setHospedes] = useState<Hospede[]>(hospedesMock);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedHospede, setSelectedHospede] = useState<Hospede | null>(null);
  const [formData, setFormData] = useState(emptyHospede);

  const filteredHospedes = hospedes.filter(
    hospede =>
      hospede.nome.toLowerCase().includes(search.toLowerCase()) ||
      hospede.cpf.includes(search)
  );

  function handleOpenCreate() {
    setSelectedHospede(null);
    setFormData(emptyHospede);
    setOpenForm(true);
  }

  function handleOpenEdit(hospede: Hospede) {
    setSelectedHospede(hospede);
    setFormData({
      nome: hospede.nome,
      cpf: hospede.cpf,
      email: hospede.email,
      telefone: hospede.telefone,
      dataNascimento: hospede.dataNascimento,
      endereco: hospede.endereco,
    });
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
    setSelectedHospede(null);
    setFormData(emptyHospede);
  }

  function handleSave() {
    if (selectedHospede) {
      setHospedes(currentHospedes =>
        currentHospedes.map(hospede =>
          hospede.id === selectedHospede.id
            ? { ...hospede, ...formData }
            : hospede
        )
      );
    } else {
      const newHospede: Hospede = {
        id: Date.now(),
        ...formData,
      };

      setHospedes(currentHospedes => [...currentHospedes, newHospede]);
    }

    handleCloseForm();
  }

  function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir este hóspede?'
    );

    if (!confirmDelete) return;

    setHospedes(currentHospedes =>
      currentHospedes.filter(hospede => hospede.id !== id)
    );
  }

  function handleOpenDetails(hospede: Hospede) {
    setSelectedHospede(hospede);
    setOpenDetails(true);
  }

  function handleCloseDetails() {
    setOpenDetails(false);
    setSelectedHospede(null);
  }

  function handleChange(field: keyof Omit<Hospede, 'id'>, value: string) {
    setFormData(currentData => ({
      ...currentData,
      [field]: value,
    }));
  }

  return (
    <Box>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4">Hóspedes</Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie os hóspedes cadastrados no hotel.
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleOpenCreate}>
          Novo hóspede
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Buscar por nome ou CPF"
        value={search}
        onChange={event => setSearch(event.target.value)}
        sx={{ mb: 3 }}
      />

      <Stack spacing={2}>
        {filteredHospedes.map(hospede => (
          <Card key={hospede.id}>
            <CardContent>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="h6">{hospede.nome}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    CPF: {hospede.cpf}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hospede.email} | {hospede.telefone}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleOpenDetails(hospede)}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton onClick={() => handleOpenEdit(hospede)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(hospede.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {filteredHospedes.length === 0 && (
        <Typography 
            sx={{
                mt: 3,
                color: "text.secondary"
            }}
            >
          Nenhum hóspede encontrado.
        </Typography>
      )}

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedHospede ? 'Editar hóspede' : 'Cadastrar hóspede'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nome"
              value={formData.nome}
              onChange={event => handleChange('nome', event.target.value)}
              fullWidth
            />

            <TextField
              label="CPF"
              value={formData.cpf}
              onChange={event => handleChange('cpf', event.target.value)}
              fullWidth
            />

            <TextField
              label="E-mail"
              value={formData.email}
              onChange={event => handleChange('email', event.target.value)}
              fullWidth
            />

            <TextField
              label="Telefone"
              value={formData.telefone}
              onChange={event => handleChange('telefone', event.target.value)}
              fullWidth
            />

            <TextField
              label="Data de nascimento"
              type="date"
              value={formData.dataNascimento}
              onChange={event =>
                handleChange('dataNascimento', event.target.value)
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Endereço"
              value={formData.endereco}
              onChange={event => handleChange('endereco', event.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseForm}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDetails}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detalhes do hóspede</DialogTitle>

        <DialogContent>
          {selectedHospede && (
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography>
                <strong>Nome:</strong> {selectedHospede.nome}
              </Typography>

              <Typography>
                <strong>CPF:</strong> {selectedHospede.cpf}
              </Typography>

              <Typography>
                <strong>E-mail:</strong> {selectedHospede.email}
              </Typography>

              <Typography>
                <strong>Telefone:</strong> {selectedHospede.telefone}
              </Typography>

              <Typography>
                <strong>Data de nascimento:</strong>{' '}
                {selectedHospede.dataNascimento}
              </Typography>

              <Typography>
                <strong>Endereço:</strong> {selectedHospede.endereco}
              </Typography>
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDetails}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}