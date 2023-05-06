import { User } from "src/users/domain/user.entity";
import { GetPostsPaginatedQuery } from "../domain/dto/GetPostsPaginated.dto";
import { PostsPaginatedDto } from "../domain/dto/PostsPaginatedQuery";
import { Post } from "../domain/post.entity";

export abstract class IPostsService {
	abstract getPostsPaginated(query: GetPostsPaginatedQuery, user: User): Promise<PostsPaginatedDto>;
	abstract getPostById(id: number, user: User): Promise<Post>;
	abstract updatePost(id: number, attrs: Partial<Post>, user: User): Promise<Post>;
	abstract deletePost(id: number, user: User): Promise<void>;
	abstract getPostByIdWithComments(id: number, user: User): Promise<Post>;
}