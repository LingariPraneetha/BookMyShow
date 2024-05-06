// // theatreList.js

// import { getConnection } from "../database/connection.js";
// const connections = getConnection();
// connections.connect();

// export const allTheatres = (req, res) => {
//   const query = `
//     SELECT name, location, GROUP_CONCAT(showTimings) as showTimings
//     FROM theaters
//     GROUP BY name, location
//   `;

//   connections.query(query, (error, results) => {
//     if (error) {
//       console.error('Error fetching theaters:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.status(200).json(results);
//     }
//   });
// };



// import { getConnection } from "../database/connection.js";
// const connections = getConnection();
// connections.connect();

// export const allTheatres = (req, res) => {
//   const query = `
//     SELECT name, location, 
//            GROUP_CONCAT(showTimings) as showTimings, 
//            GROUP_CONCAT(ticketPrice) as ticketPrices
//     FROM theaters
//     GROUP BY name, location
//   `;

//   connections.query(query, (error, results) => {
//     if (error) {
//       console.error('Error fetching theaters:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//            res.status(200).json(results);
//           }
//    });
// }
import { getConnection } from "../database/connection.js";
const connections = getConnection();
connections.connect();

export const allTheatres = (req, res) => {
    const query = `
        SELECT name, location, 
               GROUP_CONCAT(showTimings) as showTimings, 
               GROUP_CONCAT(ticketPrice) as ticketPrices     
        FROM theaters
        GROUP BY name, location;
    `;

    connections.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching theaters:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
};
