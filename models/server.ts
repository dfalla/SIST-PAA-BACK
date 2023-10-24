import express, { Application } from 'express';
import fileUpload from 'express-fileupload'
import cors from 'cors';
import db from '../database/connection';
import userRoutes from '../routes/auth';
import studentsRoutes from '../routes/student';
import scheduleRoutes from '../routes/schedule';
import typesDocument from '../routes/document';
import G1NBRoutes from '../routes/g1nb';
import G2NBRoutes from '../routes/g2nb';
import G3NBRoutes from '../routes/g3nb';
import G4NBRoutes from '../routes/g4nb';
import GABRoutes from '../routes/gab';
import GIRoutes from '../routes/gi';
import LoanRoutes from '../routes/loan';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth                    : '/api/auth',
        students                : '/api/students',
        schedule                : '/api/schedule',
        typesDocument           : '/api/types-document',
        g1nb                    : '/api/g1nb',
        g2nb                    : '/api/g2nb',
        g3nb                    : '/api/g3nb',
        g4nb                    : '/api/g4nb',
        gab                     : '/api/gab',
        gi                      : '/api/gi',
        loan                    : '/api/loans'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.listen();
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

    async dbConnection() {

        try {
            
            await db.authenticate();
            console.log('Base de datos conectada 😍');

        } catch (error) {
            console.log(error)
        }

    }

    routes() {
        this.app.use( this.apiPaths.auth, userRoutes );
        this.app.use( this.apiPaths.students, studentsRoutes );
        this.app.use( this.apiPaths.schedule, scheduleRoutes );
        this.app.use( this.apiPaths.typesDocument, typesDocument );
        this.app.use( this.apiPaths.g1nb, G1NBRoutes );
        this.app.use( this.apiPaths.g2nb, G2NBRoutes );
        this.app.use( this.apiPaths.g3nb, G3NBRoutes );
        this.app.use( this.apiPaths.g4nb, G4NBRoutes );
        this.app.use( this.apiPaths.gab, GABRoutes );
        this.app.use( this.apiPaths.gi, GIRoutes );
        this.app.use( this.apiPaths.loan, LoanRoutes );


    }

    middlewares() {
        this.app.use(fileUpload({
            useTempFiles: true, 
            tempFileDir: './upload',
        }))

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        this.app.use(express.urlencoded({extended: true}));

        // Carpeta pública
        this.app.use( express.static('public') );

    }

}

export default Server;