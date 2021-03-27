const { Sequelize, Model, DataTypes, where } = require('sequelize');
const db = require('./index');
const sequelize = db.sequelize;

class Cliente extends Model {}
Cliente.init({
  cedula: {
      type: DataTypes.STRING,
      primaryKey: true,
  },
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  fechaNacimiento: DataTypes.DATE,
  nHijos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  esFrecuente: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, { sequelize, modelName: 'cliente' });

let nuevoCliente = async (cliente)=>{
  await Cliente.create(cliente);
}
let getClientes = async ()=>{
  const clientes = await Cliente.findAll();
  return clientes;
}
let borrarCliente = async (cedula)=>{
  return await Cliente.destroy({
    where: {
      cedula: cedula
    }
  })
}
let actualizarCliente = async (cedula, cliente)=>{
  return await Cliente.update(cliente, {where : { cedula: cedula}})
}

let buscar = async(cedula)=>{
  const cliente = await Cliente.findByPk(cedula);
  return cliente;
}
(async () => {
  

  await sequelize.sync({ force: true });
  let cristian = await Cliente.create({
    cedula: '1003659966',
    nombre: 'Cristian',
    apellido: 'Ruiz',
    fechaNacimiento: new Date(1993, 11, 24),
    esFrecuente: false,
    nHijos: 1
  });


  //console.log(cliente.toJSON());

})();

module.exports = {
  nuevoCliente,
  getClientes,
  borrarCliente,
  actualizarCliente,
  buscar
}