'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = {
  createModel: (sequelize) => {
    sequelize.define('salesBudgetPortions', {
      salesBudgetPortionsId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      monthlyBudgetId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      salesId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false
      },
      valuePortion: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: ''
      },
      categoryId: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    })

    return sequelize
  }
}
