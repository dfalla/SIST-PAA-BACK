import {Request, Response} from 'express';
import { Student } from '../models'
import { deleteImage, uploadImage } from '../libs/cloudinary';
import fs from 'fs-extra';
import { generateId } from '../helpers';
import { STUDENT_MESSAGES } from '../constants';

export const createStudent = async (req: Request, res: Response)=>{
    
    try {

        const {
            name, 
            age, 
            last_name, 
            mother_last_name, 
            address,
            type_document,
            document_number,
            phone_number,
            level,
            amount_payable,
            category,
            date_admission
        } = req.body;

        const id_student = generateId();

        let image;
        let image_public_id;

        try {
            const existStudent = await Student.findOne({
                where: {
                    document_number
                }
            })

            if(existStudent){
                return res.status(400).json({
                    msg: `${STUDENT_MESSAGES.msg_exits} ${document_number}`
                });
            }

            if(req.files === null){
                await Student.create({
                    id_student,
                    name, 
                    age, 
                    last_name, 
                    mother_last_name, 
                    address,
                    type_document,
                    document_number,
                    phone_number,
                    level,
                    amount_payable,
                    category,
                    date_admission
                })

            } else {

                const result = await uploadImage(req.files!.image.tempFilePath);
               
                await fs.remove(req.files!.image.tempFilePath);
    
                image = result.secure_url;
    
                image_public_id = result.public_id;

                await Student.create({
                    id_student,
                    name, 
                    age, 
                    last_name, 
                    mother_last_name, 
                    address,
                    type_document,
                    document_number,
                    phone_number,
                    level,
                    amount_payable,
                    category,
                    date_admission,
                    image,
                    image_public_id,
                    
                })
            }

            res.json({
                msg: `${STUDENT_MESSAGES.msg_created_successfully}`
            })

        } catch (error) {
            console.log(error)
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const getStudents = async (req: Request, res: Response)=>{

    try {
        const students = await Student.findAll();
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

export const getStudent = async (req: Request, res: Response)=>{
    try {
        const { id_student } = req.params;
        const student = await Student.findByPk(id_student);

        if(!student) {
             return res.status(404).json({
                error: "No existe el alumno"
            });
        }

        return res.json({
            student
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Error de servidor'
        });
    }

}

export const updateStudent = async (req: Request, res: Response)=>{
    try {
        
        const {id_student} = req.params;
        const {
            name, 
            age, 
            last_name, 
            mother_last_name, 
            address,
            type_document,
            document_number,
            phone_number,
            level,
            amount_payable,
            category,
            date_admission
        } = req.body;


        let image;
        let image_public_id;

        const student = await Student.findByPk(id_student);

        if(!student){
            return res.status(404).json({
                msg: `${STUDENT_MESSAGES.msg_no_exits} ${id_student}`,
            });
        }

        if(req.files === null){
            await student.update( 
                {
                    name, 
                    age, 
                    last_name, 
                    mother_last_name, 
                    address,
                    type_document,
                    document_number,
                    phone_number,
                    level,
                    amount_payable,
                    category,
                    date_admission
                }, 
                { 
                    where: {
                        id_student,
                    }
                }
            );
        } else {

            console.log("student.dataValues.image_public_id", student.dataValues.image_public_id)

            if(student.dataValues.image_public_id){
                await deleteImage(student.dataValues.image_public_id)
            }

            const result = await uploadImage(req.files!.image.tempFilePath);
            await fs.remove(req.files!.image.tempFilePath);
            image = result.secure_url;
            image_public_id = result.public_id;

            await student.update( 
                {
                    name, 
                    age, 
                    last_name, 
                    mother_last_name, 
                    address,
                    type_document,
                    document_number,
                    phone_number,
                    level,
                    amount_payable,
                    category,
                    date_admission,
                    image,
                    image_public_id,
                }, 
                { 
                    where: {
                        id_student,
                    }
                }
            );
        }

        res.json( {
            msg: `${STUDENT_MESSAGES.msg_updated_successfully}`,
            student
        } );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteStudent = async (req: Request, res: Response)=>{
    try {

        const { id_student } = req.params;

        const student = await Student.findByPk( id_student );
        if ( !student) {
            return res.status(404).json({
                msg: 'No existe un priducto con el id ' + id_student
            });
        }

        await student.destroy();

        await deleteImage(student.dataValues.image_public_id)

        res.json({
            msg: `${STUDENT_MESSAGES.msg_deleted_successfully}`,
            student
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error de servidor'});
    }
}