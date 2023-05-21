const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const Message = require('./message');

const chatRoomSchema = new Schema(
  {
    room_name: { type: String, required: true, unique: true },
    messages: { type: [Message.schema], required: true},
  },
  {
    timestamps: true
  }
);

module.exports = model('chatRoom', chatRoomSchema);
