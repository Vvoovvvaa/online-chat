import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Base, Likes, Posts, User } from '.'


@Entity('comments')
export class Comments extends Base {

    @Column()
    text: string;


    @ManyToOne(() => Posts, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Posts;


    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    author: User;

    @OneToMany(() => Likes, (like) => like.comment)
    likes: Likes[];

}