import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import fs from 'fs-extra';
import { generateId, generateJWT, getFecha } from '../helpers';
import { User } from '../models';
import { uploadImage } from '../libs/cloudinary';


export const register = async (req: Request, res: Response) => {

    const { 
        name,
        lastName,
        motherLastName,
        username,
        password,
        active,
        role
    } = req.body;
    
    const user_id = generateId();

    const { fecha } = getFecha();
    console.log("fecha", fecha);

    let image;
    let image_public_id;

    // Validamos si el usuario ya existe en la base de datos
    const user = await User.findOne({ where: { username: username } });

    if(user) {
       return res.status(400).json({
            msg: `Ya existe un usuario ${username}`
        })
    } 
 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        // Guardarmos usuario en la base de datos
        if(req.files === null){
           const newUser = await User.create({
                user_id,
                name,
                last_name: lastName,
                mother_last_name: motherLastName,
                username,
                password: hashedPassword,
                active,
                role,
                date_created: fecha
            })
            
            const token = await generateJWT({uid: newUser.dataValues.id_user, name: newUser.dataValues.name});
            
            res.json({
                    msg: `Usuario ${username} creado exitosamente!`,
                    nombre: newUser.dataValues.name,
                    apellido: newUser.dataValues.lastName,
                    token
                })
        } else {
            const result = await uploadImage(req.files!.image.tempFilePath);
               
            await fs.remove(req.files!.image.tempFilePath);
            
            image = result.secure_url;
    
            image_public_id = result.public_id;

            const newUser = await User.create({
                user_id,
                name,
                last_name: lastName,
                mother_last_name: motherLastName,
                username,
                password: hashedPassword,
                image,
                image_public_id,
                active: active === 'true' ? true : false,
                role,
                date_created: fecha
            })

            const token = await generateJWT({uid: newUser.dataValues.id_user, name: newUser.dataValues.name});
            
            res.json({
                    msg: `Usuario ${username} creado exitosamente!`,
                    nombre: newUser.dataValues.name,
                    apellido: newUser.dataValues.lastName,
                    token
                })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            status: 500,
            msg: 'Por favor hable con el administrador'
        })
    }
}


export const login = async (req: Request, res: Response) => {

    const { username, password } = req.body;

   // Validamos si el usuario existe en la base de datos
   try {
    const user: any = await User.findOne({ where: { username: username } });

   if(!user) {
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base datos`
        })
   }

   // Validamos password
   const passwordValid = await bcrypt.compare(password, user.password)
   if(!passwordValid) {
    return res.status(400).json({
        msg: `Password Incorrecta`
    })
   }

   // Generamos token
   const token = await generateJWT({uid: user.id, name: user.name});
   
    res.json({
        msg: 'Usuario Logueado',
        id_user: user.id_user,
        name: user.name,
        lastName: user.lastName,
        token
    })
   } catch (error) {
    console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
   }
}

export const revalidateToken = async(req: Request, res: Response) => {

    const { uid, name } = req.body;

    //generar un nuevo JWT y retornarlo en esta peticion
    const token = await generateJWT({uid, name});

    res.json({
        ok: true, 
        name,
        uid,
        token
        
    })
}