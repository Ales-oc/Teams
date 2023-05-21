import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { io } from 'socket.io-client'
import { User } from 'src/app/core/interfaces/user.interface';
import { environment } from '../../../environments/environment';
import { UserService } from '../../core/shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket!: any;
  private messages: String[] = []
  user_id!: String;

  constructor(private userService: UserService) {
    this.userService.getCurrentUser()
    .subscribe({
      next: res => {
        this.user_id = res.user._id;
      }
    })
  }

/** Método para conectarnos con el socket enviándole el token de autenticación */
  connectSocket(token: String) {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      auth: {
        token
      }
    });
  }

  // Metodo para esperar al evento 'message' del socket
  subscribeToMessages = (cb: any) => {
    if (!this.socket) return true;
    const subsMsg = this.socket.on('message', (user: any, msg: any) => {
      return cb(null, user, msg);
    });
    return subsMsg;
  }

  // Metodo para esperar al evento 'joined' del socket
  subscribeToJoinRoom = (cb: any) => {
    if (!this.socket) return true;
    const subsJoin = this.socket.on('joined', (chatRoom: any) => {
      return cb(null, chatRoom);
    });
    return subsJoin;
  }

  //emit event
  sendMessage(msg: String, roomName: String) {
    this.socket.emit('message', { msg, roomName, user: this.user_id });
  }

  joinRoom = (roomName: String, emitter_id: String, receiver_id: String) => {
    this.socket.emit('join', {roomName, emitter_id, receiver_id});
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
