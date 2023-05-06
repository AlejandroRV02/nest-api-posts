import { Comment } from "src/comments/domain/comment.entity";
import { User } from "src/users/domain/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true, nullable: true })
	external_id: number;

	@Column()
	title: string;

	@Column()
	body: string

	@ManyToOne(() => User, (user) => user.posts, { eager: true })
	user: User

	@OneToMany(() => Comment, (comment) => comment.post, { eager: true })
	comments: Comment[]
}