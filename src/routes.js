const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router()
const boxController = require('./controllers/Box')
const fileController = require('./controllers/File')

routes.post('/boxes', boxController.store)
routes.get('/boxes/:id_box', boxController.show)

routes.post('/boxes/:id_box/files', 
    multer(multerConfig).single('file'),
    fileController.store)


module.exports = routes