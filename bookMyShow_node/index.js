import express from 'express';
const app=express();
const {json}=pkg;
import pkg from'body-parser';
app.use(json());
import cors from "cors";
app.use(cors());
const port = 3000;
import jwt from 'jsonwebtoken'
import movieRoutes from './routes/movieRoutes.js'
import theatreRoutes from './routes/theatreRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv';
dotenv.config();


app.use('/theaters',theatreRoutes);
app.use('/movies',movieRoutes );
app.use('/movies/:id',movieRoutes);
app.use('/api',userRoutes);
// app.use('/users',userRoutes);
// app.use('/users/:id',userRoutes);
// app.use('/users/delete',userRoutes);
// app.use('users/update/:id',userRoutes);
// app.use('/api/login', userRoutes);
// app.use('/api',userRoutes)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

