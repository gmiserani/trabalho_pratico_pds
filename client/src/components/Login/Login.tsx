import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Perform authentication logic here
        localStorage.setItem("token", "success");
        navigate("/");
    };

    return (
        <div className="page">
            <div className="box">
                <div className="login">
                    <div className="overlap">
                        <Link to="signup">
                            <div className="cadastro">
                                <div className="text-wrapper">
                                    Cadastrar-se
                                </div>
                            </div>
                        </Link>
                        <button className="entrar" onClick={handleLogin}>
                            <div className="button-text">
                                Entrar
                            </div>
                        </button>
                        <div className="info">
                            <div className="senha">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-2">Senha</div>
                                    <input type="password" className="rectangle" />
                                </div>
                            </div>
                            <div className="email">
                                <div className="overlap-group-2">
                                    <div className="text-wrapper-2">Email</div>
                                    <input type="email" className="rectangle" />
                                </div>
                            </div>
                        </div>
                        <div className="text-wrapper-4">Login</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;