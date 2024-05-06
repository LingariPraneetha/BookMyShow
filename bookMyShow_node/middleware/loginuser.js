import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getConnection } from '../database/connection.js';
const connections = getConnection();
connections.connect();

export const loginUser= async (req, res) => {
    try {
      console.log("Hiii")
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const getUserSql = 'SELECT * FROM signup WHERE email = ?';
      const user = await queryDatabase(getUserSql, [email]);
  
      if (!user || user.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user[0].password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Enter correct password' });
      }
  
      const token = jwt.sign({
        user:{
         userId: user[0].id, 
         email: user[0].email,
         userName:user[0].name },
        },
          process.env.access_token_secretKey, {expiresIn: '10h',
      });
  
      res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  async function queryDatabase(sql, values) {
    return new Promise((resolve, reject) => {
      connections.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

  }

    export const addTicket = async (req, res) => {
      console.log(req.user)
      try {
          const { email } = req.user;
          const { date, theaterName, theaterLocation, timing, seats, totalTicketPrice, movieTitle } = req.body;
          console.log("hii")
          const query = `
              INSERT INTO tickets (email, date, theaterName, theaterLocation, timing, seats, totalTicketPrice,movieTitle)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
    
          connections.query(query, [email, date, theaterName, theaterLocation, timing, JSON.stringify(seats), totalTicketPrice,movieTitle], (err, result) => {
              if (err) {
                  console.error('Error inserting ticket:', err);
                  res.status(500).send(err.message);
              } else {
                  console.log('Ticket inserted successfully:', result);
                  console.log(result);
                  res.status(201).json(result);
              }
          });
      } catch (error) {
          console.error('Add ticket error:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      }
    };

    // export const addTicket = async (req, res) => {
    //   console.log(req.user)
    //   try {
    //       const { email } = req.user;
    //       const { date, theaterName, theaterLocation, timing, seats, totalTicketPrice, movieTitle } = req.body;
    //       console.log("hii")
    //       const query = `
    //           INSERT INTO tickets (email, date, theaterName, theaterLocation, timing, seats, totalTicketPrice,movieTitle)
    //           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    //       `;
    
    //       connections.query(query, [email, date, theaterName, theaterLocation, timing, JSON.stringify(seats), totalTicketPrice,movieTitle], (err, result) => {
    //           if (err) {
    //               console.error('Error inserting ticket:', err);
    //               res.status(500).send(err.message);
    //           } else {
    //               console.log('Ticket inserted successfully:', result);
    //               console.log(result);
    //               res.status(201).json(result);
    //           }
    //       });
    //   } catch (error) {
    //       console.error('Add ticket error:', error);
    //       res.status(500).json({ message: 'Internal Server Error' });
    //   }
    // };

    export const getUserTickets = async (req, res) => {
      try {
          const { email } = req.user;
  
          const query = `
              SELECT * FROM tickets
              WHERE email = ?
          `;

          connections.query(query, [email], (err, results) => {
              if (err) {
                  console.error('Error fetching user tickets:', err);
                  res.status(500).send(err.message); 
              } else {
                  console.log('User tickets retrieved successfully:', results);
                  res.status(200).json(results); 
              }
          });
      } catch (error) {
          console.error('Get user tickets error:', error);
          res.status(500).json({ message: 'Internal Server Error' }); 
      }
  };
    
  
  //   export const addTicket = async (req, res) => {
  //     try {
  //         const { email } = req.user;
  //         const { date, theaterName, theaterLocation, timing, seats, totalTicketPrice, movieTitle } = req.body;
  
  //         // Check if the seat is already booked
  //         const query = `
  //             SELECT id FROM tickets 
  //             WHERE date = ? AND theaterName = ? AND theaterLocation = ? AND timing = ? AND movieTitle = ? AND JSON_CONTAINS(seats, JSON_ARRAY(?)) > 0
  //         `;
  //         connections.query(query, [date, theaterName, theaterLocation, timing, movieTitle, JSON.stringify(seats)], (err, result) => {
  //             if (err) {
  //                 console.error('Error checking seat availability:', err);
  //                 res.status(500).send(err.message);
  //                 return;
  //             }
  
  //             if (result.length > 0) {
  //                 res.status(400).json({ message: 'Selected seat(s) are already booked' });
  //             } else {
  //                 const insertQuery = `
  //                     INSERT INTO tickets (email, date, theaterName, theaterLocation, timing, seats, totalTicketPrice, movieTitle)
  //                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  //                 `;
  //                 connections.query(insertQuery, [email, date, theaterName, theaterLocation, timing, JSON.stringify(seats), totalTicketPrice, movieTitle], (err, result) => {
  //                     if (err) {
  //                         console.error('Error inserting ticket:', err);
  //                         res.status(500).send(err.message);
  //                     } else {
  //                         console.log('Ticket inserted successfully:', result);
  //                         res.status(201).json(result);
  //                     }
  //                 });
  //             }
  //         });
  //     } catch (error) {
  //         console.error('Add ticket error:', error);
  //         res.status(500).json({ message: 'Internal Server Error' });
  //     }
  // };
  

    
    export const getBookedSeats = async (req, res) => {
      const { movieTitle, theaterName, date, timing } = req.query;
    
      const query = `SELECT * FROM tickets WHERE movieTitle  = ? AND theaterName = ? AND date = ? AND timing = ?
      `;
     
      connections.query(query, [movieTitle, theaterName, date, timing], (error, results) => {
        if (error) {
          console.error('Error fetching booked seats:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          console.log('Booked seats fetched successfully:', results);
          res.status(200).json(results);
        }
      });
    };
    
  
  
  
