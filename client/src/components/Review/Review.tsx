import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Atoms/Input/Input";
import { useState } from "react";
import { addReview } from "../../services/subject";
import { useParams } from "react-router-dom";
import { Box } from '../Header/Header';

export default function Review() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [presence_rating, setPresenceRating] = useState('');
    const [teacher_rating, setTeacherRating] = useState('');
    const [project_rating, setProjectRating] = useState('');
    const [test_rating, setTestRating] = useState('');
    const [effort_rating, setEffortRating] = useState('');
    const [overall_rating, setOverallRating] = useState('');
    const [comment, setComment] = useState('');

    const { id } = useParams();

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
            <Box />
            <h1>Subject</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Presence Rating</label>
                    <Input type="text" loading={loading} setValue={setPresenceRating} value={presence_rating} />
                </div>
                <div>
                    <label>Teacher Rating</label>
                    <Input type="text" loading={loading} setValue={setTeacherRating} value={teacher_rating} />
                </div>
                <div>
                    <label>Project Rating</label>
                    <Input type="text" loading={loading} setValue={setProjectRating} value={project_rating} />
                </div>
                <div>
                    <label>Test Rating</label>
                    <Input type="text" loading={loading} setValue={setTestRating} value={test_rating} />
                </div>
                <div>
                    <label>Effort Rating</label>
                    <Input type="text" loading={loading} setValue={setEffortRating} value={effort_rating} />
                </div>
                <div>
                    <label>Overall Rating</label>
                    <Input type="text" loading={loading} setValue={setOverallRating} value={overall_rating} />
                </div>
                <div>
                    <label>Comment</label>
                    <Input type="text" loading={loading} setValue={setComment} value={comment} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}