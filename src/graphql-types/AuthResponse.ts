import { ObjectType, Field } from "type-graphql";
import { User } from "../entity/User";
import { FieldError } from "./FieldError";

@ObjectType()
export class LoginResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string;
  @Field(() => User, { nullable: true })
  user?: User;
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
