import { Sequelize } from 'sequelize';

const url = process.env.DEV === 'true' ? 'postgres://example:example@localhost:5432/postgres' : 'postgres://example:example@db/postgres';

const sequelize = new Sequelize(url); 

export default sequelize;