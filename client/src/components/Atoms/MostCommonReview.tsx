import { useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import Star from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import './MostCommonReview.css';
import Answer from './Answer';

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


interface mostCommonReviewProps {
    review: {
        teacher_rating: string;
        presence_rating: string;
        project_rating: string;
        test_rating: string;
        effort_rating: string;
        overall_rating: number;
    };
    render: boolean;
    setRender: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MostCommonReview({ review, render, setRender }: mostCommonReviewProps) {
    const [rating, setRating] = useState(review.overall_rating);

    useEffect(() => {
        setRating(review.overall_rating);
    }, [review.overall_rating, render, setRender]);

    return (
        <div className='mostCommonReview'>
            <div className='col1'>
                <div className="rating">
                    Cobra presença
                    <Answer value={review.presence_rating} />
                </div>
                <div className="rating">
                    Como é a didatica do professor
                    <Answer value={review.teacher_rating} />
                </div>
                <div className="rating">
                    Como sao os trabalhos
                    <Answer value={review.project_rating} />
                </div>
            </div>
            <div className='col1'>
                <div className="rating">
                    Como sao as provas
                    <Answer value={review.test_rating} />
                </div>
                <div className="rating">
                    Quanto tempo de dedicação
                    <Answer value={review.effort_rating} />
                </div>
                <div className="rating">
                    Nota geral
                    <StyledRating name="read-only" value={rating} icon={<Star style={{ width: "1.5em", height: "1.5em" }} />} emptyIcon={<StarBorderOutlined style={{ width: "1.5em", height: "1.5em" }} />} readOnly />
                </div>
            </div>
        </div >
    );
}