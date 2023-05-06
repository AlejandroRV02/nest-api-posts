import { PostData } from "src/posts/domain/dto/PostData";

export abstract class IPostsAPIConsumer {
	abstract getPosts(): Promise<PostData[]>;
	abstract getPostById(id: number): Promise<PostData>;
}

