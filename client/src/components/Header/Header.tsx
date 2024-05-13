import "./Header.css";
import simbolologo from '../../assets/simbollogo.svg';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logout } from '../../services/user';
import { Link } from 'react-router-dom';

export default function Header({ logged }: { logged: boolean }) {

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
            {
                logged ?
                    <div className="icons">
                        <AccountCircleOutlinedIcon className="profileIcon" sx={{ fontSize: '2em' }} />
                        <Link className="logoutLink" to={'/login'}>
                            <LogoutOutlinedIcon onClick={handleLogout} sx={{ fontSize: '2em' }} />
                        </Link>
                    </div>
                    :
                    <div>
                    </div>
            }
        </header>

    );
}
