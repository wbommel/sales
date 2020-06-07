require('dotenv').config()

/**
 * connect to server without specifying database
 */
console.log('------------ connecting to server')
const Sequelize = require('sequelize')
let sequelize = new Sequelize('', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 15,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
console.log('------------ connected to server')

/**
 * import model definitions
 */
const sales = require('../model/sales')
const salesBudgetPortions = require('../model/salesBudgetPortions')
const monthlyBudgets = require('../model/monthlyBudgets')
const runningCosts = require('../model/runningCosts')
const settlementPeriods = require('../model/settlementPeriods')

console.log('------------ connecting to database')
sequelize.queryInterface.dropDatabase(process.env.DATABASE_NAME).then((data) => {
  console.log(data)
  sequelize.queryInterface.createDatabase(process.env.DATABASE_NAME).then((data) => {
    console.log(data)

    // close server connection and connect to newly created database
    sequelize.close().then(() => {
      sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
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

      console.log('------------ creating table sales')
      async function createSales () {
        console.log('--------------- before calling create table sales')
        await sales.init(sequelize)
        await sales.defineModel().sync()
        console.log('--------------- after calling create table sales')
      }
      createSales()
      console.log('------------ created table sales')

      console.log('------------ creating table salesBudgetPortions')
      async function createSalesBudgetPortions () {
        console.log('--------------- before calling create table salesBudgetPortions')
        await salesBudgetPortions.createModel(sequelize).sync()
        console.log('--------------- after calling create table salesBudgetPortions')
      }
      createSalesBudgetPortions()
      console.log('------------ created table salesBudgetPortions')

      console.log('------------ creating table monthlyBudgets')
      async function createMonthlyBudgets () {
        console.log('--------------- before calling create table monthlyBudgets')
        await monthlyBudgets.createModel(sequelize).sync()
        console.log('--------------- after calling create table monthlyBudgets')
      }
      createMonthlyBudgets()
      console.log('------------ created table monthlyBudgets')

      console.log('------------ creating table runningCosts')
      async function createRunningCosts () {
        console.log('--------------- before calling create table runningCosts')
        await runningCosts.createModel(sequelize).sync()
        console.log('--------------- after calling create table runningCosts')
      }
      createRunningCosts()
      console.log('------------ created table runningCosts')

      console.log('------------ creating table settlementPeriods')
      async function createSettlementPeriods () {
        console.log('--------------- before calling create table settlementPeriods')
        await settlementPeriods.createModel(sequelize).sync()
        console.log('--------------- after calling create table settlementPeriods')
        console.log('--------------- before bulk create settlement periods')
        await sequelize.models.settlementPeriods.bulkCreate([
          { divider: 1, description: 'monthly' },
          { divider: 2, description: 'bimonthly' },
          { divider: 3, description: 'quarterly' },
          { divider: 6, description: 'semiannually' },
          { divider: 12, description: 'annually' }
        ])
        console.log('--------------- after bulk create settlement periods')
      }
      createSettlementPeriods()
      console.log('------------ created table settlementPeriods')
    })
  })
})
