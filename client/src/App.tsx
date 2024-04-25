import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
// import Profile from "./components/Profile/Profile";
// import Signup from "./components/Signup/Signup";
// import Subject from "./components/Subject/Subject";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import './App.css'

// useEffect -> executa uma função toda vez que o componente é renderizado, recebe uma funcao e uma lista de dependencia
// a funcao é executada toda vez que a lista de dependencia é alterada
// render -> executa toda vez que o componente é renderizado
// useState -> cria um estado para o componente

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" />
            {/* <Route element={<Profile />} path='users/:teste' /> */}
            <Route element={<h1>Not Found</h1>} path="*" />
          </Route>
          <Route element={<Login />} path="/login" />
          {/* <Route element={<SignUp />} path="signup" /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App