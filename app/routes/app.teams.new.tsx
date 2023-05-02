import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputForm } from "@/components/ui/inputForm";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authenticator } from "@/lib/auth.server";
import { getDbFromContext } from "@/lib/db.service.server";
import { users } from "@/lib/schema";
import { usersToTeams } from "@/lib/schema";
import { teams } from "@/lib/schema";
import { generateRandomLinearGradient } from "@/lib/utils";
import { ActionArgs, redirect } from "@remix-run/cloudflare";
import { Form, useNavigate, useNavigation } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { z } from "zod";

const emailSchema = z.string().email();

export const validator = withZod(
  z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      emails: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.emails) {
          const emails = data.emails.split(",").map((item) => item.trim());
          for (const email of emails) {
            if (!emailSchema.safeParse(email).success) {
              return false;
            }
          }
        }
        return true;
      },
      { message: "Invalid email address" }
    )
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

  const { name, emails } = result.data;

  const db = getDbFromContext(context);
  const team = await db
    .insert(teams)
    .values({
      name,
      avatar: generateRandomLinearGradient(),
    })
    .returning({
      teamId: teams.id,
    })
    .get();

  if (team) {
    await db
      .insert(usersToTeams)
      .values({
        userId: user.id,
        teamId: team.teamId,
      })
      .run();
    if (emails) {
      for (const email of emails.split(",")) {
        const user = await db
          .select({
            userId: users.id,
          })
          .from(users)
          .where(eq(users.email, email.trim()))
          .get();

        if (user) {
          await db
            .insert(usersToTeams)
            .values({
              userId: user.userId,
              teamId: team.teamId,
            })
            .run();
        }
      }
    }
  }

  return redirect(`/app`);

  /*
  if (!group) {
    return json(
      {
        error: "An error occurred while creating the group"
      }
    )
  }
  return redirect(`/app`);*/
}

export default function NewGroupPage() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { state } = useNavigation();
  useEffect(() => {
    if (!open) {
      navigate("/app");
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <ValidatedForm
          method="post"
          className="space-y-5"
          validator={validator}
        >
          <div>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="name">Team name</Label>
                <InputForm
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Race team"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emails">Users to add (comma separated)</Label>
                <InputForm
                  type="text"
                  id="emails"
                  name="emails"
                  placeholder="user1@gmail.com,user2@gmail.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button disabled={state === "loading"}>
              {state === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </ValidatedForm>
      </DialogContent>
    </Dialog>
  );
}
