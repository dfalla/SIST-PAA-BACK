import {Request, Response} from 'express';
import { LOAN } from '../models'
import { MESSAGES } from '../constants';
import { convertToString, generateId } from '../helpers';

export const createLoan = async (req: Request, res: Response)=>{
    
    try {

        const {
            name, 
            last_name, 
            capital,
            money_delivery_date,
            payment_date,
            active
        } = req.body;

        try {
            const newActive = convertToString(active)
            const loan_id = generateId();
            await LOAN.create({
                loan_id,
                name:  name.split('')[0].toUpperCase() + name.slice(1), 
                last_name: last_name.split('')[0].toUpperCase() + last_name.slice(1), 
                capital,
                money_delivery_date,
                payment_date: `${payment_date}/M`,
                active: newActive

            })

            res.json({
                msg: `${MESSAGES.loan.created}`
            })

        } catch (error) {
            console.log("error", error)
            return error;
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

// export const getAllLoans = async (req: Request, res: Response)=>{

//     try {
//         const students = await G1NB.findAll();
//         return res.json({
//             students
//         });
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             error: 'Error de servidor hola'
//         });
//     }
// }

// export const deleteLoan = async (req: Request, res: Response)=>{

//     try {

//         const { id_student } = req.params;

//         const student = await G1NB.findByPk( id_student );

//         if ( !student) {
//             return res.status(404).json({
//                 msg: 'No existe un priducto con el id ' + id_student
//             });
//         }

//         await G1NB.destroy();


//         res.json({
//             msg: `${STUDENT_MESSAGES.msg_deleted_successfully}`,
//             student
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({error: 'Error de servidor'});
//     }
// }
