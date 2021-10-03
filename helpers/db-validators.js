const Role = require('../models/Role.js');
const User = require('../models/User.js');

const isValidRole = async (role = '') => {
    const roleExists = await Role.findOne({ role });
    if ( !roleExists ) {
        throw new Error(`El rol ${ role } no está registrado en la BD`);
    }
};

const emailExists = async (email = '') => {
    const emailExists = await User.findOne({ email });
    if ( emailExists ) {
        throw new Error(`El correo: ${ email } ya se encuentra registrado`);
    }
}

const userExistsById = async ( id ) => {
    const userExists = await User.findById( id );
    if ( !userExists ) {
        throw new Error(`El id no existe`);
    }
};

module.exports = {
    isValidRole,
    emailExists,
    userExistsById
}
