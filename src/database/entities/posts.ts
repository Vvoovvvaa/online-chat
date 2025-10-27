import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Base, MediaFiles, User, Comments, Likes } from ".";

@Entity('posts')
export class Posts extends Base {
    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    user: User;

    @ManyToMany(() => MediaFiles, { cascade: true })
    @JoinTable({
        name: 'post_media_files',
        joinColumn: { name: 'post_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'media_file_id', referencedColumnName: 'id' },
    })
    mediaFiles: MediaFiles[];

    @OneToMany(() => Comments, (comment) => comment.post)
    comments: Comments[];

    @OneToMany(() => Likes, (like) => like.post)
    likes: Likes[];
}
