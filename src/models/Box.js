const mongoose = require('mongoose')

// segundo parametro do schema timestamps para salvar o create time e o update time do registro

const Box = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        // referencia que o schema do files será um array do model FILE
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
    },
    {
    timestamps: true
    }
)

module.exports = mongoose.model('Box', Box)