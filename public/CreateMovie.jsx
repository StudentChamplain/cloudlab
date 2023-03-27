import React from 'react'
import { useState } from 'react'
import MovieSummary from '../src/components/MovieSummary';

function CreateMovie() {

    const [movieData, setMovieData] = useState({});
    const [selectedImage, setSelectedImage] = useState();
    const [imageLink, setImageLink] = useState("");
    const [imageSuccess, setImageSuccess] = useState(false);
    
    function onClickAddMovie() {
        console.log('movieData: ', movieData);
        handleSubmission();
    }

    function changeImageHandler(event) {
        if (event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
        } else {
            setSelectedImage();
        }
    }


    async function handleSubmission() {

        let newMovieId;
        const urlMovie = 'http://localhost:8080/movies';
        const options = {
            method: 'POST',
            body: JSON.stringify(movieData),
            headers: { "Content-Type": "application/json" },
        }

        const response1 = await fetch(urlMovie, options);
        if (response1.status === 201) {
            const responseBody = await response1.json();
            console.log('responseBody: ', responseBody);
            newMovieId = responseBody.result.insertedId;
        } else {
            // Toast?
            return
        }

        const bodyFormData = new FormData();
        bodyFormData.append('poster', selectedImage);
        
        const urlImage = 'http://localhost:8080/movies/image/' + newMovieId;
        const response2 = await fetch(urlImage, {
            method: 'POST',
            body: bodyFormData,
        })

        if (response2.status === 200) {
            // Toast?
            console.log("IMAGE SUCCESS")
            const body = await response2.json();
            console.log('body: ', body);
            setImageLink(body.document.image.path);
            setImageSuccess(true);
        }
    }

    return (
        <div>
            <h1>Add a new movie</h1>
            <section>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Title</span>
                    <input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" onChange={(e) => setMovieData({ ...movieData, title: e.target.value })} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Plot</span>
                    <textarea type="textArea" className="form-control" placeholder="Plot" aria-describedby="basic-addon1" onChange={(e) => setMovieData({ ...movieData, plot: e.target.value })} />
                    <span className="input-group-text" id="basic-addon1">Year</span>
                    <input type="number" min="1900" className="form-control" placeholder="Year" aria-describedby="basic-addon1" onChange={(e) => setMovieData({ ...movieData, year: e.target.value })} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Genres*</span>
                    <input type="text" className="form-control" placeholder="Genres" aria-describedby="basic-addon1" onChange={(e) => setMovieData({ ...movieData, genres: e.target.value?.split(',') })} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Languages*</span>
                    <input type="text" className="form-control" placeholder="Languages" aria-describedby="basic-addon1" onChange={(e) => setMovieData({ ...movieData, languages: e.target.value?.split(',') })} />
                </div>
                <div className='mb-3'><b>*</b>For these fields, enter each values separated by commas, with no spaces. Ex: <code>French,English</code></div>
                <div className="input-group mb-3">
                    <input type="file" className="form-control" placeholder="Image" aria-describedby="basic-addon1" onChange={changeImageHandler} />
                    <span className="input-group-text bg-warning" id="basic-addon1">Image</span>
                </div>
                <button className='btn btn-lg btn-primary' onClick={() => onClickAddMovie()}>Save</button>
            </section>

            <section>
                {imageSuccess ? <>
                <MovieSummary title={movieData.title} plot={movieData.plot} genres={movieData.genres} imgLink={`http://localhost:8080/${imageLink}`}/>
                </>: <></>}
            </section>
        </div>
    )
}

export default CreateMovie