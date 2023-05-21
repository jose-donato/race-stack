import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ActionArgs,
  redirect,
} from "@remix-run/cloudflare";
import { getDbFromContext } from "@/lib/db.service.server";
import { Label } from "@/components/ui/label";
import { Link, useActionData, useNavigation } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { InputForm } from "@/components/ui/inputForm";
import { hash } from "@/lib/passwordHashing.server";
import { generateRandomLinearGradient } from "@/lib/utils";
import { users } from "@/lib/schema";

export const validator = withZod(
  z
    .object({
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .email("Must be a valid email"),
      password: z.string().min(8, { message: "Password is too short" }),
      confirmPassword: z.string().min(8, { message: "Password is too short" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
);

export async function action({ request, context }: ActionArgs) {
  const formData = await request.formData();
  const result = await validator.validate(formData);
  if (result.error) {
    return validationError(result.error);
  }
  const db = getDbFromContext(context);
  const hashedPassword = await hash({
    password: result.data.password,
  });
  const newUser = {
    email: result.data.email,
    password: hashedPassword,
    avatar: generateRandomLinearGradient(),
  };

  try {
    const res = await db.insert(users).values(newUser).run();
    if (res.success) {
      return redirect("/login?email=" + newUser.email);
    }
    // missing error state
    return {};
  } catch (err) {
    console.log(err.cause);
    if (err.cause.toString().includes("constraint failed")) {
      return validationError({
        fieldErrors: {
          email: "Email already exists",
        },
      });
    }
  }
}

export default function Index() {
  const { state } = useNavigation();
  const actionData = useActionData<typeof action>();
  return (
    <div className="min-h-screen container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-md absolute right-4 top-4 md:right-8 md:top-8"
        to="/login"
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover blur backdrop-filter"
          style={{
            backgroundImage:
              'url("https://user-images.githubusercontent.com/43375532/235504302-59de9ece-72b4-4a83-a9a5-edeb61353d8f.png")',
          }}
        />
        <div className="relative z-20 flex items-center text-lg">
          <h1 className="text-center font-extrabold tracking-tight">
            <span className="block uppercase text-orange-500 drop-shadow-md">
              Race Stack
            </span>
          </h1>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Check out readme for more information about this project
            </p>
          </blockquote>
        </div>
      </div>
      <div className="p-8 pt-14 lg:pt-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <div className="grid gap-6">
            <ValidatedForm validator={validator} method="post">
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <InputForm
                    type="email"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="password">Password</Label>
                  <InputForm
                    type="password"
                    id="password"
                    name="password"
                    placeholder="********"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <InputForm
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="********"
                  />
                </div>
                <Button disabled={state === "loading"}>
                  {state === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </>
                  ) : (
                    "Sign Up with Email"
                  )}
                </Button>
                {actionData?.error && (
                  <div className="text-sm text-red-500">{actionData.error}</div>
                )}
              </div>
            </ValidatedForm>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a
              className="underline underline-offset-4 hover:text-primary"
              href="/terms"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              className="underline underline-offset-4 hover:text-primary"
              href="/privacy"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
