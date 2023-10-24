import { Router } from "express";
import { createLoan, deleteLoan, getAllLoans} from '../controllers';
import { validateJWT, validationFieldsLoans} from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getAllLoans)
router.post('/', validationFieldsLoans,   createLoan)
router.delete('/:id_loan', deleteLoan)

export default router;