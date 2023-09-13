import {Request, Response} from 'express';
import { SCHEDULE } from '../models'
import { generateId } from '../helpers';


export const createSchedule = async (req: Request, res: Response)=>{
    
    try {

        const {
            hour,
            monday, 
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
        } = req.body;

        
        console.log("schedule", {
            hour,
            monday, 
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
        });

        const id_schedule = generateId();


        try {
            const existSchedule = await SCHEDULE.findOne({
                where: {
                    hour
                }
            })

            if(existSchedule){
                return res.status(400).json({
                    msg: `La hora ya está cubierta`
                });
            }

        
            await SCHEDULE.create({
                id_schedule,
                hour,
                monday, 
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday
            })

            res.json({
                msg: `Horario registrado correctamente`
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

export const getSchedules = async (req: Request, res: Response)=>{

    try {
        const schedules = await SCHEDULE.findAll();

        console.log("schedules", schedules)
        return res.json({
            schedules
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Error de servidor hola'
        });
    }
}

export const getSchedule = async (req: Request, res: Response)=>{
    try {
        const { id_schedule } = req.params;
        const { schedule } = req.query;

        const SCHEDULE = scheduleConfirm(schedule?.toString()!);
        const scheduleInBD = await SCHEDULE.findByPk(id_schedule);

        if(!scheduleInBD) {
             return res.status(404).json({
                error: "No existe el alumno"
            });
        }

        return res.json({
            scheduleInBD
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: 'Error de servidor'
        });
    }
}

export const updateSchedule = async (req: Request, res: Response)=>{
    try {
        
        const {id_schedule} = req.params;
        const {
            monday, 
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
        } = req.body;

        const scheduleInBD = await SCHEDULE.findByPk(id_schedule);

        if(!scheduleInBD){
            return res.status(404).json({
                msg: `no existe el horario con el id: ${id_schedule}`,
            });
        }

        await scheduleInBD.update( 
            {
                monday, 
                tuesday,
                wednesday,
                thursday,
                friday,
                saturday,
            }, 
            { 
                where: {
                    id_schedule,
                }
            }
        );

        res.json( {
            msg: `horario actualizado correctamente`,
            scheduleInBD
        } );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const deleteSchedule = async (req: Request, res: Response)=>{
    try {

        const { id_schedule } = req.params;

        const scheduleInBD = await SCHEDULE.findByPk( id_schedule );
        if ( !scheduleInBD) {
            return res.status(404).json({
                msg: 'No existe un horario con el id ' + id_schedule
            });
        }

        await scheduleInBD.destroy();

        res.json({
            msg: `Horario eliminado correctamente`,
            scheduleInBD
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Error de servidor'});
    }
}