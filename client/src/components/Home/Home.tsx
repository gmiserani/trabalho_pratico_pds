import { Link, Outlet, useNavigate } from 'react-router-dom';
import SubjectMiniature from '../Atoms/Subject_miniature';
import { useState, useEffect } from 'react';
import { getAllSubjects } from '../../services/subject';

export default function Home() {

    const [subjects, setSubjects] = useState([]);
    const [render, setRender] = useState(false);
    const [order, setOrder] = useState('');

    useEffect(() => {
        getAllSubjects(order)
            .then(response => {
                setSubjects(response.data);
                setRender(false);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, [order, render]);

    function handleOrderChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setOrder(event.target.value);
        setRender(true);
    }



    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div className="homeContainer">
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

            <div className="home-subjects">
                {subjects.map((subject, index) => (
                    <SubjectMiniature key={index} subject={subject} render={render} setRender={setRender} />
                ))}
            </div>

            <Outlet />
        </div>
    );
}