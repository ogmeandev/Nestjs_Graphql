import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()  // User as GraphQL object
@Schema()      // User as Mongoose schema
export class User extends Document {
  @Field(() => String)
  @Prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  name: string;

  @Field(() => Int)
  @Prop({ required: true })
  age: number;

  @Field(() => String)
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
