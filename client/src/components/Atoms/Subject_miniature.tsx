import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import './Subject_miniature.css';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import Star from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#FCDE00',
        width: "40",
        height: "40"
    },
    '& .MuiRating-iconHover': {
        color: '#FCDE00',
        width: "40",
        height: "40"
    },
    '& .MuiRating-iconEmpty': {
        color: '#FCDE00',
        width: "40",
        height: "40"
    },
});


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
                    <StyledRating name="read-only" value={rating} icon={<Star style={{ width: "40", height: "40" }} />} emptyIcon={<StarBorderOutlined style={{ width: "40", height: "40" }} />} readOnly />
                </div>

            </Link>
        </div>

    );
}