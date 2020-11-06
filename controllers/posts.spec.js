process.env.NODE_ENV = 'test'
const app = require('../app')
const request = require('supertest')
const { sequelize, posts, categories } = require('../models/index')

beforeAll(async () => {
  await sequelize.sync({ force: true }).then(() => {
    console.log(
      'Connection succesfully established with: ' + sequelize.getDatabaseName(),
    )
  })
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
