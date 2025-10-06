import { Message } from "./message";

export interface ClientToServerListen{
    message:(message:Message)=>void
}

export interface ServerToClientListen{
    message:(message:Message)=>void
}