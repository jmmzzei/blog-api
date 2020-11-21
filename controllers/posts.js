let postModel = require('../models/index')['posts']
let sequelize = require('../models/index')['sequelize']
let SUCCESS = 'success'
let ERROR = 'error'

exports.getAll = async (req, res) => {
  try {
    let posts = await postModel.findAll({
      attributes: ['id', 'titulo', 'imagen', 'category_id', 'fecha_creacion'],
      order: [['fecha_creacion', 'DESC']],
    })
    return res.json({ status: SUCCESS, data: posts })
  } catch (error) {
    return res.json({ status: ERROR, message: error.message })
  }
}

exports.getById = async (req, res) => {
  try {
    let post = await postModel.findByPk(req.params.id)
    return res.json({ status: SUCCESS, data: post })
  } catch (error) {
    return res.json({ status: ERROR, message: error.message })
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
    return res.json({ status: SUCCESS, data: post })
  } catch (error) {
    return res.json({ status: ERROR, message: error.message })
  }
}

exports.delete = async (req, res) => {
  try {
    const post = await postModel.destroy({
      where: {
        id: req.params.id,
      },
    })
    return res.json({ status: SUCCESS, data: post })
  } catch (error) {
    return res.json({ status: ERROR, message: error.message })
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
    return res.json({ status: SUCCESS, data: post })
  } catch (error) {
    return res.json({ status: ERROR, message: error.message })
  }
}
