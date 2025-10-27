import { Entity, Column, ManyToOne } from 'typeorm';
import { Chat,User,Base } from '.';

@Entity()
export class Message extends Base {
  @Column()
  text: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  chat: Chat;
}