import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { getDbFromContext } from "./db.service.server";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { verify } from "./passwordHashing.server";
import invariant from "tiny-invariant";
import { authSessionStorage } from "./cookie.server";

export let authenticator = new Authenticator<{
  email: string;
  id: number;
}>(authSessionStorage);

authenticator.use(
  new FormStrategy(async ({ form, context }: any) => {
    const email = form.get("email");
    const password = form.get("password");
    const db = getDbFromContext(context.context);
    const possibleUser = await db
      .select({
        email: users.email,
        password: users.password,
        id: users.id,
      })
      .from(users)
      .where(eq(users.email, email))
      .get();
    if (!possibleUser) {
      throw new Error("Invalid email or password");
    }
    invariant(possibleUser.password, "Password is required");
    const passwordValid = await verify({
      hash: possibleUser.password,
      password: password,
    });
    if (!passwordValid) {
      throw new Error("Invalid email or password");
    }
    return {
      email: possibleUser.email,
      id: possibleUser.id,
    };
  }),
  "form"
);
