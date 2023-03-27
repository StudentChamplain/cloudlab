import reactLogo from './assets/react.svg'
import './App.css'
import { Link } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome to MFlix</h1>
      <div className="m-3">
        <Link to="/movies/browse">
          <button className='btn btn-lg btn-outline-primary'>
            Browse movies
          </button>
        </Link>
        <Link to="/movies/create" className='m-2'>
          <button className='btn btn-lg btn-outline-primary'>
            Add a movie
          </button>
        </Link>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
