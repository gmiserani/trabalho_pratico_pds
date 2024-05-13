import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from "./Rating";
import './Subject_miniature.css';

interface SubjectMiniatureProps {
    subject: {
        id: string;
        name: string;
        overall_rating: number;
    };
    isPurple: boolean;
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubjectMiniature({ isPurple, subject, render, setRender }: SubjectMiniatureProps) {
    const [rating, setRating] = useState(subject.overall_rating);
    const color = "subjectMiniature" + (isPurple ? " purple" : "");
    useEffect(() => {
        setRating(subject.overall_rating);
    }, [subject.overall_rating, render, setRender]);


    return (
        <div className={color}>
            <Link to={`/subject/${subject.id}`}>
                <div className="subjectName">
                    {subject.name}
                    <Rating value={rating} size='1.5em' read={true} setValue={null} />
                </div>
            </Link>
        </div>

    );
}