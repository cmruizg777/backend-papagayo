const { Sequelize, Model, DataTypes, where } = require('sequelize');
const db = require('./index');
const sequelize = db.sequelize;

const passwordHash = require('password-hash');
    

class User extends Model {}
User.init({
  username: {
      type: DataTypes.STRING,
      primaryKey: true,
  },
  password: DataTypes.STRING,
  token: DataTypes.STRING,
  nivel_acceso: DataTypes.INTEGER
}, { sequelize, modelName: 'user' });

let verificarUsuario = async (username)=>{
  const result = await User.findByPk(username);
  return result;
}
let verificarPassword = async(userPassword, passwordSent)=>{
  const isPassword = await passwordHash.verify(passwordSent, userPassword);
  return isPassword;
}
(async () => {
  
  await sequelize.sync({ force: true });
  let super_admin = await User.create({
    username: 'superadmin',
    password: passwordHash.generate('superadmin'),
    nivel_acceso: 3,
  });
  let admin = await User.create({
    username: 'admin',
    password: passwordHash.generate('admin'),
    nivel_acceso: 2,
  });
  let normal_user = await User.create({
    username: 'user01',
    password: passwordHash.generate('12341234'),
    nivel_acceso: 1,
  });
})();

module.exports = {
  verificarUsuario,
  verificarPassword
}