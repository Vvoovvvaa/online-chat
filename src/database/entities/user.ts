import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Chat,Message,Base,MediaFiles,Posts,Comments, Likes } from '.';
import { Confidencial } from '../enums/private-account-enum';


@Entity("User")
export class User extends Base {
  @Column()
  name: string;

  @Column({nullable:true})
  LastName?: string

  @Column({ unique: true })
  phone: string;

  @Column({nullable:true})
  age:number

  @ManyToMany(() => Chat, (chat) => chat.members)
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  secretCodes: any;

  @ManyToMany(() => User)
  @JoinTable({name:'Friends'})
  friends:User[]

  @ManyToMany(() => MediaFiles, { cascade: true })
  @JoinTable({
    name: 'user_media_files',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_file_id', referencedColumnName: 'id' },
  })
  mediaFiles: MediaFiles[]

  @Column({default:Confidencial.PUBLIC})
  isPrivate?:Confidencial

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.author)
  comments: Comments[];

  @OneToMany(() => Likes, (like) => like.user)
  likes: Likes[];



}