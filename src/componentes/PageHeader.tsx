import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export function PageHeader({
  title,
  description,
  buttonText,
  onButtonClick,
}: PageHeaderProps) {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{
        justifyContent: 'space-between',
        alignItems: {
          xs: 'flex-start',
          sm: 'center',
        },
        gap: 2,
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h4">{title}</Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </Stack>
  );
}