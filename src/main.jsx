import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BrowseMovies from './views/BrowseMovies';
import CreateMovie from './views/CreateMovie';
// Importing Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/movies/browse" element={<BrowseMovies />} />
      <Route path="/movies/create" element={<CreateMovie />} />
    </Routes>
  </BrowserRouter>,
)
