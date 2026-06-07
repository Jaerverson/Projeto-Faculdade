import { DataTypes } from 'sequelize';
import sequelize from '../database/db.js';

const Livro = sequelize.define('Livro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ano_publicacao: {
    type: DataTypes.INTEGER
  },
  quantidade: {
    type: DataTypes.INTEGER
  },
  autor_id: {
    type: DataTypes.INTEGER
  },
  capa: {
    type: DataTypes.STRING
  },
  categoria: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'livros',
  timestamps: false
});

export default Livro;