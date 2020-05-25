import bcrypt from "bcryptjs";
import { Arg, Ctx, Mutation, Resolver, Query } from "type-graphql";
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
      message: "invalid login",
    },
  ],
};

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("input")
    { email, password }: AuthInput
  ): Promise<UserResponse> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return {
          errors: [
            {
              path: "email",
              message: "already in use",
            },
          ],
        };
      }
      const newUser = new User();
      newUser.email = email;
      newUser.password = hashedPassword;
      const user: User = await User.save<User>(newUser);
      return { user };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("input") { email, password }: AuthInput
  ): Promise<LoginResponse> {
    const user = await User.findOne({ email });

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
    if (!ctx.payload?.userId) {
      return undefined;
    }

    return await User.findOne(ctx.req.session!.userId);
  }

  @Query(() => [User])
  async users() {
    return await User.find();
  }
}
