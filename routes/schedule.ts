import { Router } from "express";
import { createSchedule, getSchedules, updateSchedule, deleteSchedule, getSchedule } from '../controllers';
import { validateJWT, validationFieldsSchedule } from '../middlewares'; 

const router = Router();
router.use( validateJWT );

router.get('/', getSchedules)
router.get('/:schedule_id', getSchedule)
router.post('/', validationFieldsSchedule,   createSchedule)
router.put('/:schedule_id', validationFieldsSchedule, updateSchedule)
router.delete('/:schedule_id', deleteSchedule)

export default router;