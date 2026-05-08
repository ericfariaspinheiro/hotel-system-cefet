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
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { quartosMock } from '../../data/mockData';
import type { Quarto, StatusQuarto } from '../../types/hotel';

const emptyQuarto: Omit<Quarto, 'id'> = {
  numero: '',
  tipo: '',
  capacidade: 1,
  precoDiaria: 0,
  status: 'Disponível',
  descricao: '',
};

export function QuartosPage() {
  const [quartos, setQuartos] = useState<Quarto[]>(quartosMock);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedQuarto, setSelectedQuarto] = useState<Quarto | null>(null);
  const [formData, setFormData] = useState<Omit<Quarto, 'id'>>(emptyQuarto);

  const filteredQuartos = quartos.filter(
    quarto =>
      quarto.numero.includes(search) ||
      quarto.tipo.toLowerCase().includes(search.toLowerCase()) ||
      quarto.status.toLowerCase().includes(search.toLowerCase())
  );

  function handleOpenCreate() {
    setSelectedQuarto(null);
    setFormData(emptyQuarto);
    setOpenForm(true);
  }

  function handleOpenEdit(quarto: Quarto) {
    setSelectedQuarto(quarto);
    setFormData({
      numero: quarto.numero,
      tipo: quarto.tipo,
      capacidade: quarto.capacidade,
      precoDiaria: quarto.precoDiaria,
      status: quarto.status,
      descricao: quarto.descricao,
    });
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
    setSelectedQuarto(null);
    setFormData(emptyQuarto);
  }

  function handleSave() {
    if (selectedQuarto) {
      setQuartos(currentQuartos =>
        currentQuartos.map(quarto =>
          quarto.id === selectedQuarto.id
            ? { ...quarto, ...formData }
            : quarto
        )
      );
    } else {
      const newQuarto: Quarto = {
        id: Date.now(),
        ...formData,
      };

      setQuartos(currentQuartos => [...currentQuartos, newQuarto]);
    }

    handleCloseForm();
  }

  function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir este quarto?'
    );

    if (!confirmDelete) return;

    setQuartos(currentQuartos =>
      currentQuartos.filter(quarto => quarto.id !== id)
    );
  }

  function handleOpenDetails(quarto: Quarto) {
    setSelectedQuarto(quarto);
    setOpenDetails(true);
  }

  function handleCloseDetails() {
    setOpenDetails(false);
    setSelectedQuarto(null);
  }

  function handleChange(
    field: keyof Omit<Quarto, 'id'>,
    value: string | number | StatusQuarto
  ) {
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
          <Typography variant="h4">Quartos</Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie os quartos disponíveis no hotel.
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleOpenCreate}>
          Novo quarto
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Buscar por número, tipo ou status"
        value={search}
        onChange={event => setSearch(event.target.value)}
        sx={{ mb: 3 }}
      />

      <Stack spacing={2}>
        {filteredQuartos.map(quarto => (
          <Card key={quarto.id}>
            <CardContent>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="h6">Quarto {quarto.numero}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tipo: {quarto.tipo} | Capacidade: {quarto.capacidade}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {quarto.status} | Diária: R$ {quarto.precoDiaria}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleOpenDetails(quarto)}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton onClick={() => handleOpenEdit(quarto)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(quarto.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {filteredQuartos.length === 0 && (
        <Typography sx={{ mt: 3 }} color="text.secondary">
          Nenhum quarto encontrado.
        </Typography>
      )}

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedQuarto ? 'Editar quarto' : 'Cadastrar quarto'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Número"
              value={formData.numero}
              onChange={event => handleChange('numero', event.target.value)}
              fullWidth
            />

            <TextField
              label="Tipo"
              value={formData.tipo}
              onChange={event => handleChange('tipo', event.target.value)}
              fullWidth
            />

            <TextField
              label="Capacidade"
              type="number"
              value={formData.capacidade}
              onChange={event =>
                handleChange('capacidade', Number(event.target.value))
              }
              fullWidth
            />

            <TextField
              label="Preço da diária"
              type="number"
              value={formData.precoDiaria}
              onChange={event =>
                handleChange('precoDiaria', Number(event.target.value))
              }
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                value={formData.status}
                onChange={event =>
                  handleChange('status', event.target.value as StatusQuarto)
                }
              >
                <MenuItem value="Disponível">Disponível</MenuItem>
                <MenuItem value="Ocupado">Ocupado</MenuItem>
                <MenuItem value="Reservado">Reservado</MenuItem>
                <MenuItem value="Manutenção">Manutenção</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Descrição"
              value={formData.descricao}
              onChange={event => handleChange('descricao', event.target.value)}
              fullWidth
              multiline
              rows={3}
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
        <DialogTitle>Detalhes do quarto</DialogTitle>

        <DialogContent>
          {selectedQuarto && (
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography>
                <strong>Número:</strong> {selectedQuarto.numero}
              </Typography>
              <Typography>
                <strong>Tipo:</strong> {selectedQuarto.tipo}
              </Typography>
              <Typography>
                <strong>Capacidade:</strong> {selectedQuarto.capacidade}
              </Typography>
              <Typography>
                <strong>Preço da diária:</strong> R${' '}
                {selectedQuarto.precoDiaria}
              </Typography>
              <Typography>
                <strong>Status:</strong> {selectedQuarto.status}
              </Typography>
              <Typography>
                <strong>Descrição:</strong> {selectedQuarto.descricao}
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