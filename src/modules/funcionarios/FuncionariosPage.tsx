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
import type { Funcionario, TurnoFuncionario } from '../../types/hotel';
import { ConfirmDialog } from '../../componentes/ConfirmDialog';
import { CrudList } from '../../componentes/CrudList';
import { FeedbackSnackbar } from '../../componentes/FeedbackSnackbar';
import { PageHeader } from '../../componentes/PageHeader';
import { SearchInput } from '../../componentes/SearchInput';

const emptyFuncionario: Omit<Funcionario, 'id'> = {
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
  cargo: '',
  salario: 0,
  turno: 'Manhã',
};

export function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] =
    useState<Funcionario | null>(null);

  const [formData, setFormData] =
    useState<Omit<Funcionario, 'id'>>(emptyFuncionario);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [funcionarioToDelete, setFuncionarioToDelete] = useState<number | null>(
    null
  );

  async function loadFuncionarios() {
    const response = await api.get('/funcionarios');
    setFuncionarios(response.data);
  }

  useEffect(() => {
    loadFuncionarios();
  }, []);

  const filteredFuncionarios = funcionarios.filter(
    funcionario =>
      funcionario.nome.toLowerCase().includes(search.toLowerCase()) ||
      funcionario.cargo.toLowerCase().includes(search.toLowerCase()) ||
      funcionario.cpf.includes(search)
  );

  const funcionariosList = filteredFuncionarios.map(funcionario => ({
    id: funcionario.id,
    title: funcionario.nome,
    subtitle: `Cargo: ${funcionario.cargo} | Turno: ${funcionario.turno}`,
    description: `${funcionario.email} | ${funcionario.telefone}`,
  }));

  function showMessage(message: string) {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  }

  function handleOpenCreate() {
    setSelectedFuncionario(null);
    setFormData(emptyFuncionario);
    setOpenForm(true);
  }

  function handleOpenEdit(funcionario: Funcionario) {
    setSelectedFuncionario(funcionario);
    setFormData({
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      email: funcionario.email,
      telefone: funcionario.telefone,
      cargo: funcionario.cargo,
      salario: funcionario.salario,
      turno: funcionario.turno,
    });
    setOpenForm(true);
  }

  function handleCloseForm() {
    setOpenForm(false);
    setSelectedFuncionario(null);
    setFormData(emptyFuncionario);
  }

  async function handleSave() {
    if (selectedFuncionario) {
      await api.put(`/funcionarios/${selectedFuncionario.id}`, formData);
      showMessage('Funcionário atualizado com sucesso.');
    } else {
      await api.post('/funcionarios', formData);
      showMessage('Funcionário cadastrado com sucesso.');
    }

    await loadFuncionarios();
    handleCloseForm();
  }

  function handleOpenDeleteDialog(id: number) {
    setFuncionarioToDelete(id);
    setOpenDeleteDialog(true);
  }

  function handleCloseDeleteDialog() {
    setFuncionarioToDelete(null);
    setOpenDeleteDialog(false);
  }

  async function handleConfirmDelete() {
    if (!funcionarioToDelete) return;

    await api.delete(`/funcionarios/${funcionarioToDelete}`);

    showMessage('Funcionário excluído com sucesso.');

    await loadFuncionarios();
    handleCloseDeleteDialog();
  }

  function handleOpenDetails(funcionario: Funcionario) {
    setSelectedFuncionario(funcionario);
    setOpenDetails(true);
  }

  function handleCloseDetails() {
    setOpenDetails(false);
    setSelectedFuncionario(null);
  }

  function handleChange(
    field: keyof Omit<Funcionario, 'id'>,
    value: string | number | TurnoFuncionario
  ) {
    setFormData(currentData => ({
      ...currentData,
      [field]: value,
    }));
  }

  return (
    <Box>
      <PageHeader
        title="Funcionários"
        description="Gerencie os funcionários do hotel."
        buttonText="Novo funcionário"
        onButtonClick={handleOpenCreate}
      />

      <SearchInput
        label="Buscar por nome, CPF ou cargo"
        value={search}
        onChange={setSearch}
      />

      <CrudList
        items={funcionariosList}
        emptyMessage="Nenhum funcionário encontrado."
        onDetails={(id: number) => {
          const funcionario = funcionarios.find(item => item.id === id);

          if (funcionario) {
            handleOpenDetails(funcionario);
          }
        }}
        onEdit={(id: number) => {
          const funcionario = funcionarios.find(item => item.id === id);

          if (funcionario) {
            handleOpenEdit(funcionario);
          }
        }}
        onDelete={handleOpenDeleteDialog}
      />

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedFuncionario ? 'Editar funcionário' : 'Cadastrar funcionário'}
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
              label="Cargo"
              value={formData.cargo}
              onChange={event => handleChange('cargo', event.target.value)}
              fullWidth
            />

            <TextField
              label="Salário"
              type="number"
              value={formData.salario}
              onChange={event =>
                handleChange('salario', Number(event.target.value))
              }
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Turno</InputLabel>

              <Select
                label="Turno"
                value={formData.turno}
                onChange={event =>
                  handleChange('turno', event.target.value as TurnoFuncionario)
                }
              >
                <MenuItem value="Manhã">Manhã</MenuItem>
                <MenuItem value="Tarde">Tarde</MenuItem>
                <MenuItem value="Noite">Noite</MenuItem>
              </Select>
            </FormControl>
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
        <DialogTitle>Detalhes do funcionário</DialogTitle>

        <DialogContent>
          {selectedFuncionario && (
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Typography>
                <strong>Nome:</strong> {selectedFuncionario.nome}
              </Typography>

              <Typography>
                <strong>CPF:</strong> {selectedFuncionario.cpf}
              </Typography>

              <Typography>
                <strong>E-mail:</strong> {selectedFuncionario.email}
              </Typography>

              <Typography>
                <strong>Telefone:</strong> {selectedFuncionario.telefone}
              </Typography>

              <Typography>
                <strong>Cargo:</strong> {selectedFuncionario.cargo}
              </Typography>

              <Typography>
                <strong>Salário:</strong> R$ {selectedFuncionario.salario}
              </Typography>

              <Typography>
                <strong>Turno:</strong> {selectedFuncionario.turno}
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
        message="Tem certeza que deseja excluir este funcionário?"
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