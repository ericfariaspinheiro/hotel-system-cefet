import { ReactNode } from 'react';

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
      <Card>
        <CardContent>
          <Typography color="text.secondary">{emptyMessage}</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stack spacing={2}>
      {items.map(item => (
        <Card key={item.id}>
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

                <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                  {item.subtitle}
                </Typography>

                {item.description && (
                  <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                    {item.description}
                  </Typography>
                )}

                {item.extra}
              </Box>

              <Stack direction="row" spacing={1}>
                <IconButton
                  onClick={() => onDetails(item.id)}
                  sx={{
                    color: '#60A5FA',
                    backgroundColor: '#13243A',
                  }}
                >
                  <VisibilityIcon />
                </IconButton>

                <IconButton
                  onClick={() => onEdit(item.id)}
                  sx={{
                    color: '#FACC15',
                    backgroundColor: '#332B13',
                  }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => onDelete(item.id)}
                  sx={{
                    color: '#F87171',
                    backgroundColor: '#351A1A',
                  }}
                >
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