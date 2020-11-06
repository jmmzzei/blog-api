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
  test('It should respond with posts', async () => {
    const response = await request(app).get('/posts/')
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].id > response.body[1].id).toBe(true)
  })
})

describe('GET /posts/:id ', () => {
  test('It should respond with a single post', async () => {
    const response = await request(app).get('/posts/1')
    expect(response.statusCode).toBe(200)
    expect(typeof response.body).toBe('object')
    expect(response.body).toHaveProperty('id')
  })
})

describe('POST /posts', () => {
  test('It should save a new post', async () => {
    const response = await request(app).post('/posts').send({
      titulo: 'POST',
      contenido: 'content',
      imagen: 'imagen3.png',
      category_id: 1,
      fecha_creacion: '2020-11-09',
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('titulo')
  })
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
