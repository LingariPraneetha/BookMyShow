
import { Router } from 'express';
const router=Router();
import { allTheatres } from "../handler/theatreList.js";

router.get('/all',allTheatres);
export default router;