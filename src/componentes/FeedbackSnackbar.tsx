import { Alert, Snackbar } from '@mui/material';

interface FeedbackSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function FeedbackSnackbar({
  open,
  message,
  onClose,
}: FeedbackSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity="success" variant="filled" onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}