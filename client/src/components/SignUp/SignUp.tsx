import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Atoms/Input/Input";
import { useState } from "react";
import { login, signup } from '../../services/user';
import Header from '../Header/Header';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./SignUp.css";

export default function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [course, setCourse] = useState('');
    const [semester, setSemester] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const [loading, setLoading] = useState(false);

    async function handleSingUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        if (email === '' || password === '') {
            setLoading(false);
            return;
        }

        await signup(name, username, email, password, course, semester).then(() => {
            console.log('SingUp success');
            localStorage.setItem('token', 'success');
            navigate('/');
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            throw err;
        });
    }

    return (
        <div className="signUpContainer">
            <Header logged={false} />
            <div className="backButtonSignUp">
                <ArrowBackIcon onClick={() => navigate('/login')} />
            </div>
            <div className="form-wrapper-signup">
                <h1>Cadastro</h1>
                <form onSubmit={handleSingUp}>
                    <div className="inputEmail">
                        <h3>Nome</h3>
                        <Input type="name" loading={loading} setValue={setName} value={name} />
                    </div>
                    <div className="inputEmail">
                        <h3>Username</h3>
                        <Input type="username" loading={loading} setValue={setUsername} value={username} />
                    </div>
                    <div className="inputEmail">
                        <h3>Email</h3>
                        <Input type="email" loading={loading} setValue={setEmail} value={email} />
                    </div>
                    <div className="inputEmail">
                        <h3>Curso</h3>
                        <Input type="course" loading={loading} setValue={setCourse} value={course} />
                    </div>
                    <div className="inputEmail">
                        <h3>Periodo</h3>
                        <Input type="semester" loading={loading} setValue={setSemester} value={semester} />
                    </div>
                    <div className="inputPassword">
                        <h3>Senha</h3>
                        <Input type="password" loading={loading} setValue={setPassword} value={password} />
                    </div>
                    <button className="entrar">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}