import { Post } from "src/posts/domain/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	password: string

	@OneToMany(() => Post, (post) => post.user)
	posts: Post[]
}