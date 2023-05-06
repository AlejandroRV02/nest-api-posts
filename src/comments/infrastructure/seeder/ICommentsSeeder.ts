import { Post } from "src/posts/domain/post.entity";

export abstract class ICommentsSeeder {
	abstract setComments(posts: Post[]);
}