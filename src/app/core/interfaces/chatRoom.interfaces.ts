import { Message } from "./message.interface"

export interface ChatRoom {
  _id?: string
  room_name: string
  messages: [Message]
}
