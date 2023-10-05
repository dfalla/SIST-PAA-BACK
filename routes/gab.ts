import { Router } from "express";
import {    AddStudentOfTheGroupAdultBasic,
            getStudentsOfTheGroupAdultBasic,
            deleteStudentOfTheGroupAdultBasic } from '../controllers';
import { validateJWT } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getStudentsOfTheGroupAdultBasic)
router.post('/', AddStudentOfTheGroupAdultBasic)
router.delete('/:id_student', deleteStudentOfTheGroupAdultBasic)

export default router;