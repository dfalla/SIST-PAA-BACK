import { Router } from "express";
import { createStudent,getStudents, getStudent, updateStudent, deleteStudent } from '../controllers';
import { validateJWT, validationFieldsStudent } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getStudents)
router.get('/:id_student', getStudent)
router.post('/', validationFieldsStudent,   createStudent)
router.put('/:id_student', validationFieldsStudent, updateStudent)
router.delete('/:id_student', deleteStudent)

export default router;