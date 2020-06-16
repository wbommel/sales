require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD, {
    dialect: 'mysql'
  })

/** prepare models */
const salesModel = require('./model/sales').init(sequelize).defineModel()

/** create application */
const express = require('express')
const app = express()

/** apply settings */
app.set('sequelize', sequelize)
app.set('salesModel', salesModel)

/** configure application */
app.use(express.json())

/** create routes */
const salesRouter = require('./routers/salesRouter')
app.use('/sales', salesRouter)

/** start server */
app.listen(process.env.SALES_SERVER_PORT, () => {
  console.log('listening on port ' + process.env.SALES_SERVER_PORT)
})
