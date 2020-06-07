'use strict'
const DataTypes = require('sequelize').DataTypes

module.exports = {
  createModel: (sequelize) => {
    sequelize.define('settlementPeriods', {
      settlementPeriodId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      divider: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'Serves the divider of the entry, i.e. a value of six means that the invoice would come semiannually and would be divided by six to determine the monthly value.'
      },
      description: {
        type: DataTypes.STRING(16),
        allowNull: false,
        comment: 'Describes the entry, i.e. a divider of 12 is described as annually.'
      }
    })

    return sequelize
  }
}

/**
 * fix table for factorizing running costs
 *
 * divider - description
 * --------------------
 *   1     - monthly
 *   2     - bimonthly
 *   3     - quarterly
 *   6     - semiannually
 *  12     - annually
 *
 * examples:
 * a quarterly cost for your car insurance would be divided
 * by 3 to let you know how much money you have to save each
 * month.
 * an annual cost would be divided by 12 respectively
 */
