const { sequelize, posts, categories } = require('../models/index')

async function populateCategories(dbType) {
  dbType = dbType ? dbType : ''
  try {
    const response = await categories.bulkCreate([
      {
        id: 1,
        categoria: `categoria ${dbType} 1`,
      },
      {
        id: 2,
        categoria: `categoria ${dbType} 2`,
      },
      {
        id: 3,
        categoria: `categoria ${dbType} 3`,
      },
    ])
    if (response.length == 3) {
      return new Promise((resolve, reject) => {
        resolve(true)
      })
    }
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject(new Error(e))
    })
  }
}

module.exports = populateCategories
