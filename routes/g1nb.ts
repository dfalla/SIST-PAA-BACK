import { Router } from "express";
import {    AddStudentOfTheGroupOne,
            getStudentsOfTheGroupOne,
            deleteStudentOfTheGroupOne } from '../controllers';
import { validateJWT } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getStudentsOfTheGroupOne)
router.post('/', AddStudentOfTheGroupOne)
router.delete('/:id_student', deleteStudentOfTheGroupOne)

export default router;