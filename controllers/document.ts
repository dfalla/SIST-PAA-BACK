import {Request, Response} from 'express';
import { TypeDocument } from '../models'



export const getTypesDocument = async (req: Request, res: Response)=>{

    try {
        const typesDocument = await TypeDocument.findAll();
        return res.json({
            typesDocument
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error
        });
    }
}


