import { Outlet } from 'react-router-dom';
import SubjectMiniature from '../Atoms/Subject_miniature';
import { useState, useEffect } from 'react';
import { getAllSubjects } from '../../services/subject';
import Order from '../Atoms/Order';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Home.css';
import { Header } from '../Header/Header';
import SearchIcon from '@mui/icons-material/Search';


//ToggleButton

export default function Home() {

    const [subjects, setSubjects] = useState([]);
    const [render, setRender] = useState(false);
    const [order, setOrder] = useState('');

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
            <Header />
            <div className="homeContainer">

                <h1 className='pageTittle'>
                    Disciplinas ofertadas
                </h1>

                <div className='optionsTab'>
                    <div className='searchSubject'>
                        <input type="text" placeholder="Search" className='input' />
                        <SearchIcon sx={{ fontSize: 40, color: '#A5599F' }} />
                    </div>
                    <div className='buttons'>
                        <Order order={order} setOrder={setOrder} />

                        <button className='filterButtons'>
                            Professor
                            <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                        </button>

                        <button className='filterButtons'>
                            Periodo
                            <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                        </button>

                        <button className='filterButtons'>
                            Dia e hora
                            <ArrowDropDownIcon sx={{ fontSize: 30 }} />
                        </button>

                        <button className='cleanFilterButton'>
                            Limpar filtros
                        </button>
                    </div>
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