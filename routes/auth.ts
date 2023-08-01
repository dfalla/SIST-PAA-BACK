import { Router } from 'express';
import { login, register, revalidateToken } from '../controllers';
import { validateFieldsLogin, validateFieldsRegister } from '../middlewares';
import { validateJWT } from '../middlewares/validar-jwt'


const router = Router();

router.post('/register', validateFieldsRegister, register );
router.post('/login', validateFieldsLogin, login );
router.get('/renew', validateJWT ,revalidateToken);

export default router;