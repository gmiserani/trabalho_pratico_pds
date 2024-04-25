import { Outlet, useNavigate } from 'react-router-dom';

const Subject = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="subjectContainer">
            <div className={'titleContainer'}>
                <div>Welcome!</div>
            </div>
            <div>This is the Subject page.</div>
            <button onClick={handleLogout}>Logout</button>

            <Outlet />
        </div>
    );
}

export default Subject;