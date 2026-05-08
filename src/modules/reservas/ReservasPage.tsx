import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';


import { api } from '../../services/api';
import type { Hospede, Quarto, Reserva, StatusReserva } from '../../types/hotel';
import { ConfirmDialog } from '../../componentes/ConfirmDialog';
import { CrudList } from '../../componentes/CrudList';
import { FeedbackSnackbar } from '../../componentes/FeedbackSnackbar';
import { PageHeader } from '../../componentes/PageHeader';
import { SearchInput } from '../../componentes/SearchInput';

const emptyReserva: Omit<Reserva, 'id'> = {
  hospedeId: 0,
  quartoId: 0,
  dataEntrada: '',
  dataSaida: '',
  status: 'Pendente',
  valorTotal: 0,
};

export function ReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [hospedes, setHospedes] = useState<Hospede[]>([]);
  const [quartos, setQuartos] = useState<Quarto[]>([]);

  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [formData, setFormData] = useState<Omit<Reserva, 'id'>>(emptyReserva);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [reservaToDelete, setReservaToDelete] = useState<number | null>(null);

  async function loadReservas() {
    const response = await api.get('/reservas');
    setReservas(response.data);
  }

  async function loadHospedes() {
    const response = await api.get('/hospedes');
    setHospedes(response.data);
  }

  async function loadQuartos() {
    const response = await api.get('/quartos');
    setQuartos(response.data);
  }

  async function loadPageData() {
    await Promise.all([loadReservas(), loadHospedes(), loadQuartos()]);
  }

  useEffect(() => {
    loadPageData();
  }, []);

  function getHospedeNome(id: number) {
    return hospedes.find(hospede => hospede.id === id)?.nome || 'Não informado';
  }

  function getQuartoNumero(id: number) {
    return quartos.find(quarto => quarto.id === id)?.numero || 'Não informado';
  }

  const filteredReservas = reservas.filter(reserva => {
    const hospedeNome = getHospedeNome(reserva.hospedeId).toLowerCase();
    const quartoNumero = getQuartoNumero(reserva.quartoId).toLowerCase();

    return (
      hospedeNome.includes(search.toLowerCase()) ||
      quartoNumero.includes(search.toLowerCase()) ||
      reserva.status.toLowerCase().includes(search.toLowerCase())
    );
  });

  const reservasList = filteredReservas.map(reserva => ({
    id: reserva.id,
    title: getHospedeNome(reserva.hospedeId),
    subtitle: `Quarto: ${getQuartoNumero(reserva.quartoId)} | Status: ${reserva.status}`,
    description: `Entrada: ${reserva.dataEntrada} | Saída: ${reserva.dataSaida}`,
  }));

  function showMessage(message: string) {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  }

  function handleOpenCreate() {
    setSelectedReserva(null);
    setFormData(emptyReserva);
    setOpenForm(true);
  }

  function handleOpenEdit(reserva: Reserva) {
    setSelectedReserva(reserva);
    setFormData({
      hospedeId: reserva.hospedeId,
      quartoId: reserva.quartoId,
      dataEntrada: reserva.dataEntrada,
      dataSaida: reserva.dataSaida,
      status: reserva.status,
      valorTotal: reserva.valorTotal,
    });
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
    setSelectedReserva(null);
    setFormData(emptyReserva);
  }

  async function handleSave() {
    if (selectedReserva) {
      await api.put(`/reservas/${selectedReserva.id}`, formData);
      showMessage('Reserva atualizada com sucesso.');
    } else {
      await api.post('/reservas', formData);
      showMessage('Reserva cadastrada com sucesso.');
    }

    await loadReservas();
    handleCloseForm();
  }

  function handleOpenDeleteDialog(id: number) {
    setReservaToDelete(id);
    setOpenDeleteDialog(true);
  }

  function handleCloseDeleteDialog() {
    setReservaToDelete(null);
    setOpenDeleteDialog(false);
  }

  async function handleConfirmDelete() {
    if (!reservaToDelete) return;

    await api.delete(`/reservas/${reservaToDelete}`);

    showMessage('Reserva excluída com sucesso.');

    await loadReservas();
    handleCloseDeleteDialog();
  }

  function handleOpenDetails(reserva: Reserva) {
    setSelectedReserva(reserva);
    setOpenDetails(true);
  }

  function handleCloseDetails() {
    setOpenDetails(false);
    setSelectedReserva(null);
  }

  function handleChange(
    field: keyof Omit<Reserva, 'id'>,
    value: string | number | StatusReserva
  ) {
    setFormData(currentData => ({
      ...currentData,
      [field]: value,
    }));
  }

  return (
    <Box>
      <PageHeader
        title="Reservas"
        description="Gerencie as reservas realizadas no hotel."
        buttonText="Nova reserva"
        onButtonClick={handleOpenCreate}
      />

      <SearchInput
        label="Buscar por hóspede, quarto ou status"
        value={search}
        onChange={setSearch}
      />

      <CrudList
        items={reservasList}
        emptyMessage="Nenhuma reserva encontrada."
        onDetails={id => {
          const reserva = reservas.find(item => item.id === id);

          if (reserva) {
            handleOpenDetails(reserva);
          }
        }}
        onEdit={id => {
          const reserva = reservas.find(item => item.id === id);

          if (reserva) {
            handleOpenEdit(reserva);
          }
        }}
        onDelete={handleOpenDeleteDialog}
      />

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedReserva ? 'Editar reserva' : 'Cadastrar reserva'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Hóspede</InputLabel>

              <Select
                label="Hóspede"
                value={formData.hospedeId}
                onChange={event =>
                  handleChange('hospedeId', Number(event.target.value))
                }
              >
                <MenuItem value={0}>Selecione um hóspede</MenuItem>

                {hospedes.map(hospede => (
                  <MenuItem key={hospede.id} value={hospede.id}>
                    {hospede.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Quarto</InputLabel>

              <Select
                label="Quarto"
                value={formData.quartoId}
                onChange={event =>
                  handleChange('quartoId', Number(event.target.value))
                }
              >
                <MenuItem value={0}>Selecione um quarto</MenuItem>

                {quartos.map(quarto => (
                  <MenuItem key={quarto.id} value={quarto.id}>
                    Quarto {quarto.numero} - {quarto.tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Data de entrada"
              type="date"
              value={formData.dataEntrada}
              onChange={event => handleChange('dataEntrada', event.target.value)}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />

            <TextField
              label="Data de saída"
              type="date"
              value={formData.dataSaida}
              onChange={event => handleChange('dataSaida', event.target.value)}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>

              <Select
                label="Status"
                value={formData.status}
                onChange={event =>
                  handleChange('status', event.target.value as StatusReserva)
                }
              >
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Confirmada">Confirmada</MenuItem>
                <MenuItem value="Cancelada">Cancelada</MenuItem>
                <MenuItem value="Finalizada">Finalizada</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Valor total"
              type="number"
              value={formData.valorTotal}
              onChange={event =>
                handleChange('valorTotal', Number(event.target.value))
              }
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
        <DialogTitle>Detalhes da reserva</DialogTitle>

        <DialogContent>
          {selectedReserva && (
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography>
                <strong>Hóspede:</strong>{' '}
                {getHospedeNome(selectedReserva.hospedeId)}
              </Typography>

              <Typography>
                <strong>Quarto:</strong>{' '}
                {getQuartoNumero(selectedReserva.quartoId)}
              </Typography>

              <Typography>
                <strong>Data de entrada:</strong> {selectedReserva.dataEntrada}
              </Typography>

              <Typography>
                <strong>Data de saída:</strong> {selectedReserva.dataSaida}
              </Typography>

              <Typography>
                <strong>Status:</strong> {selectedReserva.status}
              </Typography>

              <Typography>
                <strong>Valor total:</strong> R$ {selectedReserva.valorTotal}
              </Typography>
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDetails}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={openDeleteDialog}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir esta reserva?"
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />

      <FeedbackSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
}