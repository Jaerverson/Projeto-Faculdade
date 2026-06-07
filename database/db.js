import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'biblioteca', // nome do banco
  'root',       // usuário
  '123456',  // senha do MySQL
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

export default sequelize;