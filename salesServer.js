require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD, {
    dialect: 'mysql'
  })
const salesmod = require('./model/sales')
salesmod.defineModel(sequelize).sync()

const express = require('express')
const app = express()

app.use(express.json())

// const usersRouter = require('./routes/users')
// app.use('/users', usersRouter)

app.listen(process.env.SALES_SERVER_PORT, () => {
  console.log('listening on port ' + process.env.SALES_SERVER_PORT)
})
