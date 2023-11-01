const Picture = require('../models/Picture')
const fs = require('fs')
//Enviar Imagens
exports.create = async (req,res) => {
    try {

        const {name} = req.body

        const file = req.file

        const picture = new Picture({
            name,
            src: file.path,
        })

        await picture.save()

        res.status(200).json({msg: 'Imagem salva com sucesso!'})

    } catch (error) {
        res.status(500).json({msg: 'Erro ao salvar imagem!'})
    }
}

//Pegar todas as imagens
exports.findAll = async (req,res) => {
    try {

        const pictures = await Picture.find()
        res.status(200).json(pictures)

    } catch (error) {
        res.status(500).json({msg: 'Erro ao buscar imagens'})
    
    }
}

exports.remove = async (req,res) => {
        
        const id = req.params.id
        const picture = await Picture.findOne({_id: id})
        
        if (!picture) {
            res.status(404).json({msg: 'Imagem não encontrada!'})
            return 
        }

    try {
        
        fs.unlinkSync(picture.src)

        await picture.deleteOne({_id: id})
        res.status(200).json({msg: "Imagem Removida com sucesso"})

    } catch (error) {
        res.status(500).json({msg: 'Erro ao buscar imagens'})
    
    }
}