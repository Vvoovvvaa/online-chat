import { Entity, Column, ManyToOne } from 'typeorm';

import { Base } from './base';
import { Chat } from './chat';
import { User } from './user';

@Entity('messages')
export class Message extends Base {
  @ManyToOne(() => Chat, (c) => c.messages, { onDelete: 'CASCADE' })
  chat: Chat;

  @ManyToOne(() => User, (u) => u.messages, { eager: true })
  sender: User;

  @Column('text')
  content: string;
}
