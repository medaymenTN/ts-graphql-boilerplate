import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver, Query } from "type-graphql";
import { getMongoRepository } from "typeorm";
import { User } from "../entity/User";
import { AuthInput } from "../graphql-types/AuthInput";
import { MyContext } from "../graphql-types/MyContext";
import { UserResponse } from "../graphql-types/UserResponse";
import { createAccessToken } from "../helpers/auth";
import { LoginResponse } from "../graphql-types/AuthResponse";

const invalidLoginResponse = {
  errors: [
    {
      path: "email",
      message: "invalid login"
    }
  ]
};

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input")
    { email, password }: AuthInput
  ): Promise<UserResponse> {
    console.log({ email, password });

    const manager = getMongoRepository<User>(User);
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await manager.findOne({ email });
    console.log("existingUser",existingUser)
    if (existingUser) {
      return {
        errors: [
          {
            path: "email",
            message: "already in use"
          }
        ]
      };
    }

    const user: User = await manager.save({
      email,
      password: hashedPassword
    });
    console.log("usre",existingUser)
    return { user };
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("input") { email, password }: AuthInput
  ): Promise<LoginResponse> {
    const manager = getMongoRepository(User);
    const user = await manager.findOne({ email });

    if (!user) {
      return invalidLoginResponse;
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return invalidLoginResponse;
    }

    return { accessToken: createAccessToken(user), user };
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    const manager = getMongoRepository(User);
    if (!ctx.payload?.userId) {
      return undefined;
    }

    return await manager.findOne(ctx.req.session!.userId);
  }
    
  @Query(() => [User])
  async users(){
    const manager = getMongoRepository(User);
    return await manager.find();
  }
}
