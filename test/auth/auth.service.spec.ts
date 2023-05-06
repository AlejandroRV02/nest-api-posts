import { Test } from "@nestjs/testing";
import { AuthService } from "../../src/auth/application/auth.service";
import { JwtService } from '@nestjs/jwt';
import { DeepPartial } from "typeorm";
import { IUsersService } from "src/users/application/users.service.interface";
import { User } from "src/users/domain/user.entity";
import { IAuthService } from "src/auth/application/auth.service.interface";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";

describe('Auth Service', () => {
	let service: IAuthService;
	let fakeUsersService: Partial<IUsersService>;
	let fakeJwtService;

	beforeEach(async () => {
		const users: User[] = [];
		fakeUsersService = {
			create: (user: DeepPartial<User>) => {
				const newUser = {
					id: Math.floor(Math.random() * 999999),
					email: user.email,
					password: user.password,
					name: user.name
				} as DeepPartial<User>;
				users.push(newUser as User);
				delete newUser.password;
				return Promise.resolve(newUser);
			},
			update: (id: number, attrs: Partial<User>) => Promise.resolve({ id: 1, email: "hola", name: "", password: "", posts: [] }),
			findByEmail: (email: string) => {
				const user = users.find((user) => user.email === email);
				return Promise.resolve(user);
			},
			findById: (id: number) => {
				const user = users.find((user) => user.id === id);
				return Promise.resolve(user);
			},
		}

		fakeJwtService = {
			sign: () => { },
			signAsync: () => { },
			verify: () => { },
			verifyAsync: () => { },
			decode: () => { },
		}

		const module = await Test.createTestingModule({
			providers: [
				{
					provide: IAuthService,
					useClass: AuthService
				},
				{
					provide: IUsersService,
					useValue: fakeUsersService
				},
				{
					provide: JwtService,
					useValue: fakeJwtService
				}
			]
		}).compile();

		service = module.get(IAuthService);
	});

	it('Init: Creates an instance of auth service', async () => {
		expect(service).toBeDefined();
	})

	it('Signup: Creates a user', async () => {
		const user = await service.signUp({
			email: "hola@mail.com",
			password: "password",
			name: "Fake name"
		})
		expect(user.password).toBeUndefined();
	})

	it('Signup: Throws an error if user signs up with email that is in use', async () => {
		fakeUsersService.findByEmail = () => Promise.resolve({ id: 1, email: 'asdf@asdf.com', password: '1' } as User);

		await expect(service.signUp({
			email: 'asdf@asdf.com',
			password: 'asdf'
		} as User)
		).rejects.toThrow(
			BadRequestException,
		);
	});

	it('Signin: Throws if signin is called with an unused email', async () => {
		await expect(
			service.signIn({ email: 'asdflkj@asdlfkj.com', password: 'passdflkj' }),
		).rejects.toThrow(UnauthorizedException);
	});

	it('Signin: returns an access token if correct password is provided', async () => {
		await service.signUp({ email: 'asdf@asdf.com', password: 'mypassword' } as User);
		service.areMatchingPasswords = () => Promise.resolve(true);
		service.generateToken = () => Promise.resolve({ accessToken: "asdasdadasdfasdfasdfasdfsadf" });

		const accessToken = await service.signIn({ email: 'asdf@asdf.com', password: 'mypassword' });
		expect(accessToken).toBeDefined();
	});
})

