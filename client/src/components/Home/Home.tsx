import { Link, Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome!</div>
            </div>
            <div>This is the home page.</div>
            <button onClick={handleLogout}>Logout</button>
            <Link to='/users/gabriel'>
                <button>
                    Profile
                </button>
            </Link>

            <Outlet />
        </div>
    );
}

export default Home;