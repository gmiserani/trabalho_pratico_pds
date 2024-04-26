import { Outlet, useNavigate } from 'react-router-dom';
import React from "react";
import "./SubjectPage.css";
import { useState } from "react";
import { Input } from "../../components/Atoms/Input/Input";


const Subject = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className='page'>
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
        </div>
          );
}

export default Subject;