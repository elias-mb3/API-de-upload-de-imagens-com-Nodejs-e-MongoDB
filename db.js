//Conectando ao mongoDB Altas com as chaves no arquivo .env

const mongoose = require('mongoose')

require('dotenv').config()

mongoose.set('strictQuery', true)

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.muj154v.mongodb.net/?retryWrites=true&w=majority`)
    console.log('Conectado ao banco')
}

main().catch((err) => console.log(err))

module.exports = main