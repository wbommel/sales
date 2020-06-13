'use strict'
const DataTypes = require('sequelize').DataTypes
const { gt, lte, ne, in: opIn, between } = require('sequelize').Op
let sequelize

module.exports = {
  init: (sequelizeInstance) => {
    sequelize = sequelizeInstance
    return this
  },
  defineModel: () => {
    return _defineModel()
  },
  createNewInstance: async (data, callback) => {
    if (sequelize === undefined) {
      console.log('sales object not initialized...')
    }
    if (sequelize.models.sales === undefined) { _defineModel() }

    await sequelize.models.sales.create({
      dateOfValue: data.dateOfValue,
      creditValueDate: data.creditValueDate,
      purpose: data.purpose,
      value: data.value,
      currency: data.currency
    }).then((sale) => {
      return sale
    })

    return null
  },
  showAllSales: async () => {
    if (sequelize === undefined) {
      console.log('sales object not initialized...')
    }
    if (sequelize.models.sales === undefined) { _defineModel() }

    const allSales = await sequelize.models.sales.findAll()

    return allSales
  }
}

function _defineModel () {
  if (sequelize === undefined) {
    console.log('sales object not initialized...')
    return null
  }

  sequelize.define('sales', {
    salesId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    dateOfValue: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: '(ger: Buchungstag) the day on which the order was placed'
    },
    creditValueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: '(ger: Wertstellungstag) the day when the order was executed'
    },
    purpose: {
      type: DataTypes.STRING(512),
      allowNull: false,
      comment: '(ger: Verwendungszweck) the purpose of the order'
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '(ger: Umsatz) the amount of money'
    },
    currency: {
      type: DataTypes.STRING(16),
      allowNull: false,
      comment: '(ger: Währung) the currency of the order'
    }
  })

  return sequelize.models.sales
}
