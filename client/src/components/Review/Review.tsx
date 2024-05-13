import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { addReview } from "../../services/subject";
import Header from '../Header/Header';
import Rating from '../../components/Atoms/Rating';
import Comment from "../../components/Atoms/Comment";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledToggleButton, StyledToggleButtonGroup } from '../../components/Atoms/ToggleButton';
import './Review.css';


export default function Review() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [presence_rating, setPresenceRating] = useState('');
    const [teacher_rating, setTeacherRating] = useState('');
    const [project_rating, setProjectRating] = useState('');
    const [test_rating, setTestRating] = useState('');
    const [effort_rating, setEffortRating] = useState('');
    const [overall_rating, setOverallRating] = useState(0);
    const [comment, setComment] = useState('');

    const { id } = useParams();

    const handleProjectResponse = (event: React.MouseEvent<HTMLElement>, value: string) => {
        setProjectRating(value);
    };

    const handleTestResponse = (event: React.MouseEvent<HTMLElement>, value: string) => {
        setTestRating(value);
    };

    const handleEffortResponse = (event: React.MouseEvent<HTMLElement>, value: string) => {
        setEffortRating(value);
    };

    const handleTeacherResponse = (event: React.MouseEvent<HTMLElement>, value: string) => {
        setTeacherRating(value);
    };

    async function handlePresenceResponse(event: React.MouseEvent<HTMLElement>, value: string) {
        setPresenceRating(value);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!id) {
            setLoading(false);
            return;
        }

        await addReview(id, presence_rating, teacher_rating, project_rating, test_rating, effort_rating, overall_rating, comment).then(() => {
            console.log('Review added');
            navigate(`/subject/${id}`);
            // Go back to the subject page
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            throw err;
        });
    }

    return (
        <div className="reviewPageContainer">
            <Header logged={true} />

            <div className="reviewPage">

                <div className="backButton-review">
                    <ArrowBackIcon onClick={() => navigate(`/subject/${id}`)} sx={{ color: 'white' }} />
                </div>

                <form onSubmit={handleSubmit} className="reviewForm">

                    <div className="reviewField">

                        <div className="question">
                            Cobra presenca?
                        </div>
                        <StyledToggleButtonGroup className="reviewResponseButtons" value={presence_rating} exclusive onChange={handlePresenceResponse} aria-label="reviewResponses" >
                            <StyledToggleButton className="singleReviewResponseButtons" value="SIM" sx={{ marginRight: '4%' }}>
                                Sim
                            </StyledToggleButton>
                            <StyledToggleButton value="NAO" sx={{ marginRight: '4%' }}>
                                Nao
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">

                        <div className="question">
                            Como e a didatica do professor?
                        </div>
                        <StyledToggleButtonGroup className="reviewResponseButtons" value={teacher_rating} exclusive onChange={handleTeacherResponse} aria-label="reviewResponse">
                            <StyledToggleButton value="RUIM" sx={{ marginRight: '4%' }}>
                                Ruim
                            </StyledToggleButton>
                            <StyledToggleButton value="MEDIA" sx={{ marginRight: '4%' }}>
                                Media
                            </StyledToggleButton>
                            <StyledToggleButton value="BOA" sx={{ marginRight: '4%' }}>
                                Boa
                            </StyledToggleButton>
                            <StyledToggleButton value="OTIMA" sx={{ marginRight: '4%' }}>
                                Otima
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">

                        <div className="question">
                            Como sao os trabalhos?
                        </div>
                        <StyledToggleButtonGroup className="reviewResponseButtons" value={project_rating} exclusive onChange={handleProjectResponse} aria-label="reviewResponse">
                            <StyledToggleButton value="FACIL" sx={{ marginRight: '4%' }}>
                                Facil
                            </StyledToggleButton>
                            <StyledToggleButton value="MEDIO" sx={{ marginRight: '4%' }}>
                                Medio
                            </StyledToggleButton>
                            <StyledToggleButton value="DIFICIL" sx={{ marginRight: '4%' }}>
                                Dificil
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">

                        <div className="question">
                            Como sao as provas?
                        </div>
                        <StyledToggleButtonGroup className="reviewResponseButtons" value={test_rating} exclusive onChange={handleTestResponse} aria-label="reviewResponse">
                            <StyledToggleButton value="FACIL" sx={{ marginRight: '4%' }}>
                                Facil
                            </StyledToggleButton>
                            <StyledToggleButton value="MEDIO" sx={{ marginRight: '4%' }}>
                                Medio
                            </StyledToggleButton>
                            <StyledToggleButton value="DIFICIL" sx={{ marginRight: '4%' }}>
                                Dificil
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">

                        <div className="question">
                            Quanto tempo de dedicacao?
                        </div>
                        <StyledToggleButtonGroup className="reviewResponseButtons" value={effort_rating} exclusive onChange={handleEffortResponse} aria-label="reviewResponse">
                            <StyledToggleButton value="POUCO" sx={{ marginRight: '4%' }}>
                                Pouco
                            </StyledToggleButton>
                            <StyledToggleButton value="MEDIO" sx={{ marginRight: '4%' }}>
                                Medio
                            </StyledToggleButton>
                            <StyledToggleButton value="MUITO" sx={{ marginRight: '4%' }}>
                                Muito
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">

                        <div className="question">
                            Nota geral da disciplina:
                        </div>
                        <div className="reviewFormRating">
                            <Rating value={overall_rating || 0} setValue={setOverallRating} size="1.5em" read={false} />
                        </div>

                    </div>
                    <div className="reviewField">

                        <div className="question">
                            Comentario opcional:
                        </div>
                        <div className="commentInput">
                            <Comment setValue={setComment} value={comment} />
                        </div>
                    </div>
                    <button className="sendReviewButton" type="submit">Enviar</button>
                </form>
            </div >

        </div >
    );
}