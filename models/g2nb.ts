import { DataTypes } from 'sequelize';
import db from '../database/connection';

export const G2NB = db.define('g2nb', {
    student_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    student_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    student_last_name:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    student_document_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true
})