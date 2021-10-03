const { Router } = require('express');
const { check } = require('express-validator');

const { getUser,
    putUser,
    postUser,
    deleteUser, 
    patchUser
} = require('../controllers/user.controller.js');

const { fieldsValidator } = require('../middlewares/fields-validator.js');
const { isValidRole, emailExists, userExistsById } = require('../helpers/db-validators.js');

const router = Router();

router.get( '/', getUser );

router.put( '/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( isValidRole ),
    fieldsValidator
], putUser );

router.post( '/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener más de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExists ),
    // check('role', 'Rol inválido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    fieldsValidator
],postUser );

router.delete( '/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    fieldsValidator
], deleteUser );

router.patch( '/', patchUser );

module.exports = router;