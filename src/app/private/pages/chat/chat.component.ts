import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

/** Models */
import { User } from '../../../core/interfaces/user.interface';
import { ChatRoom } from "../../../core/interfaces/chatRoom.interfaces";
import { Message } from 'src/app/core/interfaces/message.interface'

/** Services */
import { SocketService } from '../../services/socket.service';
import { UserService } from '../../../core/shared/services/user.service';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private chatRoom!: ChatRoom;
  private chatRoomName: String = "";
  public user!: User;
  public contact!: User;
  public contacts: User[] = [];
  public messages: Message[] = [];

  constructor(private socketService: SocketService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
    .subscribe({
      next: res => {
        console.log(res);
        this.user = res.user
      },
      complete: () => {
        this.getContacts();
      },
      error: err => {
        console.error(err);
      }
    })
    this.connectSockekt();
  }

  /** Obtenemos los usuarios de la base de datos para listarlos */
  getContacts() {
    this.userService.getUsers()
    .subscribe({
      next: res => {
        res.users.forEach((contact: User) => {
          if (this.user.nombre !== contact.nombre) {
            this.contacts.push(contact);
          }
        });
      },
      error: err => {
        console.error(err);
      }
    })
  }

  /** Nos conectamos al socket enviando el token de autenticación y
   * definimos como actuará este componente cuando reciba los eventos message y joined desde el socket
   */
  connectSockekt() {
    const token = sessionStorage.getItem("token");

    if (token) {
      this.socketService.connectSocket(token);

      this.socketService.subscribeToJoinRoom((err: any, chatRoom: any) => {
        if (err) {
          console.error(err);
        } else {
          if (chatRoom) {
            this.chatRoom = chatRoom;
            this.messages = this.chatRoom.messages;
            console.log(this.chatRoom.messages);
          } else {
            this.messages = [];
          }
        }
      })

      this.socketService.subscribeToMessages((err: any, user: any, msg: any) => {
        if (err) {
          console.error(err);
        } else {
          const newMessage: Message = {
            emitter_id: user,
            message: msg,
            receiver_id: this.contact._id!,
            createdAt: `${new Date().getHours()}:${new Date().getMinutes()}, ${new Date().getDate()} ${new Date().toDateString().split(" ")[1]}`
          }
          this.messages = [...this.messages, newMessage];
          console.log(this.messages);
        }
      });
    }
  }

  /** Cuando cambiamos el contacto se crea un nuevo nombre para la sala y se utiliza el método joinRoom
   * del sockekt service para enviar el evento join al socket y que el usuario entre en otra sala de chat
   */
  changeContact(contact: User) {
    this.contact = contact;
    const idsUsers = [this.user._id, this.contact._id].sort();

    this.chatRoomName = `${idsUsers[0]}:${idsUsers[1]}`;
    this.socketService.joinRoom(this.chatRoomName, this.user._id!, this.contact._id!);
  }

  onSubmit(form: NgForm){
    const mensaje = form.value.mensaje;
    form.controls['mensaje'].setValue("");

    if (mensaje) {
      this.socketService.sendMessage(mensaje, this.chatRoomName)
      form.value.mensaje = "";
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
