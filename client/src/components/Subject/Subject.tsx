import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSubjectById, getMostCommonAnswers, checkUserCanAddReview, getReviews } from "../../services/subject";
import { useParams } from "react-router-dom";
import { Header } from '../Header/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Subject.css';
import { Rating } from '@mui/material';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';
import Star from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import MostCommonReview from "../Atoms/MostCommonReview";
import ReviewContainer from "../Atoms/ReviewContainer";

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

interface SubjectProps {
    id: string;
    name: string;
    syllabus: string;
    mode: string;
    date: string;
    time: string;
    semester: number;
    workload: number;
    teacher: {
        id: string;
        name: string;
    };
}

interface MostCommonAnswer {
    presence_rating: string;
    teacher_rating: string;
    project_rating: string;
    test_rating: string;
    effort_rating: string;
    overall_rating: number;
}

interface Review {
    id: string;
    presence_rating: string;
    teacher_rating: string;
    project_rating: string;
    test_rating: string;
    effort_rating: string;
    overall_rating: number;
    comment: string;
    user: {
        username: string;
    };
}

export default function Subject() {

    const navigate = useNavigate();


    const [subjectSummary, setSubjectSummary] = useState<SubjectProps | null>(null);

    const [mostCommonAnswers, setMostCommonAnswers] = useState<MostCommonAnswer | null>(null);

    const [reviews, setReviews] = useState<Review[]>([]);

    const [canAddReview, setCanAddReview] = useState(true);

    const [render, setRender] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        const getSubjectData = async () => {
            try {
                const response = await getSubjectById(id);
                setSubjectSummary(response.data);
                setRender(false);
            } catch (error) {
                console.error('Error fetching subject:', error);
            }
        };
        getSubjectData();
    }, [id, render]);

    useEffect(() => {
        if (!id) return;
        const setMostCommonAnswersData = async () => {
            try {
                const response = await getMostCommonAnswers(id);
                setMostCommonAnswers(response.data);
                setRender(false);
            } catch (error) {
                console.error('Error fetching most common answers:', error);
            }
        };
        setMostCommonAnswersData();
    }, [id, render]);

    useEffect(() => {
        if (!id) return;
        const getReviewsData = async () => {
            try {
                const response = await getReviews(id);
                setReviews(response.data);
                setRender(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        getReviewsData();
    }, [id, render]);

    useEffect(() => {
        if (!id) return;
        const checkUserCanAddReviewData = async () => {
            try {
                const response = await checkUserCanAddReview(id);
                setCanAddReview(response.data);
                setRender(false);
            } catch (error) {
                console.error('Error checking if user can add review:', error);
            }
        };
        checkUserCanAddReviewData();
    }, [id, render]);

    return (
        <div>
            <Header />

            <div className="subjectPageContainer">
                <div className="backButton">
                    <ArrowBackIcon onClick={() => navigate('/')} />
                </div>
                <div className="title">
                    <h1>{subjectSummary?.name}</h1>
                    <StyledRating name="read-only" value={mostCommonAnswers?.overall_rating || 0} icon={<Star style={{ width: "2em", height: "2em" }} />} emptyIcon={<StarBorderOutlined style={{ width: "2em", height: "2em" }} />} readOnly />
                </div>
                <div className="subjectInfo">
                    <div className="syllabus">
                        {subjectSummary?.syllabus}
                        <div>{subjectSummary?.mode}</div>
                        <div>{subjectSummary?.date}</div>
                        <div>{subjectSummary?.time}</div>
                        <div>{subjectSummary?.semester}</div>
                        <div>{subjectSummary?.workload}</div>
                    </div>

                    <div className="teacher">
                        {subjectSummary?.teacher.name}
                    </div>
                </div>
                <div className="answers">
                    {reviews.length > 0 ?
                        <MostCommonReview
                            review={mostCommonAnswers}
                            render={render}
                            setRender={setRender}
                        />

                        : <div className="noReviewCase">
                            Essa disciplina ainda não possui avaliações
                        </div>
                    }
                </div>
                {canAddReview ? <button onClick={() => { navigate(`/subject/${id}/add-review`) }}>Adicionar sua avaliacao</button> : null}
                <div className="users_reviews">
                    {reviews.map((review, index) => (
                        <ReviewContainer
                            review={review}
                            render={render}
                            setRender={setRender}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

