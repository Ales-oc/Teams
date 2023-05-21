/** Importaciones */
const { async } = require('rxjs');
const token = require('../services/token');

/** Modelos */
const Tarea = require('../models/tarea');
const { ObjectId } = require('mongodb');

/** Creamos el objeto del controlador */
const tareaController = {};

tareaController.createTarea = async (req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })
    const nombre = req.body.nombre;
    const proyecto = req.body.proyecto;
    const programmers = req.body.programmers;
    const deadline = req.body.deadline;

    console.log(programmers);

    const tarea = await Tarea.findOne({nombre});

    if (tarea) return res.status(409).json({
      'status': 'Nombre de tarea ya registrado'
    })

    const newTask = new Tarea({
      nombre,
      proyecto,
      programmers,
      deadline
    });



    await newTask.save();

    res.status(200).json({
      'status': 'Tarea insertada',
      newTask,
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

tareaController.getTarea = async (req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })
    const tareaId = new ObjectId(req.query.id);
    const tarea = await Tarea.findById({_id: tareaId});

    res.status(200).json({
      'status': 'Tarea/s found',
      tarea,
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

tareaController.getTareasProyecto = async (req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })
    const proyecto = req.query.proyecto;
    const proyectoId = new ObjectId(proyecto);
    const tareas = await Tarea.find({proyecto: proyectoId});

    res.status(200).json({
      'status': 'Tarea/s found',
      tareas,
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

tareaController.asignarTarea = async (req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })
    const programador = new ObjectId(req.body.prog_id);
    const tareaId = req.body.tarea_id;
    //let tarea = await Tarea.findById({_id: tareaId})
    const tarea = await Tarea.updateOne(
      {
        _id: tareaId
      },
      {
        $push: { programmers: programador }
      }
    );

    res.status(200).json({
      'status': 'Tarea updated',
      tarea,
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

module.exports = tareaController;
