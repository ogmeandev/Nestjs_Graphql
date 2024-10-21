import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  password: string;
}
