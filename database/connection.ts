import { Sequelize } from 'sequelize';

const db = new Sequelize('paa', 'root', '16falladapeta03', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    define:{
        timestamps: false
    }
});

export default db;