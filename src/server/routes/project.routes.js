/** Importaciones */
const { Router } = require('express');
const router = Router();

/** Controladores */
const projectController = require('../controllers/project.controller');

router.post('/new', projectController.createProject);
router.get('/all', projectController.getProjects);
router.get('/project', projectController.getProject);
router.get('/filter', projectController.getFilterProjects)

module.exports = router;
