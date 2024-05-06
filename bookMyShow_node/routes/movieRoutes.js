
import { Router } from 'express';
const router=Router();
import { getAllMovies ,getMovieById} from "../handler/movieList.js";

router.get('/',getAllMovies);
router.get('/:id',getMovieById);




export default router;