import { DataTypes } from "sequelize"

export const MESSAGES = {
    student: {
        msg_exits: 'Ya existe un alumno registrado con el número de documento:',
        msg_no_exits: 'No existe un un alumno con el id:',
        msg_created_successfully: 'Alumno registrado exitosamente',
        msg_updated_successfully: 'Alumno actualizado exitosamente',
        msg_deleted_successfully: 'Alumno eliminado correctamente'
    },
    schedule: {
        msg_exits: 'La hora ya está cubierta',
        msg_no_exits: 'No existe el horario registrado:',
        created: 'Horario registrado correctamente',
        updated: 'Horario actualizado exitosamente',
        deleted: 'Horario eliminado exitosamente'
    },
    loan: {
        created: 'Préstamo registrado correctamente',
        deleted: 'Préstamo eliminado correctamente'
    }
}

export const SCHEDULE_ATTRIBUTE =  {
    schedule_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    hour: {
        type: DataTypes.STRING,
        allowNull: false
    },
    monday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tuesday:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    wednesday: {
        type: DataTypes.STRING,
        allowNull: true
    },
    thursday:{
        type: DataTypes.STRING,
        allowNull: true
    },
    friday:{
        type: DataTypes.STRING,
        allowNull: true
    },
    saturday: {
        type: DataTypes.STRING,
        allowNull: true
    },
}

export const GROUPS_LEVELS = {
    group_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    student_last_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    student_document_number:{
        type: DataTypes.STRING,
        allowNull: true
    },
}