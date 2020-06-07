'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = {
  createModel: (sequelize) => {
    sequelize.define('monthlyBudgets', {
      monthlyBudgetId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      runningCostId: {
        type: DataTypes.BIGINT,
        comment: 'Serves as a back-pointer to an entry in the running costs table.'
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'The year of this monthly budget.'
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'The month of this monthly budget.'
      },
      description: {
        type: DataTypes.STRING(255),
        comment: 'Description of this monthly budget taken from the running cost entry.'
      },
      categoryId: {
        type: DataTypes.INTEGER,
        comment: 'tThe Id of a category in the category table. Taken from the running cost entry.'
      },
      estimatedValue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: 'The value that was chosen from the running cost entry when this monthly budget entry was generated.'
      },
      detectionString: {
        type: DataTypes.STRING(255),
        comment: 'A string expression to find a sales entry by checking against the purpose field. Taken from the running cost entry.'
      }
    })

    return sequelize
  }
}
