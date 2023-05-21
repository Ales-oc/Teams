/** Importaciones */
const { async } = require('rxjs');
const token = require('../services/token');

/** Modelos */
const Project = require('../models/project');
const { ObjectId } = require('mongodb');

/** Creamos el objeto del controlador */
const projectController = {};

projectController.createProject = async (req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })

    const { nombre, cliente, manager, version } = req.body.project;
    const project = await Project.findOne({nombre});

    if (project) return res.status(409).json({
      'status': 'Nombre de proyecto ya registrado'
    })

    const newProject = new Project({
      nombre,
      cliente,
      manager,
      version
    });

    await newProject.save();

    res.status(200).json({
      'status': 'Proyecto insertado',
      newProject,
    });

  } catch(err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        'error': `Invalid token, ${err.message}`,
      })
    } else {
      res.status(500).json({
        'error': err.message,
      })
    }
  } finally {
    res.end()
  }
};

projectController.getProjects = async (req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })

    const projects = await Project.find();
    res.json({ projects });

  } catch(err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        'error': `Invalid token, ${err.message}`,
      })
    } else {
      res.status(500).json({
        'error': err.message,
      })
    }
  } finally {
    res.end()
  }
}

projectController.getProject = async (req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })

    const id = req.query.id;
    const project = await Project.findOne({_id: new ObjectId(id)})

    res.status(200).json({
      'status': 'Project found',
      project
    });
  } catch(err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        'error': `Invalid token, ${err.message}`,
      })
    } else {
      res.status(500).json({
        'error': err.message,
      })
    }
  } finally {
    res.end()
  }
}

projectController.getFilterProjects = async (req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied'
    })

    const nombre = req.query.nombre;
    const manager = req.query.manager;
    const cliente = req.query.cliente;
    const query = Project.find();

    if (nombre) {
      query.find({nombre: nombre});
    }

    if (manager) {
      query.find({manager: manager});
    }

    if (cliente) {
      query.find({cliente: cliente});
    }

    const projects = await query.exec();

    res.status(200).json({
      'status': 'Project/s found',
      projects
    });
  } catch(err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({
        'error': `Invalid token, ${err.message}`,
      })
    } else {
      res.status(500).json({
        'error': err.message,
      })
    }
  } finally {
    res.end()
  }
}

module.exports = projectController;
