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
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PageHeader } from '../../componentes/PageHeader';
import { ConfirmDialog } from '../../componentes/ConfirmDialog';
import { FeedbackSnackbar } from '../../componentes/FeedbackSnackbar';
import { servicosMock } from '../../data/mockData';
import type { Servico } from '../../types/hotel';

const emptyServico: Omit<Servico, 'id'> = {
  nome: '',
  descricao: '',
  preco: 0,
  disponivel: true,
  categoria: '',
};

export function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>(servicosMock);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [formData, setFormData] = useState<Omit<Servico, 'id'>>(emptyServico);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [servicoToDelete, setServicoToDelete] = useState<number | null>(null);

  const filteredServicos = servicos.filter(
    servico =>
      servico.nome.toLowerCase().includes(search.toLowerCase()) ||
      servico.categoria.toLowerCase().includes(search.toLowerCase())
  );

  function handleOpenCreate() {
    setSelectedServico(null);
    setFormData(emptyServico);
    setOpenForm(true);
  }

  function handleOpenEdit(servico: Servico) {
    setSelectedServico(servico);
    setFormData({
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco,
      disponivel: servico.disponivel,
      categoria: servico.categoria,
    });
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
    setSelectedServico(null);
    setFormData(emptyServico);
  }

  function handleSave() {
    if (selectedServico) {
      setServicos(currentServicos =>
        currentServicos.map(servico =>
          servico.id === selectedServico.id
            ? { ...servico, ...formData }
            : servico
        )
      );

      showMessage('Serviço atualizado com sucesso.');
    } else {
      const newServico: Servico = {
        id: Date.now(),
        ...formData,
      };

      setServicos(currentServicos => [...currentServicos, newServico]);

      showMessage('Serviço cadastrado com sucesso.');
    }

    handleCloseForm();
  }

  function handleOpenDeleteDialog(id: number) {
    setServicoToDelete(id);
    setOpenDeleteDialog(true);
  }

  function handleCloseDeleteDialog() {
    setServicoToDelete(null);
    setOpenDeleteDialog(false);
  }

  function handleConfirmDelete() {
    if (!servicoToDelete) return;

    setServicos(currentServicos =>
      currentServicos.filter(servico => servico.id !== servicoToDelete)
    );

    showMessage('Serviço excluído com sucesso.');
    handleCloseDeleteDialog();
  }

  function handleOpenDetails(servico: Servico) {
    setSelectedServico(servico);
    setOpenDetails(true);
  }

  function handleCloseDetails() {
    setOpenDetails(false);
    setSelectedServico(null);
  }

  function handleChange(
    field: keyof Omit<Servico, 'id'>,
    value: string | number | boolean
  ) {
    setFormData(currentData => ({
      ...currentData,
      [field]: value,
    }));
  }

  function showMessage(message: string) {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  }

  return (
    <Box>
      <PageHeader
        title="Serviços"
        description="Gerencie os serviços oferecidos pelo hotel."
        buttonText="Novo serviço"
        onButtonClick={handleOpenCreate}
      />

      <TextField
        fullWidth
        label="Buscar por nome ou categoria"
        value={search}
        onChange={event => setSearch(event.target.value)}
        sx={{ mb: 3 }}
      />

      <Stack spacing={2}>
        {filteredServicos.map(servico => (
          <Card key={servico.id}>
            <CardContent>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="h6">{servico.nome}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    Categoria: {servico.categoria} | Preço: R$ {servico.preco}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Status: {servico.disponivel ? 'Disponível' : 'Indisponível'}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleOpenDetails(servico)}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton onClick={() => handleOpenEdit(servico)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(servico.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {filteredServicos.length === 0 && (
        <Typography sx={{ mt: 3 }} color="text.secondary">
          Nenhum serviço encontrado.
        </Typography>
      )}

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedServico ? 'Editar serviço' : 'Cadastrar serviço'}
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
              label="Categoria"
              value={formData.categoria}
              onChange={event => handleChange('categoria', event.target.value)}
              fullWidth
            />

            <TextField
              label="Preço"
              type="number"
              value={formData.preco}
              onChange={event =>
                handleChange('preco', Number(event.target.value))
              }
              fullWidth
            />

            <TextField
              label="Descrição"
              value={formData.descricao}
              onChange={event => handleChange('descricao', event.target.value)}
              fullWidth
              multiline
              rows={3}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.disponivel}
                  onChange={event =>
                    handleChange('disponivel', event.target.checked)
                  }
                />
              }
              label="Serviço disponível"
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
        <DialogTitle>Detalhes do serviço</DialogTitle>

        <DialogContent>
          {selectedServico && (
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography>
                <strong>Nome:</strong> {selectedServico.nome}
              </Typography>

              <Typography>
                <strong>Categoria:</strong> {selectedServico.categoria}
              </Typography>

              <Typography>
                <strong>Preço:</strong> R$ {selectedServico.preco}
              </Typography>

              <Typography>
                <strong>Status:</strong>{' '}
                {selectedServico.disponivel ? 'Disponível' : 'Indisponível'}
              </Typography>

              <Typography>
                <strong>Descrição:</strong> {selectedServico.descricao}
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
        message="Tem certeza que deseja excluir este serviço?"
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