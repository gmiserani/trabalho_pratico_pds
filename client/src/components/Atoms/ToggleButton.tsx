import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtons() {
    const [alignment, setAlignment] = React.useState<string | null>('left');

    const handleReviewResponse = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };

    return (
        <ToggleButtonGroup value={alignment} exclusive onChange={handleReviewResponse} aria-label="reviewResponse">
            <ToggleButton value="left" aria-label="left aligned">
                Facil
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
                Medio
            </ToggleButton>
            <ToggleButton value="right" aria-label="right aligned">
                Dificil
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
