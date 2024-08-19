const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Product = require('./Product');
const Category = require('./Category');

class ProductCategory extends Model {}

ProductCategory.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', 
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories', 
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'ProductCategory',
    timestamps: true,
  }
);


ProductCategory.belongsTo(Product, { foreignKey: 'product_id' });
ProductCategory.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = ProductCategory;
