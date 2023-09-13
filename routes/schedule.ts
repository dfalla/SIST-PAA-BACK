import { Router } from "express";
import { createSchedule, getSchedules, updateSchedule, deleteSchedule, getSchedule } from '../controllers';
import { validateJWT, validationFieldsSchedule } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getSchedules)
router.get('/:id_schedule', getSchedule)
router.post('/', validationFieldsSchedule,   createSchedule)
router.put('/:id_schedule', validationFieldsSchedule, updateSchedule)
router.delete('/:id_schedule', deleteSchedule)

export default router;