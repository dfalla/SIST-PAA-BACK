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
    age:{
        type: DataTypes.INTEGER,
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
    type_document: {
        type: DataTypes.STRING,
        allowNull: false
    },
    document_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level:{
        type: DataTypes.STRING,
        allowNull: false
    },
    amount_payable:{
        type: DataTypes.INTEGER,
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
    date_admission: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
})