import { InjectRepository } from "@nestjs/typeorm";
import { IPostsAPIConsumer } from "../http/IPostsAPIConsumer";
import { IPostsSeeder } from "./IPostsSeeder";
import { DeepPartial, Repository } from "typeorm";
import { Post } from "src/posts/domain/post.entity";
import { PostData } from "src/posts/domain/dto/PostData";
import { User } from "src/users/domain/user.entity";

export class PostsSeeder implements IPostsSeeder {

	constructor(
		@InjectRepository(Post) private readonly postsRepository: Repository<Post>,
		private readonly postsConsumer: IPostsAPIConsumer
	) { }

	async setPosts(users: User[]) {
		const data: PostData[] = await this.postsConsumer.getPosts();
		const posts: DeepPartial<Post>[] = []
		data.forEach(post => {
			posts.push({
				external_id: post.id,
				body: post.body,
				title: post.title,
				user: users.find((user) => user.id === post.userId)
			});
		});

		return await this.postsRepository.save(posts, { chunk: 100 });
	}

}