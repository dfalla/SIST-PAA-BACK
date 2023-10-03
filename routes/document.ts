import { Router } from "express";
import { getTypesDocument } from '../controllers';
import { validateJWT } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getTypesDocument)

export default router;