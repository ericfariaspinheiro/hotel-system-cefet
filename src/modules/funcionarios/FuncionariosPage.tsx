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
import { PageHeader } from '../../componentes/PageHeader';
import { ConfirmDialog } from '../../componentes/ConfirmDialog';
import { FeedbackSnackbar } from '../../componentes/FeedbackSnackbar';
import { funcionariosMock } from '../../data/mockData';
import type { Funcionario, TurnoFuncionario } from '../../types/hotel';

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
  const [funcionarios, setFuncionarios] =
    useState<Funcionario[]>(funcionariosMock);

  const [search, setSearch] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedFuncionario, setSelectedFuncionario] =
    useState<Funcionario | null>(null);

  const [formData, setFormData] =
    useState<Omit<Funcionario, 'id'>>(emptyFuncionario);

  const filteredFuncionarios = funcionarios.filter(
    funcionario =>
      funcionario.nome.toLowerCase().includes(search.toLowerCase()) ||
      funcionario.cargo.toLowerCase().includes(search.toLowerCase()) ||
      funcionario.cpf.includes(search)
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [funcionarioToDelete, setFuncionarioToDelete] = useState<number | null>(null);

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

  function handleSave() {
    if (selectedFuncionario) {
      setFuncionarios(currentFuncionarios =>
        currentFuncionarios.map(funcionario =>
          funcionario.id === selectedFuncionario.id
            ? { ...funcionario, ...formData }
            : funcionario
        )
      );
    } else {
      const newFuncionario: Funcionario = {
        id: Date.now(),
        ...formData,
      };

      setFuncionarios(currentFuncionarios => [
        ...currentFuncionarios,
        newFuncionario,
      ]);
    }

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

  function handleConfirmDelete() {
    if (!funcionarioToDelete) return;

    setFuncionarios(currentFuncionarios =>
      currentFuncionarios.filter(
        funcionario => funcionario.id !== funcionarioToDelete
      )
    );

    showMessage('Funcionário excluído com sucesso.');
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

  function showMessage(message: string) {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  }

  return (
    <Box>
      <PageHeader
        title="Funcionários"
        description="Gerencie os funcionários do hotel."
        buttonText="Novo funcionário"
        onButtonClick={handleOpenCreate}
      />

      <TextField
        fullWidth
        label="Buscar por nome, CPF ou cargo"
        value={search}
        onChange={event => setSearch(event.target.value)}
        sx={{ mb: 3 }}
      />

      <Stack spacing={2}>
        {filteredFuncionarios.map(funcionario => (
          <Card key={funcionario.id}>
            <CardContent>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box>
                  <Typography variant="h6">{funcionario.nome}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    Cargo: {funcionario.cargo} | Turno: {funcionario.turno}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {funcionario.email} | {funcionario.telefone}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <IconButton onClick={() => handleOpenDetails(funcionario)}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton onClick={() => handleOpenEdit(funcionario)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleOpenDeleteDialog(funcionario.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {filteredFuncionarios.length === 0 && (
        <Typography sx={{ mt: 3 }} color="text.secondary">
          Nenhum funcionário encontrado.
        </Typography>
      )}

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
                  handleChange(
                    'turno',
                    event.target.value as TurnoFuncionario
                  )
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