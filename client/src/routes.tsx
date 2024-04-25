import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
// import Profile from "./components/Profile/Profile";
// import Signup from "./components/Signup/Signup";
// import Subject from "./components/Subject/Subject";
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLoggedUser } from './services/user';

interface User {
    name: string;
    email: string;
    username: string;
    course: string;
    semester: number;
}

function AllRoutes() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await getLoggedUser();
                setUser(response.data);
            }
            catch (err) {
                console.log(err);
            }
        };
        getUserData();
    }, []);

    const auth = {
        token: localStorage.getItem('token')
    }

    return (
        auth.token ? <Outlet /> : <Navigate to="/login" replace />
    )

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            {/* <Route path="/Profile" element={<Profile user={user} />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Subject" element={<Subject />} /> */}
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AllRoutes;