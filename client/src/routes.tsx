import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
// import Home from "./components/Home/Home";
// import Profile from "./components/Profile/Profile";
import { Routes, Route } from "react-router-dom";
// import { getLoggedUser } from "./services/user";
// import { useState } from "react";

// interface User {
//     name: string;
//     username: string;
//     email: string;
//     course: string;
//     semester: string;
// }

function AllRoutes() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [, setUser] = useState<User | null>(null);

    // useEffect(() => {
    //     const getUserData = async () => {
    //         try {
    //             const response = await getLoggedUser();
    //             setUser(response.data);
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     getUserData();
    // }, []);

    return (
        <Routes>
            {/* <Route path="/subjects" element={<Subjects />} />
            <Route path={"/profile/:username"} element={<Profile />} /> */}
            <Route path="/users/" element={<SignUp />} />
            <Route index element={<Login />} />
            <Route index element={<Login />} />
        </Routes>
    );
}

export default AllRoutes;