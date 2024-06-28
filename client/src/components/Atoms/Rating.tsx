import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import Star from '@mui/icons-material/Star';
import { Rating as RatingMui } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledRating = styled(RatingMui)({
    '& .MuiRating-iconFilled': {
        color: '#FCDE00',
        width: '100%',
        height: '100%',
    },
    '& .MuiRating-iconHover': {
        color: '#FCDE00',
        width: '100%',
        height: '100%',
    },
    '& .MuiRating-iconEmpty': {
        color: '#FCDE00',
        width: '100%',
        height: '100%',
    },
});

interface RatingProps {
    setValue: ((value: number) => void) | null;
    value: number;
    size: string;
    read: boolean;
}

export default function Rating({ value, size, read, setValue }: RatingProps) {
    return (
        <div>
            {read
                ? <StyledRating value={value} icon={<Star style={{ width: size, height: size }} />} emptyIcon={<StarBorderOutlined style={{ width: size, height: size }} />} readOnly /> :

                <StyledRating value={value} icon={<Star style={{ width: size, height: size }} />} emptyIcon={<StarBorderOutlined style={{ width: size, height: size }} />} onChange={(event, newValue) => { setValue(newValue || 0); }} />
            }

        </div>
    );
}