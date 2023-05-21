/** Importaciones */
const { Router } = require('express');
const router = Router();

/** Controladores */
const tareaController = require('../controllers/tarea.controller');

router.post('/new', tareaController.createTarea);
router.get('/tarea', tareaController.getTarea);
router.get('/tareas', tareaController.getTareasProyecto);
router.put('/asignar', tareaController.asignarTarea);

module.exports = router;
