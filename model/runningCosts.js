'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = {
  createModel: (sequelize) => {
    sequelize.define('runningCosts', {
      runningCostsId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      active: {
        type: DataTypes.BOOLEAN,
        comment: 'Tell if the entry is currently active or not. It might be an old rent of a place where you aren\'t even living anymore.'
      },
      description: {
        type: DataTypes.STRING(255),
        comment: 'Describe the running cost, i.e. rent, car insurance, telephone/internet costs, ...'
      },
      categoryId: {
        type: DataTypes.BIGINT,
        comment: 'Give the Id of a category in the category table.'
      },
      variableValue: {
        type: DataTypes.BOOLEAN,
        comment: 'Tell if the cost has a variable value or not.'
      },
      settlementPeriodId: {
        type: DataTypes.BIGINT,
        comment: 'Give the Id of a settlement period in the settlement period table.'
      },
      detectionString: {
        type: DataTypes.STRING(255),
        comment: 'Supply a string expression to find a sales entry by checking against the purpose field.'
      },
      invoiceValue: {
        type: DataTypes.DECIMAL(10, 2),
        comment: 'Give the complete value of the invoice, i.e. 400€ for a semiannually car insurance.'
      },
      monthlyValue: {
        type: DataTypes.DECIMAL(10, 2),
        comment: 'This field will be calculated by dividing the invoice value by the divider of the settlement periods table.'
      },
      standingOrderActive: {
        type: DataTypes.BOOLEAN,
        comment: 'Tell if there is a manual standing order for certain entries. Informational only.'
      },
      standingOrderValue: {
        type: DataTypes.DECIMAL(10, 2),
        comment: 'Give the value of the standing order.'
      }
    })

    return sequelize
  }
}
