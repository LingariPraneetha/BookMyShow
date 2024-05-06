

import { getConnection } from '../database/connection.js';
const connections=getConnection();
connections.connect();


export const getAllMovies= (req,res)=>{
    connections.query('SELECT * FROM movies', (error, results) => {
      if (error) {
       console.log('Error fetching movies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json(results);
      }
    });
  };

  export const getMovieById = (req, res) => {
    const movieId = req.params.id;
  
    connections.query('SELECT * FROM movies WHERE id = ?', [movieId], (error, results) => {
      if (error) {
        console.log('Error fetching movie by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ message: 'Movie not found' });
      }
    });
};