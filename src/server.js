const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const app = express()
const APP_PORT = process.env.PORT || 3000

// server para que nosso servidor acesse tanto requisicoes http pelo express quanto protocolo ws do socket
const server = require('http').Server(app)
const io = require('socket.io')(server)


// socket é a conexao real time com o meu usuario
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box)
    })
})

//conexao com o mongoDB remoto
mongoose.connect('mongodb+srv://omni:omni@cluster0-ra8bi.mongodb.net/omni?retryWrites=true', { useNewUrlParser: true})

// serve para permitir que qualquer aplicação acesse o backend
app.use(cors())

// middleware para todas às vezes que acessarem a rota /files, ele pega os arquivos estáticos da public
app.use('/files', express.static(path.resolve(__dirname,'..','public')))

// acessar json
app.use(express.json())


// middleware para determinar que req.io é igual ao objeto do socket io
app.use((req,res,next) => {
    req.io = io

    return next() // server para passar a request para frente
})

 // usado para enviar arquivos na requisicao
app.use(express.urlencoded({ extended : true }))


// carrega as rotas da aplicacao em outro arquivo
app.use(require('./routes'))

server.listen(APP_PORT, () => console.log(`Rodando o servidor na porta ${APP_PORT}`))