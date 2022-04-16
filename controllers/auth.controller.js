const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/User');

const { generarJWT } = require('../helpers/jwt-generator');

const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar si el email existe
    const user = await Usuario.findOne({ email });
    
    if ( !user ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - email'
      });
    }

    // Si el usuario está activo
    if ( !user.state ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado'
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if ( !validPassword ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      });
    }

    // General el JWT
    const token = await generarJWT( user.id );

    res.json({
      user,
      token
    });

  } catch(error) {
    
    console.log(error);
    
    return res.status(500).json({
      msg: 'Hable con el administrador'
    });

  }
};

module.exports = { login }