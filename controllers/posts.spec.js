process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models/index')
const populateCategories = require('../helpers/populateCategories')
const populatePosts = require('../helpers/populatePosts')

beforeAll(async () => {
  try {
    await sequelize
      .sync({ force: true })
      .then(() => {
        console.log(
          'Connection succesfully established with: ' +
            sequelize.getDatabaseName(),
        )
      })
      .catch(() => {
        console.log('Cannot connect')
      })
    await populateCategories('test')
    await populatePosts('test')
  } catch (e) {
    throw new Error(e)
  }
})

describe('GET /posts ', () => {
  test('It should respond with posts', async () => {
    const response = await request(app).get('/posts/')
    expect(response.statusCode).toBe(200)
    expect(response.body.data.length).toBeGreaterThanOrEqual(1)
    expect(response.body.data[0]).toHaveProperty('id')
    expect(response.body.data[0].id > response.body.data[1].id).toBe(true)
  })
})

describe('GET /posts/:id ', () => {
  test('It should respond with a single post', async () => {
    const response = await request(app).get('/posts/1')
    expect(response.statusCode).toBe(200)
    expect(typeof response.body.data).toBe('object')
    expect(response.body.data).toHaveProperty('id')
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
    expect(response.body.data).toHaveProperty('titulo')
  })
})

describe('PATCH /posts/:id ', () => {
  test('It should update an existing post', async () => {
    const response = await request(app).patch('/posts/1').send({
      titulo: 'PATCH',
      contenido: 'contenido',
      imagen: 'imageqqn.jpg',
      category_id: 2,
      fecha_creacion: '2020-04-05',
    })
    expect(response.body.data).toEqual([1])
  })
})

describe('DELETE /posts/:id ', () => {
  test('It should delete a post', async () => {
    const priorPosts = await request(app).get('/posts')
    const lengthPriorPosts = priorPosts.body.data.length

    const response = await request(app).delete('/posts/2')
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(1)

    const posts = await request(app).get('/posts')
    expect(posts.body.data.length).toBe(lengthPriorPosts - 1)
  })
})

afterAll(async () => {
  await sequelize.close().then(() => {
    console.log('DB CLOSED')
  })
})
