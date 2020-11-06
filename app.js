require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { sequelize, posts, categories } = require('./models/index')
const compression = require('compression')
const helmet = require('helmet')
const postRoutes = require('./routes/posts')
const app = express()

app.set('port', 4000)
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/posts', postRoutes)

if (
  process.env.NODE_ENV &&
  process.env.NODE_ENV !== 'development' &&
  process.env.NODE_ENV !== 'test'
) {
  app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname })
  })
}

if (process.env.NODE_ENV !== 'test') {
  sequelize
    .sync({ force: true })
    // .sync()
    .then(() => {
      console.log(
        'Connection succesfully established with: ' +
          sequelize.getDatabaseName(),
      )
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
}

module.exports = app
