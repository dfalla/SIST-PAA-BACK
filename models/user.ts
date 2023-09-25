import { DataTypes } from 'sequelize';
import db from '../database/connection';

//     user_id VARCHAR(50) PRIMARY KEY,
//     name VARCHAR(20) NOT NULL,
//     last_name VARCHAR(20) NOT NULL,
//     mother_last_name VARCHAR(20) NOT NULL,
//     username VARCHAR(20) UNIQUE NOT NULL,
//     password TEXT NOT NULL,
//     image TEXT,
//     image_public_id TEXT,
//     active BOOLEAN NOT NULL,
//     rol CHAR(3),
//     date_created DATETIME NOT NULL,
//     date_update DATETIME NOT NULL

export const User = db.define('users', {
    user_id: {
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
    mother_last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
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
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_created: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, )