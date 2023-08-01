import { Request, Response} from 'express';
import bcrypt from 'bcrypt';
import { generateId, generateJWT } from '../helpers';
import { User } from '../models';


export const register = async (req: Request, res: Response) => {

    const { name, lastName, username, password } = req.body;
    const id_user = generateId();

    console.log({ id_user, name, lastName, username, password });

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
        const newUser = await User.create({
            id_user,
            name, 
            lastName,
            username,
            password: hashedPassword
        })

        const token = await generateJWT({uid: newUser.dataValues.id_user, name: newUser.dataValues.name});

        res.json({
            msg: `Usuario ${username} creado exitosamente!`,
            nombre: newUser.dataValues.name,
            apellido: newUser.dataValues.lastName,
            token
        })
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
        id: user.id_user,
        nombre: user.name,
        apellido: user.lastName,
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