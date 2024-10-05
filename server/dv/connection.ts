import { Sequelize } from 'sequelize';
import { dbConnection}  from './config';

// Use @ts-ignore to ignore the TypeScript error temporarily
// @ts-ignore
const dbSequelize = new Sequelize(dbConnection.localDev);

const syncOptions = { alter: false, force: false };

dbSequelize.sync(syncOptions).then(() => {
    console.log('Database synchronized without altering tables.');
}).catch((error) => {
    console.error('Error synchronizing database:', error);
});


export default dbSequelize