import { Router } from "express";
import {    AddStudentOfTheGroupFour,
            getStudentsOfTheGroupFour,
            deleteStudentOfTheGroupFour } from '../controllers';
import { validateJWT } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getStudentsOfTheGroupFour)
router.post('/', AddStudentOfTheGroupFour)
router.delete('/:id_student', deleteStudentOfTheGroupFour)

export default router;