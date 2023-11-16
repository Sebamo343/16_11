const  mongoose= require('mongoose')

//Estableer arxhivo .env del proyecto




//funhcion de conexion
async function conectDB (){
    const conn=  await mongoose.connect(process.env.MONGO_URL
        )
    console.log(`Conectado a mongo`.bgMagenta.blue)
}

module.exports = conectDB