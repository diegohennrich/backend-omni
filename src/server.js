const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const app = express()
const APP_PORT = process.env.PORT || 3000


//conexao com o mongoDB remoto
mongoose.connect('mongodb+srv://omni:omni@cluster0-ra8bi.mongodb.net/omni?retryWrites=true', { useNewUrlParser: true})

// serve para permitir que qualquer aplicação acesse o backend
app.use(cors())

// middleware para todas às vezes que acessarem a rota /files, ele pega os arquivos estáticos da public
app.use('/files', express.static(path.resolve(__dirname,'..','public')))

// acessar json
app.use(express.json())

 // usado para enviar arquivos na requisicao
app.use(express.urlencoded({ extended : true }))


// carrega as rotas da aplicacao em outro arquivo
app.use(require('./routes'))

app.listen(APP_PORT, () => console.log(`Rodando o servidor na porta ${APP_PORT}`))