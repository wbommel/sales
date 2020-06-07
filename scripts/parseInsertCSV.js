require('dotenv').config()
const Sequelize = require('sequelize')
const moment = require('moment')
const sales = require('../model/sales')

const parse = require('csv-parse/lib/sync')
const path = require('path')
const fs = require('fs').promises
const options = {
  delimiter: ';',
  columns: true,
  from_line: 11,
  skip_lines_with_error: true
}

async function readFile () {
  const content = await fs.readFile(path.join(__dirname, '../resources/umsaetze-3653560-2020-01-18-17-59-13_08.05.2019-16.01.2020.csv'), 'utf8')
  return content
}

async function startImport () {
  readFile().then(async (data) => {
    // console.log(data.toString())
    const records = parse(data.toString(), {
      delimiter: ';',
      from_line: 12,
      skip_lines_with_error: true
    })
    console.log(records)
    console.log(records.length)
    await writeRecordsToDB(records)
  })
}

async function writeRecordsToDB (records) {
  // console.log(records)

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

  for await (const record of records) {
    console.log(record)
    sales.createNewInstance({
      dateOfValue: moment(record[0], 'DD.MM.YYYY'),
      creditValueDate: moment(record[1], 'DD.MM.YYYY'),
      purpose: record[2].replace(/\s\s+/g, ' '),
      value: parseFloat(record[3]),
      currency: record[4]
    })
  }
}

startImport()
