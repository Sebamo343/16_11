const express = require('express')
const router = express.Router()
const userModel = require ('../models/userModels')

router.post('/register', 
            async(req, res)=>{
                const {name, email, password, role } = req.body
                try {
                    const user = 
                    await userModel.create({name, email, role, password})
            res
                .status(201)
                .json({
                    sucess: true,
                    msg: "user successfully registred",
                    token: user.ObtenerJWT()
                })
                } catch (error) {
                    res
                        .status(400)
                        .json({
                            sucess: false,
                            message: error.message
                        })
                    
                }

})

router.post('/login',
        async(req, res)=>{
        //desestruturacion:
        //- objetos
        //- arreglos
        const{email, password} = req.body;
        //no hay email o password
        if (!email || !password) {
            res.
                status(400).
                json({
                    success:false,
                    message: "debe ingresar email o password"
                })
        }else{
            try {
                //entontrar usuario que tenga el email
                const user = await userModel.findOne({email}).select("+password")
                if(!user){
                    res.
                    status(400).
                    json({
                        success:false,
                        message: "no se encontro el usuario"
                    })
                }else{
                    //utilizar el metodo de comparar el email
                    const isMatch = await user
                                    .comparePassword(password)
                    if(!isMatch){
                        res.status(400).json({
                            success: false,
                            msg:"contraseña incorrecta"
                        })
                    }else{
                        res.status(201).json({
                            success: true,
                            msg:"contraseña correcta"
                        })
                    }
                }
                
            } catch (error) {
                
            }
        }
})
module.exports = router