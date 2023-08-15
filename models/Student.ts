import { DataTypes } from 'sequelize';
import db from '../database/connection';

export const Student = db.define('students', {
    id_student: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mother_last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true, 

    },
    image_public_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // admission_date: {
    //     type: DataTypes.DATE,
    //     allowNull: false
    // }
}, {
    freezeTableName: true
})