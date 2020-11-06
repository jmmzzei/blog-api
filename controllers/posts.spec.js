process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const { sequelize, posts, categories } = require('../models/index')

beforeAll(async () => {
  await sequelize
    .sync({ force: true })
    .then(() => {
      console.log(
        'Connection succesfully established with: ' +
          sequelize.getDatabaseName(),
      )
    })
    .then(() => {
      categories.bulkCreate([
        {
          id: 1,
          categoria: 'categoria test 1',
        },
        {
          id: 2,
          categoria: 'categoria test 2',
        },
        {
          id: 3,
          categoria: 'categoria test 3',
        },
      ])
    })
  await posts.bulkCreate([
    {
      titulo: 'titulo test',
      contenido: 'contenido',
      imagen: 'imagen.png',
      category_id: 2,
      fecha_creacion: '2020-04-05',
    },
    {
      titulo: 'titulo test',
      contenido: 'contenido',
      imagen: 'imagen.jpg',
      category_id: 1,
      fecha_creacion: '2020-08-09',
    },
    {
      titulo: 'titulo test',
      contenido: 'content',
      imagen: 'imagen2.gif',
      category_id: 3,
      fecha_creacion: '2020-11-09',
    },
  ])
})
describe('GET /posts ', () => {
  test('It should respond with posts', async () => {})
})

describe('GET /posts/:id ', () => {
  test('It should respond with a single post', async () => {})
})

describe('POST /posts', () => {
  test('It should save a new post', async () => {})
})

describe('PATCH /posts/:id ', () => {
  test('It should update an existing post', async () => {})
})

describe('DELETE /posts/:id ', () => {
  test('It should delete a post', async () => {})
})

afterAll(async () => {
  await sequelize.close().then(() => {
    console.log('DB CLOSED')
  })
})
