import { DataTypes } from 'sequelize';
import db from '../database/connection';

export const LOAN  = db.define('loans', {
    loan_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    capital:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    interest: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    money_delivery_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    times_created: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
    
}, {
    freezeTableName: true
})