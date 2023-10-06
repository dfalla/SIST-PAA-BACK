import {Request, Response} from 'express';
import { Student } from '../models'
import { deleteImage, uploadImage } from '../libs/cloudinary';
import fs from 'fs-extra';
import { generateId, getFecha } from '../helpers';
import { STUDENT_MESSAGES } from '../constants';
import { convertToString } from '../helpers/convertToString';

export const createStudent = async (req: Request, res: Response)=>{
    
    try {

        const {
            name, 
            last_name, 
            mother_last_name, 
            type_document,
            document_number,
            address,
            age, 
            date_admission, 
            category,
            level,
            group_level,
            amount_payable,
            phone_number,
            active
        } = req.body;

        const student_id = generateId();
        const { fecha } = getFecha();
        const newActive = convertToString(active)

        console.log("req.body", req.body)


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
                    student_id,
                    name:  name.split('')[0].toUpperCase() + name.slice(1), 
                    age, 
                    last_name: last_name.split('')[0].toUpperCase() + last_name.slice(1), 
                    mother_last_name: mother_last_name.split('')[0].toUpperCase() + mother_last_name.slice(1), 
                    address,
                    type_document,
                    document_number,
                    phone_number,
                    level,
                    group_level,
                    amount_payable,
                    category,
                    active: newActive,
                    date_admission,
                })

            } else {

                const result = await uploadImage(req.files!.image.tempFilePath);
               
                await fs.remove(req.files!.image.tempFilePath);
    
                image = result.secure_url;
    
                image_public_id = result.public_id;

                await Student.create({
                    student_id,
                    name: name.split('')[0].toUpperCase() + name.slice(1), 
                    age, 
                    last_name: last_name.split('')[0].toUpperCase() + last_name.slice(1), 
                    mother_last_name: mother_last_name.split('')[0].toUpperCase() + mother_last_name.slice(1), 
                    address,
                    type_document,
                    document_number,
                    phone_number,
                    level,
                    group_level,
                    amount_payable,
                    category,
                    active: newActive,
                    date_admission,
                    image,
                    image_public_id,
                    
                })
            }

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

export const getStudents = async (req: Request, res: Response)=>{

    try {
        const filters: Record<string, any> = req.query;
        console.log("filters", filters)

        const whereClause: Record<string, any> = {};

        if (filters.active) whereClause.active = filters.active;
        if (filters.date_admission) whereClause.date_admission = filters.date_admission;
        if (filters.category) whereClause.category = filters.category;
        if (filters.level) whereClause.level = filters.level;
        if (filters.group_level) whereClause.group_level = filters.group_level;



        const students = await Student.findAll({where: whereClause});
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
            active,
            date_admission
        } = req.body;

        console.log("req.files", req.files);


        let image;
        let image_public_id;

        const student = await Student.findByPk(id_student);
        const newActive = convertToString(active)

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
                    active: newActive,
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
                    active: newActive,
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
