import * as React from 'react';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Menu, { MenuProps } from '@mui/material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Button as BaseButton } from '@mui/base/Button';
import { styled } from '@mui/material/styles';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';



const OrderButton = styled(BaseButton)(
    () => `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 0;
    padding-left: 1em;
    padding-right: 0.5em;

    font-family: "Montserrat-Bold", Helvetica;
    font-weight: bold;
    background-color: #D2ACCF;
    border-radius: 25em;
    color: #3c043e;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    box-shadow: 0px 4px 4px #00000040;
    `,
);

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
))(() => ({
    '& .MuiPaper-root': {
        margin: '1em 0',
        borderRadius: 25,
        boxShadow: '6px 6px 6px #00000040',
    },
}));

interface OrderProps {
    order: string;
    setOrder: React.Dispatch<React.SetStateAction<string>>;
}

export default function Order({ order, setOrder }: OrderProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleOrderChange(event: React.ChangeEvent<HTMLInputElement>) {
        setOrder(event.target.value);
    }

    return (
        <div className='filterTab'>
            <OrderButton
                className="orderButton"
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                sx={open ?
                    { color: 'white', backgroundColor: '#3c043e' } : { color: '#3c043e', backgroundColor: '#D2ACCF' }
                }
            >
                <div style={{ marginRight: '1em' }}>
                    Ordem
                </div>

                {open ? <ArrowDropUpIcon sx={{ fontSize: 30 }} /> : <ArrowDropDownIcon sx={{ fontSize: 30 }} />}
            </OrderButton>
            <StyledMenu id="demo-customized-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                <RadioGroup name="people" defaultValue="" value={order} onChange={handleOrderChange}>

                    <List sx={{ minWidth: 240 }}>
                        <ListItem key={"Inicial"}>
                            <Radio
                                value={""}
                                label={"Inicial"}
                                sx={{
                                    flexGrow: 1, flexDirection: 'row-reverse', borderBottom: "none", color: '#3c043e'
                                }}
                                slotProps={{
                                    action: ({ checked }) => ({
                                        sx: () => ({
                                            border: 'none',
                                            ...(checked && {
                                                inset: -1,
                                            }),
                                        }),
                                    }),
                                }}
                                uncheckedIcon={<RadioButtonUncheckedIcon sx={{ color: '#3c043e' }} />}
                                checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#3c043e' }} />}

                            />
                        </ListItem>

                        <ListItem key={"MaiorAvaliacao"}>
                            <Radio
                                value={"desc"}
                                label={"Maior Avaliação"}
                                sx={{ flexGrow: 1, flexDirection: 'row-reverse', color: '#3c043e' }}
                                slotProps={{
                                    action: ({ checked }) => ({
                                        sx: () => ({
                                            border: 'none',
                                            ...(checked && {
                                                inset: -1,

                                            }),
                                        }),
                                    }),
                                }}
                                uncheckedIcon={<RadioButtonUncheckedIcon sx={{ color: '#3c043e' }} />}
                                checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#3c043e' }} />}
                            />
                        </ListItem>

                        <ListItem key={"MenorAvaliacao"}>
                            <Radio
                                value={"asc"}
                                label={"Menor Avaliação"}
                                sx={{ flexGrow: 1, flexDirection: 'row-reverse', color: '#3c043e' }}
                                slotProps={{
                                    action: ({ checked }) => ({
                                        sx: () => ({
                                            ...(checked && {
                                                inset: -1,

                                            }),
                                        }),
                                    }),
                                }}
                                uncheckedIcon={<RadioButtonUncheckedIcon sx={{ color: '#3c043e' }} />}
                                checkedIcon={<RadioButtonCheckedIcon sx={{ color: '#3c043e' }} />}
                            />
                        </ListItem>
                    </List>
                </RadioGroup>
            </StyledMenu>
        </div>
    );
} ""
