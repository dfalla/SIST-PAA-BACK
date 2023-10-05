import {Request, Response} from 'express';
import { G4NB } from '../models'
import { STUDENT_MESSAGES } from '../constants';

export const AddStudentOfTheGroupFour = async (req: Request, res: Response)=>{
    
    try {

        const {
            student_id,
            name, 
            last_name, 
            document_number,
        } = req.body;

        try {
            const existStudent = await G4NB.findOne({
                where: {
                    document_number
                }
            })

            if(existStudent){
                return res.status(400).json({
                    msg: `${STUDENT_MESSAGES.msg_exits} ${document_number}`
                });
            }

            await G4NB.create({
                student_id,
                name:  name.split('')[0].toUpperCase() + name.slice(1), 
                last_name: last_name.split('')[0].toUpperCase() + last_name.slice(1), 
                document_number,
            })

            res.json({
                msg: `${STUDENT_MESSAGES.msg_created_successfully}`
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

export const getStudentsOfTheGroupFour = async (req: Request, res: Response)=>{

    try {
        const students = await G4NB.findAll();
        return res.json({
            students
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Error de servidor hola'
        });
    }
}

export const deleteStudentOfTheGroupFour = async (req: Request, res: Response)=>{

    try {

        const { id_student } = req.params;

        const student = await G4NB.findByPk( id_student );

        if ( !student) {
            return res.status(404).json({
                msg: 'No existe un priducto con el id ' + id_student
            });
        }

        await G4NB.destroy();


        res.json({
            msg: `${STUDENT_MESSAGES.msg_deleted_successfully}`,
            student
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error de servidor'});
    }
}
