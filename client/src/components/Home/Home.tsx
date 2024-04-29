import { Link, Outlet } from 'react-router-dom';
import SubjectMiniature from '../Atoms/Subject_miniature';
import { useState, useEffect } from 'react';
import { getAllSubjects } from '../../services/subject';
import { logout } from '../../services/user';

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

    // function handleOrderChange(event: React.ChangeEvent<HTMLSelectElement>) {
    //     setOrder(event.target.value);
    //     setRender(true);
    // }

    async function handleLogout() {
        await logout().then(() => {
            localStorage.removeItem('token');
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    return (
        <div className="homeContainer">
            <div className={'titleContainer'}>
                <div>Welcome!</div>
            </div>
            <div>This is the home page.</div>
            <Link to={'/login'}>
                <button onClick={handleLogout}>Logout</button>
            </Link>

            <Link to='/users/gabriel'>
                <button>
                    Profile
                </button>
            </Link>

            <div className="home-subjects">
                {subjects.map((subject, index) => (
                    <SubjectMiniature isPurple={index % 2 ? false : true} key={index} subject={subject} render={render} setRender={setRender} />
                ))}
            </div>

            <Outlet />
        </div>
    );
}