import { User } from "./user.interface";
import { Project } from "./project.interface"
import { Comment } from './comment.interface';

export interface Tarea {
  _id?: string,
  nombre:string,
  proyecto: Project,
  programmers: [User],
  state: string,
  comments: [Comment],
  deadline: string,
  createdAt: string,
  updateAt: string
}
