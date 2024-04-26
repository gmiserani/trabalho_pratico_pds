import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSubjectById, getMostCommonAnswers, checkUserCanAddReview, getReviews } from "../../services/subject";
import { useParams } from "react-router-dom";

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
        id: string;
        name: string;
    };
}

export default function Subject() {

    const navigate = useNavigate();

    const [subjectSummary, setSubjectSummary] = useState<SubjectProps | null>(null);
    const [renderSummary, setRenderSummary] = useState(false);

    const [mostCommonAnswers, setMostCommonAnswers] = useState<MostCommonAnswer | null>(null);
    const [renderMostCommonAnswers, setRenderMostCommonAnswers] = useState(false);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [renderReviews, setRenderReviews] = useState(false);

    // const [canAddReview, setCanAddReview] = useState(false);
    // const [renderCanAddReview, setRenderCanAddReview] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        const getSubjectData = async () => {
            try {
                const response = await getSubjectById(id);
                setSubjectSummary(response.data);
                setRenderSummary(false);
            } catch (error) {
                console.error('Error fetching subject:', error);
            }
        };
        getSubjectData();
    }, [id, renderSummary]);

    useEffect(() => {
        if (!subjectSummary || !id) return;
        const setMostCommonAnswersData = async () => {
            try {
                const response = await getMostCommonAnswers(id);
                setMostCommonAnswers(response.data);
                setRenderMostCommonAnswers(false);
            } catch (error) {
                console.error('Error fetching most common answers:', error);
            }
        };
        setMostCommonAnswersData();
    }, [id, renderMostCommonAnswers, subjectSummary]);

    useEffect(() => {
        if (!id) return;
        const getReviewsData = async () => {
            try {
                const response = await getReviews(id);
                setReviews(response.data);
                setRenderReviews(false);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        getReviewsData();
    }, [id, renderReviews]);

    async function clickAddReview() {
        if (!id) return;
        const canAddReview = await checkUserCanAddReview(id);
        if (canAddReview) {
            // navigate to review page
            navigate(`/subject/${id}/add-review`);
        }
    }

    return (
        <div className="Subject">
            <h1>{subjectSummary?.name}</h1>
            <div>{subjectSummary?.syllabus}</div>
            <div>{subjectSummary?.mode}</div>
            <div>{subjectSummary?.date}</div>
            <div>{subjectSummary?.time}</div>
            <div>{subjectSummary?.semester}</div>
            <div>{subjectSummary?.workload}</div>
            <div>{subjectSummary?.teacher.name}</div>
            <div>{mostCommonAnswers?.presence_rating}</div>
            <div>{mostCommonAnswers?.teacher_rating}</div>
            <div>{mostCommonAnswers?.project_rating}</div>
            <div>{mostCommonAnswers?.test_rating}</div>
            <div>{mostCommonAnswers?.effort_rating}</div>
            <div>{mostCommonAnswers?.overall_rating}</div>
            <button onClick={clickAddReview}>Add Review</button>
            <div>
                {reviews.map((review, index) => (
                    <div key={index}>
                        <div>{review.user.name}</div>
                        <div>{review.presence_rating}</div>
                        <div>{review.teacher_rating}</div>
                        <div>{review.project_rating}</div>
                        <div>{review.test_rating}</div>
                        <div>{review.effort_rating}</div>
                        <div>{review.overall_rating}</div>
                        <div>{review.comment}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

