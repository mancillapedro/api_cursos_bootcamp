const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle
  }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./user.model')(sequelize, Sequelize)
db.bootcamps = require('./bootcamp.model')(sequelize, Sequelize)

db.users.belongsToMany(db.bootcamps, {
  through: "user_bootcamp",
  as: "bootcamps",
  foreignKey: "user_id",
});
db.bootcamps.belongsToMany(db.users, {
  through: "user_bootcamp",
  as: "users",
  foreignKey: "bootcamp_id",
});

db.bootcamps.addScope('includeUsers', {
  include: {
    model: db.users,
    as: "users",
    attributes: ["id", "firstName", "lastName"],
    through: { attributes: [] }
  }
})

db.users.addScope('includeBootcamps', {
  include: {
    model: db.bootcamps,
    as: "bootcamps",
    attributes: ["id", "title"],
    through: { attributes: [] }
  }
})

module.exports = db