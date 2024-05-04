import "./Header.css";
import simbolologo from '../../assets/simbollogo.svg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logout } from '../../services/user';
import { Link } from 'react-router-dom';

export const Box = () => {
    async function handleLogout() {
        await logout().then(() => {
            localStorage.removeItem('token');
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    return (
        <header className="header" >
            <img className="symbol" src={simbolologo} alt="" />
            <div className="icons">
                <AccountCircleOutlinedIcon className="profileIcon" sx={{ fontSize: 40 }} />
                <Link className="LogoutLink" to={'/login'}>
                    <LogoutOutlinedIcon onClick={handleLogout} sx={{ fontSize: 40, padding: 0 }} />
                </Link>

            </div>

        </header>

    );
};
