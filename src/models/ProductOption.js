const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Product = require('./Product');

class ProductOption extends Model {}

ProductOption.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Product', 
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shape: {
      type: DataTypes.ENUM('square', 'circle'),
      defaultValue: 'square',
    },
    radius: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.ENUM('text', 'color'),
      defaultValue: 'text',
    },
    values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProductOption',
    timestamps: true,
  }
);


ProductOption.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductOption;
