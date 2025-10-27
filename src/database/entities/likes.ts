import { Entity, ManyToOne } from 'typeorm';
import { User,Comments,Posts,Base} from '.'

@Entity('likes')
export class Likes extends Base {
  @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Posts, (post) => post.likes, { nullable: true, onDelete: 'CASCADE' })
  post: Posts;

  @ManyToOne(() => Comments, (comment) => comment.likes, { nullable: true, onDelete: 'CASCADE' })
  comment: Comments;
}
