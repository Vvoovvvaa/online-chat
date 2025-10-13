import { Entity, Column, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user';
import { Message } from './message';
import { Base } from './base';

export enum ChatType {
  PRIVATE = 'private',
  GROUP = 'group',
}

@Entity()
export class Chat extends Base {
  @Column()
  name: string;

  @Column()
  @ManyToOne(()  => User,(user) => user.id)
  ownerId: number;
  

  @Column({ type: 'enum', enum: ChatType, default: ChatType.PRIVATE })
  type: ChatType;

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  members: User[];

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[];
}