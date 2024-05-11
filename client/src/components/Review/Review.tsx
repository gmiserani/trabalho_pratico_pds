import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Atoms/Input/Input";
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

import './Review.css';

import { styled } from "@mui/material/styles";
import { Padding } from "@mui/icons-material";

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

    },
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: '#3c043e'
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

                <form onSubmit={handleSubmit} className="reviewForm">
                    <div className="backButton">
                        <ArrowBackIcon onClick={() => navigate(`/subject/${id}`)} sx={{ color: 'white' }} />
                    </div>
                    <div className="reviewField">

                        <div className="question">
                            Cobra presenca?
                        </div>
                        <StyledToggleButtonGroup value={presence_rating} exclusive onChange={handlePresenceResponse} aria-label="reviewResponses" >
                            <StyledToggleButton value="SIM" sx={{ marginRight: '1em' }}>
                                Sim
                            </StyledToggleButton>
                            <StyledToggleButton value="NAO" sx={{ marginLeft: '1em' }}>
                                Nao
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Como e a didatica do professor?
                        <StyledToggleButtonGroup value={teacher_rating} exclusive onChange={handleTeacherResponse} aria-label="reviewResponse">
                            <StyledToggleButton value="RUIM" sx={{ marginRight: '1em' }}>
                                Ruim
                            </StyledToggleButton>
                            <StyledToggleButton value="MEDIA" sx={{ marginRight: '1em' }}>
                                Media
                            </StyledToggleButton>
                            <StyledToggleButton value="BOA" sx={{ marginRight: '1em' }}>
                                Boa
                            </StyledToggleButton>
                            <StyledToggleButton value="OTIMA" sx={{ marginRight: '1em' }}>
                                Otima
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Como sao os trabalhos?
                        <StyledToggleButtonGroup value={project_rating} exclusive onChange={handleProjectResponse} aria-label="reviewResponse">
                            <StyledToggleButton value="FACIL" sx={{ marginRight: '1em' }}>
                                Facil
                            </StyledToggleButton>
                            <StyledToggleButton value="MEDIO" sx={{ marginRight: '1em' }}>
                                Medio
                            </StyledToggleButton>
                            <StyledToggleButton value="DIFICIL" sx={{ marginRight: '1em' }}>
                                Dificil
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Como sao as provas?
                        <StyledToggleButtonGroup value={test_rating} exclusive onChange={handleTestResponse} aria-label="reviewResponse">
                            <StyledToggleButton value="FACIL" sx={{ marginRight: '1em' }}>
                                Facil
                            </StyledToggleButton>
                            <StyledToggleButton value="MEDIO" sx={{ marginRight: '1em' }}>
                                Medio
                            </StyledToggleButton>
                            <StyledToggleButton value="DIFICIL" sx={{ marginRight: '1em' }}>
                                Dificil
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Quanto tempo de dedicacao e necessario?
                        <StyledToggleButtonGroup value={effort_rating} exclusive onChange={handleEffortResponse} aria-label="reviewResponse">
                            <StyledToggleButton value="POUCO" sx={{ marginRight: '1em' }}>
                                Pouco
                            </StyledToggleButton>
                            <StyledToggleButton value="MEDIO" sx={{ marginRight: '1em' }}>
                                Medio
                            </StyledToggleButton>
                            <StyledToggleButton value="MUITO" sx={{ marginRight: '1em' }}>
                                Muito
                            </StyledToggleButton>
                        </StyledToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Nota geral da disciplina:
                        <StyledRating name="overall_rating" value={overall_rating || 0} onChange={(event, newValue) => { setOverallRating(newValue || 0); }} />
                    </div>
                    <div className="reviewField">
                        Comentario opcional:
                        <Input type="comment" loading={loading} setValue={setComment} value={comment} />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div >

        </div >
    );
}