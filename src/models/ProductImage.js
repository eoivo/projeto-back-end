const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Product = require('./Product');

class ProductImage extends Model {}

ProductImage.init(
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
        model: 'Products', 
        key: 'id',
      },
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'ProductImage',
    timestamps: true,
  }
);


ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductImage;
