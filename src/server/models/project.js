const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    cliente: { type: String, required: true},
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    version: { type: String, required: true },
    createdAt: { type: String, default: `${new Date().getHours()}:${new Date().getMinutes()}, ${new Date().getDate()} ${new Date().toDateString().split(" ")[1]} ${new Date().getFullYear()}`}
  }
);

module.exports = model('project', projectSchema);
