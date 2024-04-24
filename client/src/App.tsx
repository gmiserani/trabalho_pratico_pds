import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import SignUp from './components/SignUp/SignUp'
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" />
            <Route element={<Profile />} path='users/:teste' />
            <Route element={<h1>Not Found</h1>} path="*" />
          </Route>
          <Route element={<Login />} path="login" />
          <Route element={<SignUp />} path="signup" />
        </Routes>
      </Router>
    </div>
  );
}

export default App