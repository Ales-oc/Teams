/** Importaciones */
const { Router } = require('express');
const router = Router();

/** Controladores */
const userController = require('../controllers/user.controller')

router.post('/register', userController.saveUser);
router.post('/login', userController.validateLogin);
router.get('/users', userController.getUsers);
router.get('/user', userController.getUser);
router.get('/current', userController.getCurrent);
router.get('/current-roles', userController.getCurrentRoles);
router.get('/by-rol', userController.getByRol)

module.exports = router;
