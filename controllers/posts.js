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

exports.getById = async (req, res) => {}
exports.create = async (req, res) => {}
exports.delete = async (req, res) => {}
exports.edit = async (req, res) => {}
