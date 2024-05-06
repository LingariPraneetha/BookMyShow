import { Router } from 'express';
const router=Router();

import { postUserData,getAllUsers ,getParticularUser,deleteUser,updateUser,currentUser} from '../handler/Usersignup.js';
import { loginUser,addTicket, getBookedSeats,getUserTickets} from '../middleware/loginuser.js';
import {  validateToken } from '../middleware/validateToken.js';

router.post('/add',postUserData);
router.get('/getAllUsers',getAllUsers);
router.get('/user/:id',getParticularUser);
router.delete('/delete/:id',deleteUser);
router.put('/update',updateUser);
router.post('/login',loginUser);
router.post('/ticketDetails', validateToken, addTicket);
router.get('/currentuser',validateToken,currentUser);
router.get('/booked-seats',getBookedSeats)
router.get('/userTickets',validateToken,getUserTickets);

// router.get('/bookSeat/:email',getTicketForSameUserLogin)


export default router;