require('dotenv').config()
const Sequelize = require('sequelize')
const moment = require('moment')

/**
 * import model definitions
 */
const sales = require('../model/sales')
const salesBudgetPortions = require('../model/salesBudgetPortions')
const monthlyBudgets = require('../model/monthlyBudgets')
const runningCosts = require('../model/runningCosts')
const settlementPeriods = require('../model/settlementPeriods')

/**
 * connect to database
 */
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

sales.createNewInstance({
  dateOfValue: moment('12/31/2020', 'MM/DD/YYYY'),
  creditValueDate: moment('1/2/2021', 'MM/DD/YYYY'),
  purpose: 'purpose to test this 2',
  value: 234.56,
  currency: 'EUR'
})

console.log('All sales:')
sales.showAllSales().then((result) => {
  console.log(result)
})
