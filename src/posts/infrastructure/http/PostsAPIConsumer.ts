import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IPostsAPIConsumer } from './IPostsAPIConsumer';
import { PostData } from 'src/posts/domain/dto/PostData';

@Injectable()
export class PostsAPIConsumer implements IPostsAPIConsumer {

	constructor(private httpService: HttpService) {
	}

	async getPosts(): Promise<PostData[]> {
		const { data } = await firstValueFrom(this.httpService.get(''));

		return data as PostData[];
	}

	async getPostById(id: number): Promise<PostData> {
		const { data } = await firstValueFrom(this.httpService.get(`${id}`));

		return data as PostData;
	}

}