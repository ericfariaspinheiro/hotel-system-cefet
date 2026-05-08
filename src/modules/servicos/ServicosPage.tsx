import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';



import { api } from '../../services/api';
import type { Servico } from '../../types/hotel';
import { ConfirmDialog } from '../../componentes/ConfirmDialog';
import { CrudList } from '../../componentes/CrudList';
import { FeedbackSnackbar } from '../../componentes/FeedbackSnackbar';
import { PageHeader } from '../../componentes/PageHeader';
import { SearchInput } from '../../componentes/SearchInput';

const emptyServico: Omit<Servico, 'id'> = {
  nome: '',
  descricao: '',
  preco: 0,
  disponivel: true,
  categoria: '',
};

export function ServicosPage() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [formData, setFormData] = useState<Omit<Servico, 'id'>>(emptyServico);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [servicoToDelete, setServicoToDelete] = useState<number | null>(null);

  async function loadServicos() {
    const response = await api.get('/servicos');
    setServicos(response.data);
  }

  useEffect(() => {
    loadServicos();
  }, []);

  const filteredServicos = servicos.filter(
    servico =>
      servico.nome.toLowerCase().includes(search.toLowerCase()) ||
      servico.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const servicosList = filteredServicos.map(servico => ({
    id: servico.id,
    title: servico.nome,
    subtitle: `Categoria: ${servico.categoria} | Preço: R$ ${servico.preco}`,
    description: `Status: ${servico.disponivel ? 'Disponível' : 'Indisponível'}`,
  }));

  function showMessage(message: string) {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  }

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

  async function handleSave() {
    if (selectedServico) {
      await api.put(`/servicos/${selectedServico.id}`, formData);
      showMessage('Serviço atualizado com sucesso.');
    } else {
      await api.post('/servicos', formData);
      showMessage('Serviço cadastrado com sucesso.');
    }

    await loadServicos();
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

  async function handleConfirmDelete() {
    if (!servicoToDelete) return;

    await api.delete(`/servicos/${servicoToDelete}`);

    showMessage('Serviço excluído com sucesso.');

    await loadServicos();
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

  return (
    <Box>
      <PageHeader
        title="Serviços"
        description="Gerencie os serviços oferecidos pelo hotel."
        buttonText="Novo serviço"
        onButtonClick={handleOpenCreate}
      />

      <SearchInput
        label="Buscar por nome ou categoria"
        value={search}
        onChange={setSearch}
      />

      <CrudList
        items={servicosList}
        emptyMessage="Nenhum serviço encontrado."
        onDetails={(id: number) => {
          const servico = servicos.find(item => item.id === id);

          if (servico) {
            handleOpenDetails(servico);
          }
        }}
        onEdit={(id: number) => {
          const servico = servicos.find(item => item.id === id);

          if (servico) {
            handleOpenEdit(servico);
          }
        }}
        onDelete={handleOpenDeleteDialog}
      />

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