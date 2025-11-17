import { Entity, Column, OneToMany, ManyToMany, JoinTable, OneToOne} from 'typeorm';
import { Chat, Message, Base, MediaFiles, Posts, Comments, Likes, UserSecurity } from '.';
import { Confidencial } from '../enums/private-account-enum';
import { accauntStatus } from '../enums/user-accaunt-status';

@Entity("User")
export class User extends Base {
  @Column({nullable:true})
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ unique: true,nullable:true })
  phone: string;

  @Column({ nullable: true })
  age: number;

  @Column({unique: true,nullable:true})
  email:string

  @Column({nullable:true,unique:true})
  facebookId:string

  @ManyToMany(() => Chat, (chat) => chat.members)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  secretCodes: any;

  @ManyToMany(() => User)
  @JoinTable({ name: 'Friends' })
  friends: User[];

  @ManyToMany(() => MediaFiles, { cascade: true })
  @JoinTable({
    name: 'user_media_files',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_file_id', referencedColumnName: 'id' },
  })
  mediaFiles: MediaFiles[];

  @Column({ default: Confidencial.PUBLIC })
  isPrivate?: Confidencial;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.author)
  comments: Comments[];

  @OneToMany(() => Likes, (like) => like.user)
  likes: Likes[];

  @Column({ default: accauntStatus.ACTIVE })
  accountStatus: accauntStatus;

  @OneToOne(() => UserSecurity, (security) => security.user)
  security: UserSecurity;
}
