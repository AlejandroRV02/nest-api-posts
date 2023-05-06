import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('Auth: /auth/signup - POST', () => {
		const singupBodyReq = { email: "mail1{@mail.com", name: "Name", password: "password" };
		return request(app.getHttpServer())
			.post('/auth/signup',)
			.send(singupBodyReq)
			.expect(201)
			.then((res) => {
				const { id, email, name } = res.body
				expect(id).toBeDefined()
				expect(email).toEqual(singupBodyReq.email)
				expect(name).toEqual(singupBodyReq.name)
			});
	});

	it('Auth: /auth/signin - POST', () => {
		const singinBodyReq = { email: "mail1@mail.com", password: "password" };
		return request(app.getHttpServer())
			.post('/auth/signin',)
			.send(singinBodyReq)
			.expect(201)
			.then((res) => {
				const { accessToken } = res.body
				expect(accessToken).toBeDefined();
			});
	});
});
