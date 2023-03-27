import React, { useState } from 'react'

function CreateMovie() {

    const [movieData, setMovieData] = useState({});
    const [selectedImage, setSelectedImage] = useState();

    async function handleSubmit() {
        // POST HTTP request
        console.log('movieData: ', movieData);

        const url = 'http://localhost:8080/movies'
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(movieData),
            headers: {
                'content-type': 'application/json'
            }
        })

        let movieId;

        if(response.status === 201){
            const data = await response.json();
            console.log('data: ', data);
            movieId = data.id;
            console.log('movieId: ', movieId);

            const bodyFormData = new FormData();
            bodyFormData.append('poster', selectedImage);

            await fetch('http://localhost:8080/movies/image/' + movieId, {
                method: 'POST',
                body: bodyFormData,
            })
        }
    }

    function changeImageHandler(event) {
        if (event.target.files.length > 0) {
            setSelectedImage(event.target.files[0]);
        } else {
            setSelectedImage();
        }
    }

    return (
        <div>
            <h1>Add a movie</h1>

            <section>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Title</span>
                    <input type="text" className="form-control" placeholder="Title" onChange={(event) => {
                        setMovieData({...movieData, title: event.target.value})
                    }}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Plot</span>
                    <textarea type="text" className="form-control" placeholder="Plot" onChange={(event) => {
                        setMovieData({...movieData, plot: event.target.value})
                    }}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Year</span>
                    <input type="number" min="1900" className="form-control" placeholder="Year" onChange={(event) => {
                        setMovieData({...movieData, year: parseInt(event.target.value)})
                    }}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Image</span>
                    <input type="file" className="form-control" placeholder="Image" onChange={(event) => {
                        changeImageHandler(event);
                    }}/>
                </div>

                <div>
                    <button className='btn btn-primary' onClick={() => handleSubmit()}>Save</button>
                </div>

            </section>
        </div>
    )
}

export default CreateMovie