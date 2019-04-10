const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    dest: path.resolve(__dirname, '..','..', 'public'),
    storage: multer.diskStorage({
        destination: (req,file,callback) => {
            // primeiro campo do callback é o erro
            callback(null, path.resolve(__dirname, '..','..','public'))
        },
        filename: (req,file,callback) => {
            // defininco o nome do arquivo

            // crypto é usado para gerar uma hash de prefixo, evitando sobreescrever o nome do arquivo na pasta public. Feito com random de tamanho 15 caracteres
            crypto.randomBytes(16, (err,hash) => {
                if(err) callback(err)

                // concatenando a hash criada pelo crypto, junto ao nome original do arquivo feito no upload pelo multer
                file.key = `${hash.toString('hex')}-${file.originalname}`

                callback(null, file.key)
            })
        }
    })
}