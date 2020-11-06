const { sequelize, posts, categories } = require('../models/index')

async function populatePosts(dbType) {
  dbType = dbType ? dbType : ''
  try {
    const response = await posts.bulkCreate([
      {
        titulo: `titulo1 ${dbType}`,
        contenido: 'contenido',
        imagen: 'imagen.png',
        category_id: 2,
        fecha_creacion: '2020-04-05',
      },
      {
        titulo: `titulo2 ${dbType}`,
        contenido: 'contenido',
        imagen: 'imagen.jpg',
        category_id: 1,
        fecha_creacion: '2020-08-09',
      },
      {
        titulo: `titulo3 ${dbType}`,
        contenido: 'content',
        imagen: 'imagen2.gif',
        category_id: 3,
        fecha_creacion: '2020-11-09',
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

module.exports = populatePosts
