import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Atoms/Input/Input";
import { useState, useEffect } from "react";
import { login, isLoggedIn } from '../../services/user';
import Header from '../Header/Header';
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            await isLoggedIn().then((res) => {
                if (res.data) {
                    setLogged(true);
                    navigate('/');
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        checkLogin();
    }, [logged]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        if (email === '' || password === '') {
            setLoading(false);
            return;
        }

        await login(email, password).then(() => {
            console.log('Logged in');
            localStorage.setItem('token', 'success');
            navigate('/');
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            throw err;
        });
    }

    return (
        <div>
            <Header logged={false} />
            <div className="form-wrapper">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputEmail">
                        <h3>Email</h3>
                        <Input type="email" loading={loading} setValue={setEmail} value={email} />
                    </div>
                    <div className="inputPassword">
                        <h3>Senha</h3>
                        <Input type="password" loading={loading} setValue={setPassword} value={password} />
                    </div>
                    <button className="entrar">
                        Entrar
                    </button>
                </form>

                <Link className="signup" to='/signup'>Cadastre-se</Link>
            </div>
        </div>
    );
}