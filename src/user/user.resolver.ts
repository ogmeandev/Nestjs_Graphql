import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.model';  // Import the updated User model

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Mutation(() => String)
  async loginUser(@Args('loginUserInput') loginUserDto: LoginUserDto) {
    const { token } = await this.userService.loginUser(loginUserDto);
    return token;
  }

  @Mutation(() => User)
  async updateUser(@Args('id') id: string, @Args('updateUserInput') updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: string) {
    return this.userService.delete(id);
  }
}
