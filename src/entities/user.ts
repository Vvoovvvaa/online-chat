import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { Chat } from './chat';
import { Message } from './message';
import { Base } from './base';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @ManyToMany(() => Chat, (chat) => chat.members)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  secretCodes: any;

}