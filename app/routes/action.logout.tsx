import { authenticator } from "@/lib/auth.server";
import type { ActionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

export async function action({ request }: ActionArgs) {
    return await authenticator.logout(request, {
        redirectTo: "/",
    });
}

export async function loader() {
    return redirect("/");
}
