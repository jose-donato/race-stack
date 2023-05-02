import { Github, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionArgs, redirect } from "@remix-run/cloudflare";
import { Label } from "@/components/ui/label";
import {
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { InputForm } from "@/components/ui/inputForm";
import { authenticator } from "@/lib/auth.server";
import { authSessionStorage, flashSession } from "@/lib/cookie.server";

export const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z.string().min(8, { message: "Password is too short" }),
  })
);

export async function action({ request, context }: ActionArgs) {
  const formData = await request.clone().formData();
  const result = await validator.validate(formData);
  if (result.error) {
    return validationError(result.error);
  }

  const cookieHeader = request.headers.get("Cookie");
  const fSession = await flashSession.getSession(cookieHeader);
  let user = null;
  try {
    user = await authenticator.authenticate("form", request, {
      context: {
        formData,
        request,
        context,
      },
    });
  } catch (e) {
    console.log(e);
  }
  if (user) {
    const session = await authSessionStorage.getSession(
      cookieHeader
    );

    session.set("user", user);
    session.set("strategy", "form");
    return redirect("/app", {
      headers: {
        "Set-Cookie": await authSessionStorage.commitSession(session),
      },
    });
  } else {
    fSession.flash("toast", {
      variant: "destructive",
      title: "Uh oh! Login failed.",
      description: "Please check your email and password and try again.",
    });
    return redirect("/login", {
      headers: {
        "Set-Cookie": await flashSession.commitSession(fSession),
      },
    });
  }
}

export default function Index() {
  const { state } = useNavigation();
  /*const [params] = useSearchParams();
  const error = params.get("error");
  const { toast } = useToast();
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Login failed.",
        description: "Please check your email and password and try again.",
      });
    }
  }, [error]);*/

  const actionData = useActionData<typeof action>();
  return (
    <div className="min-h-screen container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-9 px-3 rounded-md absolute right-4 top-4 md:right-8 md:top-8"
        to="/register"
      >
        Register
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
              Login to your account
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
                <Button disabled={state === "loading"}>
                  {state === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading
                    </>
                  ) : (
                    "Sign In with Email"
                  )}
                </Button>
                {actionData?.error && (
                  <div className="text-sm text-red-500">{actionData.error}</div>
                )}
              </div>
            </ValidatedForm>
          </div>
        </div>
      </div>
    </div>
  );
}
