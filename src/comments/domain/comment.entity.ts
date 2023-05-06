import { Post } from "src/posts/domain/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true, nullable: true })
	external_id: number;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	body: string;

	@ManyToOne(() => Post, (post) => post.comments)
	post: Post
}