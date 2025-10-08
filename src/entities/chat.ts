import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './base';
import { ChatMember } from './chat-members';
import { Message } from './message';

@Entity('chats')
export class Chat extends Base {
  @Column({ nullable: true })
  name: string;

  @Column({ default: false })
  isGroup: boolean;

  @OneToMany(() => ChatMember, (m) => m.chat, { cascade: true })
  members: ChatMember[];

  @OneToMany(() => Message, (m) => m.chat)
  messages: Message[];
}
