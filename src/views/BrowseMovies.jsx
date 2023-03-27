import React from 'react'
import { moviesCountRoute, moviesDatesRoute, moviesRoute, moviesSearchRoute } from '../constants';
import { useState, useEffect } from 'react';
import MovieSummary from '../components/MovieSummary';

function BrowseMovies() {

  const [moviesCount, setMoviesCount] = useState(0);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  const [minimumDate, setMinimumDate] = useState(1891);
  const [maximumDate, setMaximumDate] = useState(2023);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchMoviesCount() {
      const url = moviesCountRoute;

      const response = await fetch(url);
      if (response.status == 200) {
        const data = await response.json();
        setMoviesCount(data.count);
      }
    }
    async function fetchMovies() {
      const url = moviesRoute;

      const response = await fetch(url);
      if (response.status == 200) {
        const data = await response.json();
        setMovies(data.documents);
      }
    }

    fetchMoviesCount();
    fetchMovies();
  }, [])

  async function filterLanguage(language) {
    const url = moviesRoute + `?lang=${language}` // query parameter

    await handleResponse(url)
  }

  async function onClickFilterDates() {
    const url = moviesDatesRoute + `?min=${minimumDate}&max=${maximumDate}` // query parameters

    await handleResponse(url)
  }

  async function onClickSearch() {
    const url = moviesSearchRoute + `/${searchTerm}` // path parameter

    await handleResponse(url)
  }
  async function handleResponse(url) {
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json();
      console.log('data: ', data);
      setMovies(data.documents);
    }
  }

  // MARKUP 
  return (
    <div>
      <h1>🎞 MFlix movies 🎬</h1>

      <section>
        <h4 className='m-3'>Browse our rich collection of {moviesCount} movies <button className='btn btn-outline-secondary my-2' onClick={() => setAreOptionsVisible(!areOptionsVisible)}>Filter</button></h4>
      </section>

      <section>
        <div>
          {areOptionsVisible ? <>
            <div className='m-1'>
              <b>Filter by language</b>
              <button className='btn btn-info mx-2 p-3' onClick={() => filterLanguage('English')}>English</button>
              <button className='btn btn-info mx-2 p-3' onClick={() => filterLanguage('French')}>French</button>
              <button className='btn btn-info mx-2 p-3' onClick={() => filterLanguage('Spanish')}>Spanish</button>
              <button className='btn btn-info mx-2 p-3' onClick={() => filterLanguage('Others')}>Others</button>
            </div>
            <div className="container">
              <div className="row">
                <div className="col" style={{minWidth: "30vw"}}>
                  <label htmlFor="basic-url" className="form-label"><b>Filter by dates</b></label>
                  <div className="input-group mb-3">
                    <span class="input-group-text">Minimum</span>
                    <input type="number" min="1891" max={Math.min(2023, maximumDate)} className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={(e) => { setMinimumDate(e.target.value) }}/>
                    <span class="input-group-text">Maximum</span>
                    <input type="number" min={Math.max(1891, minimumDate)} max="2023" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={(e) => { setMaximumDate(e.target.value) }}/>
                    <button className="btn btn-secondary" type="button" id="button-addon1" onClick={() => onClickFilterDates()}>Filter</button>
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="basic-url" className="form-~label"><b>Search by name</b></label>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" onChange={(e) => { setSearchTerm(e.target.value) }} />
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick={() => onClickSearch()}>Search</button>
                  </div>
                </div>
              </div>
            </div>

          </> : <></>}
        </div>
      </section>


      <section>
        <div className='container border-2'>
          <div className="row">
            {
              movies.map((movieData, index) => {
                return <div className="col-4 p-0" key={index}>
                  <MovieSummary title={movieData.title} plot={movieData.plot} imgLink={movieData.poster} genres={movieData.genres || []} />
                </div>
              })
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default BrowseMovies