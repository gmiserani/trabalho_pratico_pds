import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FCDE00'
    },
    '& .MuiRating-iconHover': {
        color: '#FCDE00'
    },
    '& .MuiRating-iconEmpty': {
        color: '#FCDE00'
    },
});