import { useNavigate } from 'react-router-dom';
function SignUp() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        // Perform authentication logic here
        localStorage.setItem('token', 'success');
        navigate('/');
    };

    return (
        <div>
            <h1>SignUp</h1>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );

}
export default SignUp;