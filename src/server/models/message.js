const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const messageSchema = new Schema(
  {
    emitter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    message: { type: String, required: true},
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    createdAt: { type: String, default: `${new Date().getHours()}:${new Date().getMinutes()}, ${new Date().getDate()} ${new Date().toDateString().split(" ")[1]}`}
  }
)

module.exports = model('message', messageSchema);
