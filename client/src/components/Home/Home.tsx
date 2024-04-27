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
            <div className="label">
                <div className="disciplinas">
                    <br />
                    Disciplinas ofertadas
                </div>
            </div>
            <div className="box">
                <div className="filter-bar">
                    <div className="search">
                        <div className="overlap-group">
                            <input className="overlap" placeholder="Buscar" type="text" />
                            <img className="image" alt="Image" src='./image-3.png' />
                        </div>
                    </div>
                    <div className="filters">
                        <div className="limpar">
                            <div className="overlap-4">
                            <div className="text-wrapper">Limpar filtros</div>
                            </div>
                        </div>
                        <div className="filtro">
                            <div className="div">
                            <div className="text-wrapper-2">Dia e hora</div>
                            <img className="polygon" alt="Polygon" src="polygon-3.svg" />
                            </div>
                        </div>
                        <div className="overlap-wrapper">
                            <div className="overlap-2">
                            <div className="text-wrapper-2">Período</div>
                            <img className="polygon" alt="Polygon" src="polygon-3-2.svg" />
                            </div>
                        </div>
                        <div className="overlap-group-wrapper">
                            <div className="overlap-3">
                                <div className="text-wrapper-2">Professor</div>
                                <img className="polygon" alt="Polygon" src="polygon-3-3.svg" />
                            </div>
                        </div>
                        <div className="filtro-2">
                            <div className="overlap-4">
                            <div className="text-wrapper-3">Ordem</div>
                            <img className="img" alt="Polygon" src="./polygon-3-4.svg" />
                            </div>
                        </div>
                    </div>
                </div>
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
                    <SubjectMiniature key={index} subject={subject} render={render} setRender={setRender} />
                ))}
            </div>

            <Outlet />
        </div>
    );
}