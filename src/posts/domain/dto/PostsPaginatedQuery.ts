import { Post } from "src/posts/domain/post.entity";

export class PostsPaginatedDto {
	posts: Post[]
	count: number
}