require('dotenv').config()
const Sequelize = require('sequelize')
const sales = require('../model/sales')

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
console.log('------------ connected to database')

sales.init(sequelize)

sales.showAllSales()
  .then((data) => {
    console.log(data[479].dataValues)
    const purpose = data[479].dataValues.purpose
    console.log(`purpose: ${purpose.replace(/\s+/g, '')}`)
  })
  .catch((err) => {
    console.log(err)
  })
