import {Request, Response} from 'express';
import { Student } from '../models'
import { deleteImage, uploadImage } from '../libs/cloudinary';
import fs from 'fs-extra';
import { generateId } from '../helpers';

export const createStudent = async (req: Request, res: Response)=>{
    
    try {

        const {name, last_name, dni, mother_last_name} = req.body;

        const id_student = generateId();

        let image;
        let image_public_id;

        try {
            const existeProducto = await Student.findOne({
                where: {
                    dni
                }
            })

            if(existeProducto){
                return res.status(400).json({
                    msg: `Ya existe un alumno registrado con ese dni: ${dni}`
                });
            }

            if(req.files === null){
                await Student.create({
                    id_student,
                    dni,
                    name,
                    last_name,
                    mother_last_name,
                })

            } else {

                const result = await uploadImage(req.files!.imagen.tempFilePath);
               
                await fs.remove(req.files!.imagen.tempFilePath);
    
                image = result.secure_url;
    
                image_public_id = result.public_id;

                await Student.create({
                    id_student,
                    dni,
                    name,
                    last_name,
                    mother_last_name,
                    image,
                    image_public_id,
                    
                })
            }

            res.json({
                msg: `Alumno registrado exitosamente!`
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