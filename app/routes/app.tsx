import TeamSwitcher from "@/components/ui/GroupSwitcher";
import { UserNav } from "@/components/ui/UserNav";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticator } from "@/lib/auth.server";
import { getDbFromContext } from "@/lib/db.service.server";
import { teams, users, usersToTeams } from "@/lib/schema";
import { Theme, useTheme } from "@/lib/theme-provider";
import { cn } from "@/lib/utils";
import { LoaderArgs, json, redirect } from "@remix-run/cloudflare";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { eq } from "drizzle-orm";
import { LogOut, Moon, Sun, Twitter } from "lucide-react";

const LINKS = [
  {
    label: "Dashboard",
    href: "/app",
  },
];

export async function loader({ request, context }: LoaderArgs) {
  const db = getDbFromContext(context);
  const userSession = await authenticator.isAuthenticated(request);
  if (!userSession) {
    return redirect("/login");
  }
  const user = await db
    .select({
      id: users.id,
      email: users.email,
      avatar: users.avatar,
      name: users.name,
    })
    .from(users)
    .where(eq(users.email, userSession.email))
    .get();
  if (!user) {
    return redirect("/login");
  }
  const userTeams = await db
    .select({
      id: teams.id,
      name: teams.name,
      avatar: teams.avatar,
    })
    .from(usersToTeams)
    .leftJoin(users, eq(usersToTeams.userId, users.id))
    .leftJoin(teams, eq(usersToTeams.teamId, teams.id))
    .where(eq(teams.id, 1))
    .where(eq(users.id, user.id))
    .all();
  return json({
    user,
    userTeams,
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };
  return (
    <>
      <div className="flex-col flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher user={data.user} teams={data.userTeams} />
            <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                {theme === Theme.LIGHT ? (
                  <>
                    <Sun className="h-4 w-4" />
                    <span className="sr-only">light mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    <span className="sr-only">dark mode</span>
                  </>
                )}
              </button>
              <div>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="h-9 md:w-[100px] lg:w-[300px]"
                />
              </div>
              <UserNav user={data.user} />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-hidden h-screen">
        <Outlet />
      </div>
    </>
  );
}
