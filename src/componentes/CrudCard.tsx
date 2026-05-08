import type { ReactNode } from 'react';

import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface CrudCardProps {
  title: string;
  subtitle: string;
  description?: string;
  children?: ReactNode;
  onDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CrudCard({
  title,
  subtitle,
  description,
  children,
  onDetails,
  onEdit,
  onDelete,
}: CrudCardProps) {
  return (
    <Card
      sx={{
        transition: '0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 14px 34px rgba(15, 23, 42, 0.09)',
        },
      }}
    >
      <CardContent>
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
          }}
        >
          <Box>
            <Typography variant="h6">{title}</Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>

            {description && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {description}
              </Typography>
            )}

            {children}
          </Box>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignSelf: {
                xs: 'flex-end',
                sm: 'center',
              },
            }}
          >
            <IconButton onClick={onDetails}>
              <VisibilityIcon />
            </IconButton>

            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>

            <IconButton color="error" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}