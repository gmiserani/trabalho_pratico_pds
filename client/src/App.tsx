import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Subject from "./components/Subject/Subject"
import Review from "./components/Review/Review";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

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
            <Route path='subject/:id' element={<Subject />} />
            <Route path='subject/:id/add-review' element={<Review />} />
            <Route element={<h1>Not Found</h1>} path="*" />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
        </Routes>
      </Router>
    </div>
  );
}
export default App