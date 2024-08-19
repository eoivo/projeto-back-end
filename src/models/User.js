const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database'); 

class User extends Model {
 
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password); 
  }
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true, 
  }
);


User.beforeCreate(async (user) => {
  user.password = await User.hashPassword(user.password);
});

module.exports = User;
