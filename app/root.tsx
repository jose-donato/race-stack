import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import {
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
  json,
} from "@remix-run/cloudflare";
import styles from "./tailwind.css";
import { flashSession, gdprConsent } from "./lib/cookie.server";
import { getThemeSession } from "./lib/theme.server";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ThemeHead, ThemeProvider } from "./lib/theme-provider";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/Toaster";
import posthog from "posthog-js";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: V2_MetaFunction = () => {
  return [{
    title: "Remix Race Stack",
    "image": "https://user-images.githubusercontent.com/43375532/235511500-8bb82094-8599-4dc3-84d9-3c2d128c4678.png",
    "og:image": "https://user-images.githubusercontent.com/43375532/235511500-8bb82094-8599-4dc3-84d9-3c2d128c4678.png"
  }];
};

export async function loader({ request, context }: LoaderArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};
  const themeSession = await getThemeSession(request);
  const fSession = await flashSession.getSession(cookieHeader);
  const toast = fSession.get("toast") || null;

  const headers = new Headers();

  headers.append("Set-Cookie", await flashSession.commitSession(fSession));

  return json(
    {
      theme: themeSession.getTheme(),
      track: cookie.gdprConsent,
      toast,
      ENV: {
        POSTHOG_API_KEY: context.POSTHOG_API_KEY,
        POSTHOG_API_HOST: context.POSTHOG_API_HOST,
      },
    },
    {
      headers,
    }
  );
}

export function Analytics() {
  const [posthogLoaded, setPosthogLoaded] = useState(false);
  const analyticsFetcher = useFetcher();
  const data = useLoaderData<typeof loader>();
  const location = useLocation();

  useEffect(() => {
    if (data.track && data.ENV.POSTHOG_API_KEY && data.ENV.POSTHOG_API_HOST) {
      posthog.init(data.ENV.POSTHOG_API_KEY, {
        api_host: data.ENV.POSTHOG_API_HOST,
        loaded: () => {
          setPosthogLoaded(true);
        },
      });
    }
  }, [location, data.track]);

  useEffect(() => {
    if (posthogLoaded) {
      posthog.capture("$pageview");
    }
  }, [posthogLoaded, location.pathname]);

  return (
    <div
      id="cookies-simple-with-icon-and-dismiss-button"
      className={clsx(
        "fixed bottom-0 right-0 z-[60] mx-auto w-full p-6 sm:max-w-xl",
        {
          "pointer-events-none opacity-0": data.track,
          "pointer-events-auto opacity-100": !data.track,
        }
      )}
    >
      <analyticsFetcher.Form
        method="post"
        action="/action/enable-analytics"
        className="rounded-xl border border-gray-200 bg-slate-100 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="grid gap-y-3 sm:flex sm:items-center sm:gap-y-0 sm:gap-x-5">
          <div className="sm:max-w-sm">
            <h2 className="text-gray-500">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                We use cookies
              </span>{" "}
              to analyze our traffic and create a smooth user experience.
            </h2>
          </div>
          <button
            name="accept-gdpr"
            value="true"
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-orange-500 py-2 px-3 text-sm font-semibold text-white transition-all hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Accept
          </button>
        </div>
      </analyticsFetcher.Form>
    </div>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const { toast } = useToast();
  useEffect(() => {
    if (data.toast) {
      toast(data.toast);
    }
  }, [data.toast]);
  return (
    <html lang="en">
      <ThemeProvider specifiedTheme={data.theme}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
          <ThemeHead ssrTheme={Boolean(data.theme)} />
        </head>
        <body className={clsx(data.theme === "dark" ? "dark" : "light")}>
          <Outlet />
          <Toaster />
          <Analytics />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </ThemeProvider>
    </html>
  );
}

export function ErrorBoundary(props) {
  console.log(props);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Oh no!</h1>
        <Scripts />
      </body>
    </html>
  );
}
