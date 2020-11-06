module.exports = (sequelize, type) => {
  const postModel = sequelize.define(
    'post',
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: type.STRING(120),
        allowNull: false,
      },
      contenido: {
        type: type.TEXT,
        allowNull: false,
      },
      imagen: {
        type: type.STRING,
        allowNull: false,
      },
      fecha_creacion: {
        type: type.DATEONLY,
        defaultValue: sequelize.NOW,
        allowNull: false,
      },
    },
    { timestamps: false, tableName: 'posts' },
  )
  return postModel
}
