import jwt from 'jsonwebtoken';

interface Args{
    uid: string;
    name: string;
}

export const generateJWT =  ({uid, name}: Args) => {

    return  new Promise( (resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED || 'P4nu31054L4183', {
            expiresIn: '744h'
        }, (err, token) => {
            if( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            }

            resolve( token );
        })
    })
}
