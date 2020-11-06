let postModel = require('../models/index')['posts']
let sequelize = require('../models/index')['sequelize']

exports.getAll = async (req, res) => {
  try {
    let posts = await postModel.findAll({
      attributes: ['id', 'titulo', 'imagen', 'category_id', 'fecha_creacion'],
      order: [['fecha_creacion', 'DESC']],
    })
    return res.json(posts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

exports.getById = async (req, res) => {
  try {
    let post = await postModel.findByPk(req.params.id)
    res.json(post)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

exports.create = async (req, res) => {
  try {
    let { titulo, contenido, imagen, category_id, fecha_creacion } = req.body
    let post = await postModel.create({
      titulo: titulo,
      contenido: contenido,
      imagen: imagen,
      category_id: category_id,
      fecha_creacion: fecha_creacion,
    })
    res.json(post)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

exports.delete = async (req, res) => {
  try {
    const post = await postModel.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.json(post)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

exports.edit = async (req, res) => {
  try {
    let { titulo, contenido, imagen, category_id, fecha_creacion } = req.body
    let post = await postModel.update(
      {
        titulo: titulo,
        contenido: contenido,
        imagen: imagen,
        category_id: category_id,
        fecha_creacion: fecha_creacion,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    )
    res.json(post)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
