import { Router } from "express";
import {    AddStudentOfTheGroupTwo,
            getStudentsOfTheGroupTwo,
            deleteStudentOfTheGroupTwo } from '../controllers';
import { validateJWT } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getStudentsOfTheGroupTwo)
router.post('/', AddStudentOfTheGroupTwo)
router.delete('/:id_student', deleteStudentOfTheGroupTwo)

export default router;