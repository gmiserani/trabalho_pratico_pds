import { Link, Outlet } from 'react-router-dom';
import SubjectMiniature from '../Atoms/Subject_miniature';
import { useState, useEffect } from 'react';
import { getAllSubjects } from '../../services/subject';
import { logout } from '../../services/user';
import Order from '../Atoms/Order';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Home.css';
import { Box } from '../Header/Header';


//ToggleButton

export default function Home() {

    const [subjects, setSubjects] = useState([]);
    const [render, setRender] = useState(false);
    const [order, setOrder] = useState('');

    async function handleLogout() {
        await logout().then(() => {
            localStorage.removeItem('token');
        }).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    useEffect(() => {
        getAllSubjects(order)
            .then(response => {
                console.log(order);
                setSubjects(response.data);
                setRender(false);
            })
            .catch(error => {
                console.error('Error fetching subjects:', error);
            });
    }, [order, render]);

    return (
        <div>
            <Box />
            <div className="homeContainer">
                <div className='filterTab'>
                    <Order order={order} setOrder={setOrder} />

                    <button className='filterButton'>
                        Professor
                        <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                    </button>

                    <button className='filterButton'>
                        Periodo
                        <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                    </button>

                    <button className='filterButton'>
                        Dia e hora
                        <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                    </button>

                    <button className='cleanFilterButton'>Limpar filtros</button>


                </div>

                <div className="home-subjects">
                    {subjects.map((subject, index) => (
                        <SubjectMiniature isPurple={index % 2 ? false : true} key={index} subject={subject} render={render} setRender={setRender} />
                    ))}
                </div>

                <Outlet />
            </div >
        </div>
    );
}