import { Sequelize } from 'sequelize';
import { modelInit } from './models/Modelnit';

export const url = process.env.DEV === 'true' ? 'postgres://example:example@localhost:5432/postgres' : 'postgres://example:example@db/postgres';

const sequelize = new Sequelize(url);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
testConnection();
modelInit(sequelize);


export default sequelize;