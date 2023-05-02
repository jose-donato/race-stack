import { Button } from "@/components/ui/button";
import { InputForm } from "@/components/ui/inputForm";
import { authenticator } from "@/lib/auth.server";
import { getDbFromContext } from "@/lib/db.service.server";
import { users } from "@/lib/schema";
import { Label } from "@radix-ui/react-label";
import { ActionArgs, json, redirect } from "@remix-run/cloudflare";
import { useActionData, useMatches, useNavigation } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";

const validator = withZod(
  z.object({
    name: z.string().optional(),
    avatar: z.string().optional(),
  })
);

export async function action({ request, context }: ActionArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    return redirect("/login");
  }
  const formData = await request.formData();
  const result = await validator.validate(formData);
  if (result.error) {
    return validationError(result.error);
  }
  const db = getDbFromContext(context);
  try {
    await db
      .update(users)
      .set({
        name: result.data.name,
        avatar: result.data.avatar,
      })
      .where(eq(users.id, user.id))
      .run();
  } catch (error) {
    return json({ error: error.message }, { status: 500 });
  }

  return {};
}

export default function Profile() {
  const actionData = useActionData<typeof action>();
  const match = useMatches().find((d) => d.id === "routes/app");
  const { data } = match;
  const { state } = useNavigation();

  return (
    <>
      <div className="space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <div className="flex items-center space-x-2">
          <ValidatedForm validator={validator} method="post">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="name">Name</Label>
                <InputForm
                  defaultValue={data?.user?.name}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="avatar">Avatar</Label>
                <InputForm
                  defaultValue={data?.user?.avatar}
                  type="text"
                  id="avatar"
                  name="avatar"
                />
              </div>
              <Button disabled={state === "loading"}>
                {state === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  "Save"
                )}
              </Button>
              {actionData?.error && (
                <div className="text-sm text-red-500">{actionData.error}</div>
              )}
            </div>
          </ValidatedForm>
        </div>
      </div>
    </>
  );
}
