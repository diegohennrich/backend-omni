const FileModel = require('../models/File')
const Box = require('../models/Box')

class File {
    async store(req,res) {
        const { file, params } = req
        const { id_box } = params

        const box = await Box.findById(id_box)

        const arquivo = await FileModel.create({
            title: file.originalname,
            path: file.key
        })

        // inserindo o novo arquivo lá dentro do files da collection Box  
        box.files.push(arquivo)

        await box.save();
        
        res.json(arquivo)
    }
}

module.exports = new File()