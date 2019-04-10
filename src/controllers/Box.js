const BoxModel = require('../models/Box')

class novaBox {
    async store(req,res){
        const { body } = req
        const box = await BoxModel.create({ title: body.title })
        res.json(box) 
    }

    async show(req,res){
        const { params } = req
        const { id_box } = params

        // populate serve para mostrar todos os arquivos do files
        const box = await BoxModel.findById(id_box).populate({
            path: 'files',
            options: {
                // posso ordenar e pedir o files por order decrescente
                sort: {
                    createdAt: -1
                }
            }
        })
        res.json(box)
    }
}

module.exports = new novaBox()
// exportar com o 'new' para já instanciar e acessar os métodos da classe novaBox