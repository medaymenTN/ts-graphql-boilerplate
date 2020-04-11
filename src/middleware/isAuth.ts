import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-core";
import { verify } from "jsonwebtoken";
import { MyContext } from "../graphql-types/MyContext";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new ApolloError("not authenticated");
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new ApolloError("not authenticated");
  }
  return next();
};
