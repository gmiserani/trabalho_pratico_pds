import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './routes';
import './App.css'

// useEffect -> executa uma função toda vez que o componente é renderizado, recebe uma funcao e uma lista de dependencia
// a funcao é executada toda vez que a lista de dependencia é alterada
// render -> executa toda vez que o componente é renderizado
// useState -> cria um estado para o componente

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App