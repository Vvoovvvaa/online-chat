import { Entity, Column, OneToMany } from 'typeorm';

import { Base } from './base';
import { ChatMember } from './chat-members';
import { Message } from './message';

@Entity('users')
export class User extends Base {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  phone: string;

  @OneToMany(() => ChatMember, (m) => m.user)
  chatMemberships: ChatMember[];

  @OneToMany(() => Message, (m) => m.sender)
  messages: Message[];
}
