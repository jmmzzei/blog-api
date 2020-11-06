module.exports = (sequelize, type) => {
  const postModel = sequelize.define(
    'post',
    {},

    { timestamps: false, tableName: 'posts' },
  )
  return postModel
}
