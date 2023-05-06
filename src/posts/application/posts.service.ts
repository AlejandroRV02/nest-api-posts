import { Injectable, NotFoundException } from "@nestjs/common";
import { IPostsService } from "./posts.service.interface";
import { Post } from "../domain/post.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetPostsPaginatedQuery } from "../domain/dto/GetPostsPaginated.dto";
import { PostsPaginatedDto } from "../domain/dto/PostsPaginatedQuery";
import { User } from "src/users/domain/user.entity";

@Injectable()
export class PostsService implements IPostsService {

	constructor(
		@InjectRepository(Post) private readonly postsRepository: Repository<Post>
	) { }

	async getPostsPaginated(query: GetPostsPaginatedQuery, user: User) {
		const [posts, count] = await this.postsRepository.findAndCount({
			where: { user },
			skip: query.skip * query.take,
			take: query.take
		})

		return { posts, count } as PostsPaginatedDto;
	}

	async getPostById(id: number, user: User): Promise<Post> {
		const post = await this.postsRepository.findOneBy({ external_id: id });

		if (!post || post.user.id !== user.id) throw new NotFoundException("Post not found");

		if (post.user.id == user.id) {
			delete post.user;
			return post;
		}
	}


	async updatePost(id: number, attrs: Partial<Post>, user: User): Promise<Post> {
		const post = await this.postsRepository.findOneBy({ external_id: id });

		if (!post || post.user.id !== user.id) throw new NotFoundException("Post not found");

		if (post.user.id == user.id) {
			Object.assign(post, attrs);
			return await this.postsRepository.save(post);
		}
	}


	async deletePost(id: number, user: User): Promise<void> {
		const post = await this.postsRepository.findOneBy({ external_id: id });

		if (!post || post.user.id !== user.id) throw new NotFoundException("Post not found");

		await this.postsRepository.remove(post);
	}

	async getPostByIdWithComments(id: number, user: User) {
		const post = await this.postsRepository.findOne({ where: { external_id: id }, relations: { comments: true } });

		if (!post || post.user.id !== user.id) throw new NotFoundException("Post not found");

		delete post.user;
		return post;
	}

}