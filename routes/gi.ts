import { Router } from "express";
import {    AddStudentOfTheGroupIntermediate,
            getStudentsOfTheGroupIntermediate,
            deleteStudentOfTheGroupIntermediate } from '../controllers';
import { validateJWT } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getStudentsOfTheGroupIntermediate)
router.post('/', AddStudentOfTheGroupIntermediate)
router.delete('/:id_student', deleteStudentOfTheGroupIntermediate)

export default router;