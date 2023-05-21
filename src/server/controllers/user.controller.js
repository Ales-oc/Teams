/** Importaciones */
const { async } = require('rxjs');
const token = require('../services/token');
const encryptor = require('../services/encryptor');

/** Modelos */
const User = require('../models/user');
const { ObjectId } = require('mongodb');

/** Creamos el objeto del controlador */
const userController = {};

userController.getUsers = async (req, res) => {

  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })

    const users = await User.find();
    res.json({ users });

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

userController.getCurrent = async(req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })

    const userId = new ObjectId(verifiedToken.sub);
    const user = await User.findById(userId);

    res.status(200).json({
      'status': 'User found',
      user
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

userController.getCurrentRoles = async(req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })

    const userRoles = verifiedToken.roles;

    res.status(200).json({
      userRoles
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

userController.getByRol = async(req, res) => {
  try {
    if (!req.get('Authorization')) return res.status(401).json({
      'status': 'Access Denied',
    })

    const reqToken = req.get('Authorization').split(" ")[1];
    const verifiedToken = token.decodeToken(reqToken);

    if (!verifiedToken) return res.status(401).json({
      'status': 'Access Denied',
    })

    const rol = req.query.rol;
    const users = await User.find({roles: rol})

    res.status(200).json({
      'status': 'User/s found',
      users
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

userController.getUser = async (req, res) => {
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
    const user = await User.findOne({_id: new ObjectId(id)})

    res.status(200).json({
      'status': 'User found',
      user
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

userController.saveUser = async (req, res) => {
  try {
    const { nombre, email, password, roles } = req.body.user;
    const user = await User.findOne({email});

    if (user) return res.status(409).json({
      'status': 'Correo ya registrado'
    })

    const encryptedPass = encryptor.encrypt(password);
    const newUser = new User({
      nombre,
      email,
      "password": encryptedPass,
      roles
    });

    await newUser.save();

    const newToken = token.createToken(newUser);

    res.status(200).json({
      'status': 'User saved',
      newUser,
      newToken
    });
  } catch (err) {
    res.status(500).json({
      'error': err.message,
    })
  } finally {
    res.end()
  }
}

userController.validateLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({email});

    if (!user || !encryptor.compare(password, user.password))
      return res.status(404).json({
        error: "User not found"
      });

    const newToken = token.createToken(user);

    res.status(200).json({
      'status': 'Correct user',
      newToken
    });
  } catch (err) {
    res.status(500).json({
      'error': err.message,
    })
  } finally {
    res.end()
  }
}

module.exports = userController;

