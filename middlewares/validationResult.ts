import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';

const validateFields = (req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult( req );
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.mapped()
        });
    }

    next();
}

export {
    validateFields, 
    check
}