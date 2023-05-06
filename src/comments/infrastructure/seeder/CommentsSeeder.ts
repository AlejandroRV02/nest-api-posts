import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { Post } from "src/posts/domain/post.entity";
import { PostData } from "src/posts/domain/dto/PostData";
import { ICommentsSeeder } from "./ICommentsSeeder";
import { ICommentsAPIConsumer } from "../http/ICommentsAPIConsumer";
import { Comment } from "src/comments/domain/comment.entity";
import { CommentData } from "src/comments/domain/dto/CommentData";

export class CommentsSeeder implements ICommentsSeeder {

	constructor(
		@InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>,
		private readonly commentsConsumer: ICommentsAPIConsumer
	) { }

	async setComments(posts: Post[]) {
		const data: CommentData[] = await this.commentsConsumer.getComments();
		const comments: DeepPartial<Comment>[] = []
		data.forEach(comment => {
			comments.push({
				external_id: comment.id,
				body: comment.body,
				email: comment.email,
				name: comment.name,
				post: posts.find((post) => post.external_id === comment.postId)
			});
		});

		await this.commentsRepository.save(comments, { chunk: 100 });
	}

}