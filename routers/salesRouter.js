'use strict'
const express = require('express')
const router = express.Router()
const Sales = require('../model/sales')
const moment = require('moment')
const { gt, lte, ne, in: opIn, between } = require('sequelize').Op

router.get('/id/:id', _getSale, (req, res) => {
  res.json(res.sale)
})

router.get('/monthly/:year/:month', _getMonthlySales, (req, res) => {
  res.json(res.results)
})

async function _getMonthlySales (req, res, next) {
  const lastDayOfMonth = moment(req.params.year + '/' + req.params.month, 'YYYY/MM').daysInMonth()
  const startDate = moment(req.params.month + '/01/' + req.params.year, 'MM/DD/YYYY')
  const endDate = moment(req.params.month + '/' + lastDayOfMonth + '/' + req.params.year, 'MM/DD/YYYY')

  Sales.init(res.app.get('sequelize'))
  const salesmod = Sales.defineModel()
  let results
  try {
    results = await salesmod.findAll({
      where: {
        dateOfValue: {
          [between]: [startDate, endDate]
        }
      }
    })
    if (results == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.results = results
  next()
}

async function _getSale (req, res, next) {
  Sales.init(res.app.get('sequelize'))
  const salesmod = Sales.defineModel()
  let sale
  try {
    sale = await salesmod.findByPk(req.params.id)
    if (sale == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.sale = sale
  next()
}

module.exports = router
