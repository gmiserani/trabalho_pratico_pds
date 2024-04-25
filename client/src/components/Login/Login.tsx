import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Atoms/Input/Input";
import { useState } from "react";
import { login } from '../../services/user';
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
        <div className="page">
            <div className="box">
                <div className="login">
                    <div className="overlap">
                        <div className="text-wrapper-4">Login</div>
                        <form onSubmit={handleSubmit}>
                            <div className="inputs">
                                <div className="email">
                                    <div className="text-wrapper-2">Email</div>
                                    <Input type="email" loading={loading} setValue={setEmail} value={email} />
                                </div>
                                <div className="senha">
                                    <div className="text-wrapper-2">Senha</div>
                                    <Input type="password" loading={loading} setValue={setPassword} value={password} />
                                </div>
                            </div>
                            <button className="entrar">
                                <div className="button-text">
                                    Entrar
                                </div>
                            </button>
                        </form>

                        <Link to="signup">
                            <div className="cadastro">
                                <div className="text-wrapper">
                                    Cadastrar-se
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}