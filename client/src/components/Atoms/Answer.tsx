import { useState, useEffect } from 'react';
import './Answer.css';

interface AnswerProps {
    value: string;
}

export default function Answer({ value }: AnswerProps) {
    const [label, setLabel] = useState('');

    useEffect(() => {
        if (value === 'SIM') setLabel('Sim');
        else if (value === 'NAO') setLabel('Não');
        else if (value === 'RUIM') setLabel('Ruim');
        else if (value === 'MEDIA') setLabel('Média');
        else if (value === 'BOA') setLabel('Boa');
        else if (value === 'OTIMA') setLabel('Ótima');
        else if (value === 'FACIL') setLabel('Fácil');
        else if (value === 'MEDIO') setLabel('Médio');
        else if (value === 'DIFICIL') setLabel('Difícil');
        else if (value === 'POUCO') setLabel('Pouco');
        else if (value === 'MUITO') setLabel('Muito');
        console.log(value);
    }, [value]);

    return (
        <div className='label'>
            {label}
        </div>
    );
}