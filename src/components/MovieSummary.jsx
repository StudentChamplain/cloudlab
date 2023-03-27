import React from 'react'

function MovieSummary({title, imgLink, plot, genres}) {
  return (
    <div className="card border border-3 border-dark p-1">
        <img src={imgLink || "https://www.altavod.com/assets/images/poster-placeholder.png"} style={{maxHeight: "50vh"}} alt="Poster image not available" />
        <div className="card-body">
            <h5>{title}</h5>
            <p>{plot}</p>
            <div>
            {
                genres.map((genre, index) => {
                    return <span key={index} className='badge text-bg-info p-2 mx-1'>{genre}
                    </span>
                })
            }
            </div>
        </div>
    </div>
  )
}

export default MovieSummary