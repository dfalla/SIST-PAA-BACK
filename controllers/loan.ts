import {Request, Response} from 'express';
import { LOAN } from '../models'
import { MESSAGES } from '../constants';
import { convertToString, generateId } from '../helpers';
import moment from 'moment';

export const createLoan = async (req: Request, res: Response)=>{
    
    try {

        const {
            name, 
            last_name, 
            capital,
            money_delivery_date,
            active
        } = req.body;

        const payment_date = moment(money_delivery_date, "DD/MM/YYYY").date()
        
        try {
            const newActive = convertToString(active)
            const loan_id = generateId();
            await LOAN.create({
                loan_id,
                name:  name.split('')[0].toUpperCase() + name.slice(1), 
                last_name: last_name.split('')[0].toUpperCase() + last_name.slice(1), 
                capital,
                interest: capital * 0.2 ,
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

export const getAllLoans = async (req: Request, res: Response)=>{

    try {
        const loans = await LOAN.findAll();
        return res.json({
            loans
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Error del servidor'
        });
    }
}

export const deleteLoan = async (req: Request, res: Response)=>{

    try {

        const { id_loan } = req.params;

        const loan = await LOAN.findByPk( id_loan );

        if ( !loan) {
            return res.status(404).json({
                msg: 'No existe un préstamo con el id ' + id_loan
            });
        }

        await loan.destroy();


        res.json({
            msg: `${MESSAGES.loan.deleted}`,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error de servidor'});
    }
}
