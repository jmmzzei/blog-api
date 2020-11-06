const express = require('express')
const router = express.Router()
const post = require('../controllers/posts')

router.get('/', post.getAll)
router.get('/:id', post.getById)
router.post('/', post.create)
router.patch('/:id', post.edit)
router.delete('/:id', post.delete)

module.exports = router
