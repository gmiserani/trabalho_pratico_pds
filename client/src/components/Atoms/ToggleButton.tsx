import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, { toggleButtonGroupClasses, } from '@mui/material/ToggleButtonGroup';
import { styled } from "@mui/material/styles";

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        marginLeft: 1,
        border: 0,
        borderRadius: 25,
        backgroundColor: '#E9D5E7',
        color: '#3c043e',
        width: 100,
        [`&.${toggleButtonGroupClasses}`]: {
            border: 0,
        },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
    },
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: '#3c043e'
    }

}));

export const StyledToggleButton = styled(ToggleButton)(() => ({
    [`&.${toggleButtonClasses.root}`]:
    {
        padding: '0.2em',
        textTransform: 'none',
        fontWeight: 'bold',
        width: '100%',

    },
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: '#3c043e',
        width: '100%',
    }
}));