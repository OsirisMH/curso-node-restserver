const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controller');
const { fieldsValidator } = require('../middlewares/fields-validator');

const router = Router();

router.post( '/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatorio').not().isEmpty(),
  fieldsValidator,
], login );

router.post( '/google', [
  check('id_token', 'id_token es obligatorio').not().isEmpty(),
  fieldsValidator,
], googleSignIn );

module.exports = router;