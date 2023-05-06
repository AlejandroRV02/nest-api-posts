import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ICommentsAPIConsumer } from './ICommentsAPIConsumer';

@Injectable()
export class CommentsAPIConsumer implements ICommentsAPIConsumer {

	constructor(private httpService: HttpService) { }

	async getComments() {
		const { data } = await firstValueFrom(this.httpService.get(''));

		return data;
	}

}