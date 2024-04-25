import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface SubjectMiniatureProps {
    subject: {
        id: string;
        name: string;
        overall_rating: number;
    };
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubjectMiniature({ subject, render, setRender }: SubjectMiniatureProps) {
    const [rating, setRating] = useState(subject.overall_rating);

    useEffect(() => {
        setRating(subject.overall_rating);
    }, [subject.overall_rating, render, setRender]);

    return (
        <Link to={`/subject/${subject.id}`} className="subjectMiniature">
            <div className="subjectName">{subject.name}</div>
            <div className="subjectRating">{rating}</div>
        </Link>
    );
}