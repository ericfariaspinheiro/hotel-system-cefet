import { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { PageHeader } from '../../componentes/PageHeader';
import { ConfirmDialog } from '../../componentes/ConfirmDialog';
import { FeedbackSnackbar } from '../../componentes/FeedbackSnackbar';
import { hospedesMock } from '../../data/mockData';
import type { Hospede } from '../../types/hotel';
import { CrudList } from '../../componentes/CrudList';

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
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [hospedeToDelete, setHospedeToDelete] = useState<number | null>(null);

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

            showMessage('Hóspede atualizado com sucesso.');
        } else {
            const newHospede: Hospede = {
                id: Date.now(),
                ...formData,
            };

            setHospedes(currentHospedes => [...currentHospedes, newHospede]);

            showMessage('Hóspede cadastrado com sucesso.');
        }

        handleCloseForm();
    }

    function handleOpenDeleteDialog(id: number) {
        setHospedeToDelete(id);
        setOpenDeleteDialog(true);
    }

    function handleCloseDeleteDialog() {
        setHospedeToDelete(null);
        setOpenDeleteDialog(false);
    }

    function handleConfirmDelete() {
        if (!hospedeToDelete) return;

        setHospedes(currentHospedes =>
            currentHospedes.filter(hospede => hospede.id !== hospedeToDelete)
        );

        showMessage('Hóspede excluído com sucesso.');
        handleCloseDeleteDialog();
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

    function showMessage(message: string) {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    }

    const hospedesList = filteredHospedes.map(hospede => ({
        id: hospede.id,
        title: hospede.nome,
        subtitle: `CPF: ${hospede.cpf}`,
        description: `${hospede.email} | ${hospede.telefone}`,
    }));

    return (
        <Box>
            <PageHeader
                title="Hóspedes"
                description="Gerencie os hóspedes cadastrados no hotel."
                buttonText="Novo hóspede"
                onButtonClick={handleOpenCreate}
            />

            <TextField
                fullWidth
                label="Buscar por nome ou CPF"
                value={search}
                onChange={event => setSearch(event.target.value)}
                sx={{ mb: 3 }}
            />

            <CrudList
                items={hospedesList}
                emptyMessage="Nenhum hóspede encontrado."
                onDetails={(id: number) => {
                    const hospede = hospedes.find(item => item.id === id);

                    if (hospede) {
                        handleOpenDetails(hospede);
                    }
                }}
                onEdit={(id: number) => {
                    const hospede = hospedes.find(item => item.id === id);

                    if (hospede) {
                        handleOpenEdit(hospede);
                    }
                }}
                onDelete={handleOpenDeleteDialog}
            />

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
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}
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

            <ConfirmDialog
                open={openDeleteDialog}
                title="Confirmar exclusão"
                message="Tem certeza que deseja excluir este hóspede?"
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