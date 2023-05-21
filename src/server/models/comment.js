const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    createdAt: { type: String, default: `${new Date().getHours()}:${new Date().getMinutes()}, ${new Date().getDate()} ${new Date().toDateString().split(" ")[1]}` },
    message: { type: String }
  }
)

module.exports = model('comment', commentSchema);
