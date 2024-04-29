import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import './Subject_miniature.css';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FCDE00',
    },
    '& .MuiRating-iconHover': {
        color: '#FCDE00',
    },
    '& .MuiRating-iconEmpty': {
        color: '#FCDE00',
    },
});


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
        <div className="subjectMiniature">
            <Link to={`/subject/${subject.id}`}>
                <div className="subjectName">
                    {subject.name}
                    <StyledRating name="read-only" value={rating} size="large" emptyIcon={<StarBorderOutlined />} readOnly />
                </div>

            </Link>
        </div>

    );
}