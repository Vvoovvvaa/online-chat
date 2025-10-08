import { Entity, ManyToOne, Column, Unique } from 'typeorm';
import { Base } from './base';
import { Chat } from './chat';
import { User } from './user';

@Entity('chat_members')
export class ChatMember extends Base {
  @ManyToOne(() => Chat, (c) => c.members, { onDelete: 'CASCADE' })
  chat: Chat;

  @ManyToOne(() => User, (u) => u.chatMemberships, { onDelete: 'CASCADE' })
  user: User;
}
