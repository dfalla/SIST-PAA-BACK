import { Router } from "express";
import { createStudent } from '../controllers';
import { validateJWT, validationFieldsStudent } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

// router.get('/', getAceites)
// router.get('/:id_producto', getAceite)
router.post('/', validationFieldsStudent,   createStudent)
// router.put('/:id_producto', validarProducto, updateAceite)
// router.delete('/:id_producto', deleteAceite)

export default router;