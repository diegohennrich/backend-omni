const mongoose = require('mongoose')

// segundo parametro do schema timestamps para salvar o create time e o update time do registro

const File = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    },
    {
    timestamps: true,

    // ao fazer toObject e toJSON, toda vez que esse dado for transformado para um objeto ou json, ele irá adicionar os campos virtuals
    toObject: { virtuals: true},
    toJSON: { virtuals: true}
    }
)

// campo virtual. Não existe no banco de dados, mas é criado para ajudar o front
// função de callback não pode ser feito com arrow function, pois dessa forma ele não consegue acessar o "this" da instância
File.virtual('url').get(function(){

    const uri = process.env.URL || 'http://localhost:3000'
    // encodeUriComponent concatena o path na string para formar o link da imagem
    return `${uri}/files/${encodeURIComponent(this.path)}`
})

module.exports = mongoose.model('File', File)