import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserResolver', () => {
  let userResolver: UserResolver;
  let userService: UserService;

  const mockUser = {
    email: 'user@example.com',
    name: 'John Doe',
    age: 30,
    _id: 'user123',
  };

  const mockUserService = {
    createUser: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'user@example.com',
      name: 'John Doe',
      age: 30,
      password: 'password123',
    };
    const result = await userResolver.createUser(createUserDto);
    expect(result).toEqual(mockUser);
    expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should get all users', async () => {
    const result = await userResolver.users();
    expect(result).toEqual([mockUser]);
    expect(userService.findAll).toHaveBeenCalled();
  });

  it('should get a user by id', async () => {
    const result = await userResolver.user('user123');
    expect(result).toEqual(mockUser);
    expect(userService.findOne).toHaveBeenCalledWith('user123');
  });

  it('should update a user', async () => {
    const updateUserDto: CreateUserDto = {
      email: 'updated@example.com',
      name: 'John Smith',
      age: 31,
      password: 'newpassword123',
    };
    const result = await userResolver.updateUser('user123', updateUserDto);
    expect(result).toEqual(mockUser);
    expect(userService.update).toHaveBeenCalledWith('user123', updateUserDto);
  });

  it('should delete a user', async () => {
    const result = await userResolver.deleteUser('user123');
    expect(result).toEqual(mockUser);
    expect(userService.delete).toHaveBeenCalledWith('user123');
  });
});
