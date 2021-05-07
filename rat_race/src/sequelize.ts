import { Sequelize } from 'sequelize';

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



export default sequelize;