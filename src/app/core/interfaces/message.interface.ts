export interface Message {
  _id?: string
  emitter_id: string
  message: string[],
  receiver_id: string,
  createdAt?: string
}
