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

interface CrudListItem {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  extra?: ReactNode;
}

interface CrudListProps {
  items: CrudListItem[];
  emptyMessage: string;
  onDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function CrudList({
  items,
  emptyMessage,
  onDetails,
  onEdit,
  onDelete,
}: CrudListProps) {
  if (items.length === 0) {
    return (
      <Typography sx={{ mt: 3 }} color="text.secondary">
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Stack spacing={2}>
      {items.map(item => (
        <Card
          key={item.id}
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
                <Typography variant="h6">{item.title}</Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {item.subtitle}
                </Typography>

                {item.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {item.description}
                  </Typography>
                )}

                {item.extra}
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
                <IconButton onClick={() => onDetails(item.id)}>
                  <VisibilityIcon />
                </IconButton>

                <IconButton onClick={() => onEdit(item.id)}>
                  <EditIcon />
                </IconButton>

                <IconButton color="error" onClick={() => onDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}