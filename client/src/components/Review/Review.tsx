import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Atoms/Input/Input";
import { useState } from "react";
import { addReview } from "../../services/subject";
import { useParams } from "react-router-dom";
import { Header } from '../Header/Header';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { StyledRating } from '../../components/Atoms/Rating';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Review.css';
// import { styled } from "@mui/material/styles";

// export const styledToggleButton = styled(ToggleButton)({
//     "&.Mui-selected, &.Mui-selected:hover": {
//         color: "white",
//         backgroundColor: '#00ff00'
//     }
// });

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

    const handlePresenceResponse = (event: React.MouseEvent<HTMLElement>, value: string) => {
        setPresenceRating(value);
    };

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
        <div>
            <Header />
            <div className="reviewPage">
                <div className="backButton">
                    <ArrowBackIcon onClick={() => navigate(`/subject/${id}`)} />
                </div>
                <form onSubmit={handleSubmit} className="reviewForm">
                    <div className="reviewField">
                        <div className="question">
                            Cobra presenca?
                        </div>

                        <ToggleButtonGroup value={presence_rating} exclusive onChange={handlePresenceResponse} aria-label="reviewResponse" className="options">
                            <ToggleButton value="SIM" className="option">
                                Sim
                            </ToggleButton>
                            <ToggleButton value="NAO" className="option">
                                Nao
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Como e a didatica do professor?
                        <ToggleButtonGroup value={teacher_rating} exclusive onChange={handleTeacherResponse} aria-label="reviewResponse">
                            <ToggleButton value="RUIM">
                                Ruim
                            </ToggleButton>
                            <ToggleButton value="MEDIA" >
                                Media
                            </ToggleButton>
                            <ToggleButton value="BOA" >
                                Boa
                            </ToggleButton>
                            <ToggleButton value="OTIMA" >
                                Otima
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Como sao os trabalhos?
                        <ToggleButtonGroup value={project_rating} exclusive onChange={handleProjectResponse} aria-label="reviewResponse">
                            <ToggleButton value="FACIL">
                                Facil
                            </ToggleButton>
                            <ToggleButton value="MEDIO" >
                                Medio
                            </ToggleButton>
                            <ToggleButton value="DIFICIL" >
                                Dificil
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Como sao as provas?
                        <ToggleButtonGroup value={test_rating} exclusive onChange={handleTestResponse} aria-label="reviewResponse">
                            <ToggleButton value="FACIL">
                                Facil
                            </ToggleButton>
                            <ToggleButton value="MEDIO" >
                                Medio
                            </ToggleButton>
                            <ToggleButton value="DIFICIL" >
                                Dificil
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="reviewField">
                        Quanto tempo de dedicacao e necessario?
                        <ToggleButtonGroup value={effort_rating} exclusive onChange={handleEffortResponse} aria-label="reviewResponse">
                            <ToggleButton value="POUCO">
                                Pouco
                            </ToggleButton>
                            <ToggleButton value="MEDIO" >
                                Medio
                            </ToggleButton>
                            <ToggleButton value="MUITO" >
                                Muito
                            </ToggleButton>
                        </ToggleButtonGroup>
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
            </div>

        </div>
    );
}