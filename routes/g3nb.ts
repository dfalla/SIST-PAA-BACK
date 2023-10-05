import { Router } from "express";
import {    AddStudentOfTheGroupThree,
            getStudentsOfTheGroupThree,
            deleteStudentOfTheGroupThree } from '../controllers';
import { validateJWT } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getStudentsOfTheGroupThree)
router.post('/', AddStudentOfTheGroupThree)
router.delete('/:id_student', deleteStudentOfTheGroupThree)

export default router;