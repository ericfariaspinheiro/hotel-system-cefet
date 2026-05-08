import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

export function SearchInput({ label, value, onChange }: SearchInputProps) {
    return (
        <TextField
            fullWidth
            label={label}
            value={value}
            onChange={event => onChange(event.target.value)}
            sx={{ mb: 3 }}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                },
            }}
        />

    );
}