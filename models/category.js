module.exports = (sequelize, type) => {
  const categoryModel = sequelize.define(
    'category',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
      },
      categoria:{
        type: type.STRING(120),
        allowNull: false,
      },
    },
    { timestamps: false,
      tableName: 'categories'
    },
  )
  return categoryModel
}
