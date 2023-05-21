const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Comment = require('./comment')

const tareaSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true },
    programmers: { type: [mongoose.Schema.Types.ObjectId], ref: 'user', default: [] },
    state: { type: String, default: "Sin comenzar" },
    comments: { type: [Comment.schema], default: []},
    deadline: { type: String, required: true },
    createdAt: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}` },
    updateAt: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}` },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', default: undefined},
  }
)

module.exports = model('tarea', tareaSchema);
