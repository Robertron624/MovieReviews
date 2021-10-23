import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';


function App() {

  const [movieName, setMovieName] = useState("")
  const [review, setReview] = useState("")
  const [movieReviewList, setMovieList] = useState([])
  const [newReview, setNewReview] = useState("")

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      setMovieList(response.data)
    })
  }, [])


  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview:review
    });
    setMovieList([...movieReviewList, {movieName:movieName, movieReview:review}])
  }

  const deleteReview = (movie)=>{
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }

  const updateReview = (movie)=>{
    Axios.put("http://localhost:3001/api/update/", {
      movieName: movie, 
      movieReview: newReview
    })
    setNewReview("")
  }


  return (
    <div className="App">
      <h1>Reviews de peliculas</h1>

      <div className="form">
        <label htmlFor="moname">Nombre de la pelicula</label>
        <input type="text" name="movieName" onChange={(e)=>{
          setMovieName(e.target.value)
        }}/>

        <label htmlFor="moreview">Review</label>
        <input type="text" name="review" onChange={(e)=>{
          setReview(e.target.value)
        }} />

        <button onClick={submitReview}>Enviar</button>

        {movieReviewList.map((val)=>{
          return( 
            <div className='card' key={val.id}>
             <h1>{val.movieName} </h1> 
             <p>{val.movieReview}</p>

             <button onClick={()=>{deleteReview(val.movieName)}}>Borrar</button>
             <input type="text" id="updateInfo" onChange={(e)=>setNewReview(e.target.value)}/>
             <button onClick={()=>{updateReview(val.movieName)}}>Actualizar</button>
            </div>
            )
        })}
      </div>

    </div>
  );
}

export default App;
