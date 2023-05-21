const ChatRoom = require('../models/chatRoom');
const { Server } = require('socket.io');
const { async } = require('rxjs');
const { ObjectId } = require('mongodb');

let socketServer;

const socket = {};

let receiver;

/** Función para obtener el documento Chat Room de la base de datos */
const getChatRoom = async (roomName) => {
  const chatRoom = await ChatRoom.findOne({room_name: roomName})
  return (chatRoom);
}

socket.connect = server => {
  socketServer = new Server(server, {
    cors: {
      origin: "http://localhost:4200"
    }
  });

  /** Evento de conexión */
  socketServer.on('connection', currentSocket => {
    console.log('Usuario conectado al servidor Socket');

    /** Evento de desconexión */
    currentSocket.on('disconnect', () => {
      console.log('Usuario desconectado del servidor Socket');
    });

    currentSocket.on("join", async room => {
      receiver = room.receiver_id;
      currentSocket.join(room.roomName);

      const chatRoom = await getChatRoom(room.roomName)
      console.log(chatRoom);
      socketServer.to(room.roomName).emit('joined', chatRoom);
    });

    /** Evento de mensaje */
    currentSocket.on('message', msg => {
      console.log(msg);
      console.log(`Nuevo mensaje: ${msg.msg}`);
      socketServer.to(msg.roomName).emit('message', msg.user, msg.msg);
      saveMessage(msg.roomName, msg.user, msg.msg);
    })
  });
}

/** Función para guardar los mensajes de una chat room determinada */
const saveMessage = async (roomName, emitter, message) => {
  const chatRoom = await getChatRoom(roomName);
  const newMsg = {
    emitter_id: emitter,
    message: message,
    receiver_id: receiver
  }
  console.log(newMsg);
  if (chatRoom) {
    //Hay datos, actualizamos el documento
    await ChatRoom.updateOne(
      {
        _id: chatRoom._id
      },
      {
        messages: [...chatRoom.messages, newMsg]
      }
    )
  } else {
    //No hay datos, guardamos un nuevo documento
    await new ChatRoom({
      room_name: roomName,
      messages: [newMsg]
    }).save()
  }
}

module.exports = socket;


