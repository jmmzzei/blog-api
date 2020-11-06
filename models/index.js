const { Sequelize, DataTypes } = require('sequelize')
const postModel = require('./post')
const categoryModel = require('./category')

const sequelize = new Sequelize(
  process.env.NODE_ENV == 'test'
    ? process.env.MYSQL_TEST_DB
    : process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  },
)

const posts = postModel(sequelize, DataTypes)
const categories = categoryModel(sequelize, DataTypes)

categories.hasMany(posts, {
  foreignKey: {
    allowNull: false,
    name: 'category_id',
  },
})

posts.belongsTo(categories, {
  foreignKey: {
    name: 'category_id',
  },
})

module.exports = { sequelize, posts, categories }
