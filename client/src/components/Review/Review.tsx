import { useNavigate } from "react-router-dom";
import { Comment } from "../../components/Atoms/Comment";
import { useState } from "react";
import { addReview } from "../../services/subject";
import { useParams } from "react-router-dom";
import { Header } from '../Header/Header';
import { StyledRating } from '../../components/Atoms/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
    toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import Star from '@mui/icons-material/Star';
import './Review.css';
import StarBorderOutlined from '@mui/icons-material/StarBorderOutlined';

import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        marginLeft: 1,
        border: 0,
        borderRadius: 25,
        backgroundColor: '#E9D5E7',
        color: '#3c043e',
        width: 100,
        [`&.${toggleButtonGroupClasses}`]: {
            border: 0,
        },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
    },
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: '#3c043e'
    }

}));

const StyledToggleButton = styled(ToggleButton)(() => ({
    [`&.${toggleButtonClasses.root}`]:
    {
        padding: '0.2em',
        textTransform: 'none',
        fontWeight: 'bold',
        width: '100%',

    },
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: '#3c043e',
        width: '100%',
    }
}));

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
            <Header />

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
                        <StyledRating className="review-rating" name="overall_rating" value={overall_rating || 0} onChange={(event, newValue) => { setOverallRating(newValue || 0); }} icon={<Star style={{ width: "1.5em", height: "1.5em" }} />} emptyIcon={<StarBorderOutlined style={{ width: "1.5em", height: "1.5em" }} />} />
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