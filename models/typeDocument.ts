import { DataTypes } from 'sequelize';
import db from '../database/connection';

export const TypeDocument = db.define('types_document', {
    type_document_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    freezeTableName: true
})