import MUIButton from '@mui/material/Button';

interface ButtonProps {
    loading?: boolean;
    onClick?: () => void;
    buttonText: string;
}

const buttonStyle = {
    backgroundColor: '#A36E97',
    color: '#3c043d',
    width: '12em',
    borderRadius: '2em',
    fontWeight: 'bold',
    border: '1px solid #C8C9CF',
    '&:hover': {
        border: 'none',
    },
    '&:focus': {
        outline: 'none',
    },

};

export function Button({ loading, buttonText, onClick }: ButtonProps) {
    return (
        <div className="form-button">
            <MUIButton type='submit' variant="outlined" disabled={loading} onClick={onClick} sx={buttonStyle}>{!loading ? buttonText : 'Loading...'}</MUIButton>
        </div>
    )
}