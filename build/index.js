var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// empty-module:~/utils/gtag.client
var require_gtag = __commonJS({
  "empty-module:~/utils/gtag.client"(exports, module2) {
    module2.exports = {};
  }
});

// empty-module:~/components/charts/LineChart.client
var require_LineChart = __commonJS({
  "empty-module:~/components/charts/LineChart.client"(exports, module2) {
    module2.exports = {};
  }
});

// empty-module:~/components/charts/BarChart.client
var require_BarChart = __commonJS({
  "empty-module:~/components/charts/BarChart.client"(exports, module2) {
    module2.exports = {};
  }
});

// empty-module:~/components/charts/GroupChart.client
var require_GroupChart = __commonJS({
  "empty-module:~/components/charts/GroupChart.client"(exports, module2) {
    module2.exports = {};
  }
});

// empty-module:~/components/charts/PieChart.client
var require_PieChart = __commonJS({
  "empty-module:~/components/charts/PieChart.client"(exports, module2) {
    module2.exports = {};
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_stream = require("stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let callbackName = (0, import_isbot.default)(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let didError = !1, { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
        fileName: "app/entry.server.tsx",
        lineNumber: 24,
        columnNumber: 7
      }, this),
      {
        [callbackName]: () => {
          let body = new import_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode
            })
          ), pipe(body);
        },
        onShellError: (err) => {
          reject(err);
        },
        onError: (error) => {
          didError = !0, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node5 = require("@remix-run/node"), import_react4 = require("@remix-run/react");

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-VYEXOQXH.css";

// app/utils/auth.server.ts
var import_remix_auth = require("remix-auth"), import_remix_auth_form = require("remix-auth-form"), import_node2 = require("@remix-run/node");

// app/models/user.server.ts
var import_bcryptjs = __toESM(require("bcryptjs"));

// app/db.server.ts
var import_client = require("@prisma/client"), prisma;
global.__db__ || (global.__db__ = new import_client.PrismaClient()), prisma = global.__db__, prisma.$connect();

// app/models/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}
async function getUserGroups(id) {
  let userGroups = await prisma.groupUsers.findMany({
    where: {
      userId: id
    }
  });
  return await Promise.all(
    userGroups.map(async (group) => await prisma.group.findUnique({
      where: {
        id: group.groupId
      }
    }))
  );
}
async function getUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
async function createUser(email, password) {
  let hashedPassword = await import_bcryptjs.default.hash(password, 10);
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });
}
async function verifyLogin(email, password) {
  let userWithPassword = await prisma.user.findUnique({
    where: { email }
  });
  if (!userWithPassword || !userWithPassword.password || !await import_bcryptjs.default.compare(password, userWithPassword.password))
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/utils/auth.server.ts
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    secrets: [process.env.SESSION_SECRET ?? "secretttokdoakdw"],
    secure: !1,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1e3)
  }
}), authenticator = new import_remix_auth.Authenticator(sessionStorage);
authenticator.use(
  new import_remix_auth_form.FormStrategy(async ({ form, context }) => {
    let email = form.get("email"), password = form.get("password"), user = await verifyLogin(email, password);
    if (user)
      return { email: user.email, id: user.id };
    throw new Error("Invalid email or password");
  })
);
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let user = await authenticator.isAuthenticated(request);
  if (!user) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return user;
}
async function getUser(request) {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    return (0, import_node2.redirect)("/login");
  let userData = await getUserById(user.id);
  return { email: user.email, avatar: userData == null ? void 0 : userData.avatar, name: userData == null ? void 0 : userData.name };
}

// app/root.tsx
var import_react5 = require("react"), import_clsx = __toESM(require("clsx"));

// app/utils/theme.server.ts
var import_node3 = require("@remix-run/node");

// app/utils/theme-provider.tsx
var import_react2 = require("@remix-run/react"), import_react3 = require("react"), import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), Theme = /* @__PURE__ */ ((Theme2) => (Theme2.DARK = "dark", Theme2.LIGHT = "light", Theme2))(Theme || {}), themes = Object.values(Theme), ThemeContext = (0, import_react3.createContext)(void 0), prefersDarkMQ = "(prefers-color-scheme: dark)", getPreferredTheme = () => window.matchMedia(prefersDarkMQ).matches ? "dark" /* DARK */ : "light" /* LIGHT */;
function ThemeProvider({
  children,
  specifiedTheme
}) {
  let [theme, setTheme] = (0, import_react3.useState)(() => specifiedTheme ? themes.includes(specifiedTheme) ? specifiedTheme : null : typeof document > "u" ? null : getPreferredTheme()), persistTheme = (0, import_react2.useFetcher)(), persistThemeRef = (0, import_react3.useRef)(persistTheme);
  (0, import_react3.useEffect)(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);
  let mountRun = (0, import_react3.useRef)(!1);
  return (0, import_react3.useEffect)(() => {
    if (!mountRun.current) {
      mountRun.current = !0;
      return;
    }
    !theme || persistThemeRef.current.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    );
  }, [theme]), (0, import_react3.useEffect)(() => {
    let mediaQuery = window.matchMedia(prefersDarkMQ), handleChange = () => {
      setTheme(mediaQuery.matches ? "dark" /* DARK */ : "light" /* LIGHT */);
    };
    return mediaQuery.addEventListener("change", handleChange), () => mediaQuery.removeEventListener("change", handleChange);
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(ThemeContext.Provider, { value: [theme, setTheme], children }, void 0, !1, {
    fileName: "app/utils/theme-provider.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}
var clientThemeCode = `
// hi there dear reader \u{1F44B}
// this is how I make certain we avoid a flash of the wrong theme. If you select
// a theme, then I'll know what you want in the future and you'll not see this
// script anymore.
;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const cl = document.documentElement.classList;
  const themeAlreadyApplied = cl.contains('light') || cl.contains('dark');
  if (themeAlreadyApplied) {
    // this script shouldn't exist if the theme is already applied!
    console.warn(
      "Hi there, could you let me know you're seeing this message? Thanks!",
    );
  } else {
    cl.add(theme);
  }
  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn(
      "Hey, could you let me know you're seeing this message? Thanks!",
    );
  }
})();
`, themeStylesCode = `
  /* default light, but app-preference is "dark" */
  html.dark {
    light-mode {
      display: none;
    }
  }

  /* default light, and no app-preference */
  html:not(.dark) {
    dark-mode {
      display: none;
    }
  }

  @media (prefers-color-scheme: dark) {
    /* prefers dark, but app-preference is "light" */
    html.light {
      dark-mode {
        display: none;
      }
    }

    /* prefers dark, and app-preference is "dark" */
    html.dark,
    /* prefers dark and no app-preference */
    html:not(.light) {
      light-mode {
        display: none;
      }
    }
  }
`;
function ThemeHead({ ssrTheme }) {
  let [theme] = useTheme();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
      "meta",
      {
        name: "color-scheme",
        content: theme === "light" ? "light dark" : "dark light"
      },
      void 0,
      !1,
      {
        fileName: "app/utils/theme-provider.tsx",
        lineNumber: 172,
        columnNumber: 7
      },
      this
    ),
    ssrTheme ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_jsx_dev_runtime2.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
        "script",
        {
          dangerouslySetInnerHTML: { __html: clientThemeCode }
        },
        void 0,
        !1,
        {
          fileName: "app/utils/theme-provider.tsx",
          lineNumber: 182,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("style", { dangerouslySetInnerHTML: { __html: themeStylesCode } }, void 0, !1, {
        fileName: "app/utils/theme-provider.tsx",
        lineNumber: 189,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/utils/theme-provider.tsx",
      lineNumber: 181,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/utils/theme-provider.tsx",
    lineNumber: 167,
    columnNumber: 5
  }, this);
}
var clientDarkAndLightModeElsCode = `;(() => {
  const theme = window.matchMedia(${JSON.stringify(prefersDarkMQ)}).matches
    ? 'dark'
    : 'light';
  const darkEls = document.querySelectorAll("dark-mode");
  const lightEls = document.querySelectorAll("light-mode");
  for (const darkEl of darkEls) {
    if (theme === "dark") {
      for (const child of darkEl.childNodes) {
        darkEl.parentElement?.append(child);
      }
    }
    darkEl.remove();
  }
  for (const lightEl of lightEls) {
    if (theme === "light") {
      for (const child of lightEl.childNodes) {
        lightEl.parentElement?.append(child);
      }
    }
    lightEl.remove();
  }
})();`;
function ThemeBody({ ssrTheme }) {
  return ssrTheme ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(
    "script",
    {
      dangerouslySetInnerHTML: { __html: clientDarkAndLightModeElsCode }
    },
    void 0,
    !1,
    {
      fileName: "app/utils/theme-provider.tsx",
      lineNumber: 222,
      columnNumber: 5
    },
    this
  );
}
function useTheme() {
  let context = (0, import_react3.useContext)(ThemeContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
function isTheme(value) {
  return typeof value == "string" && themes.includes(value);
}

// app/utils/theme.server.ts
var sessionSecret = process.env.SESSION_SECRET ?? "DEFAULT_SECRET", themeStorage = (0, import_node3.createCookieSessionStorage)({
  cookie: {
    name: "my_remix_theme",
    secure: !0,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: !0
  }
});
async function getThemeSession(request) {
  let session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      let themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session)
  };
}

// app/utils/cookie.server.ts
var import_node4 = require("@remix-run/node"), gdprConsent = (0, import_node4.createCookie)("gdpr-consent", {
  maxAge: 31536e3
});

// app/root.tsx
var gtag = __toESM(require_gtag()), import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), links = () => [{ rel: "stylesheet", href: tailwind_default }], meta = () => ({
  charset: "utf-8",
  title: "Assistant",
  viewport: "width=device-width,initial-scale=1",
  "color-scheme": "dark light"
});
async function loader({ request }) {
  let cookieHeader = request.headers.get("Cookie"), cookie = await gdprConsent.parse(cookieHeader) || {}, themeSession = await getThemeSession(request);
  return (0, import_node5.json)({
    theme: themeSession.getTheme(),
    user: await getUser(request),
    track: cookie.gdprConsent,
    gaTrackingId: process.env.GA_TRACKING_ID
  });
}
function App() {
  let data = (0, import_react4.useLoaderData)(), location = (0, import_react4.useLocation)(), analyticsFetcher = (0, import_react4.useFetcher)();
  return (0, import_react5.useEffect)(() => {
    var _a;
    data.track && ((_a = data.gaTrackingId) == null ? void 0 : _a.length) && gtag.pageview(location.pathname, data.gaTrackingId);
  }, [location, data.gaTrackingId, data.track]), (0, import_react5.useEffect)(() => {
    import("preline");
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", { lang: "en", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ThemeProvider, { specifiedTheme: data.theme, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ThemeHead, { ssrTheme: Boolean(data.theme) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 71,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
      "body",
      {
        className: (0, import_clsx.default)("h-screen dark:bg-slate-900", {
          dark: data.theme === "dark"
        }),
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 78,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ThemeBody, { ssrTheme: Boolean(data.theme) }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 79,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.ScrollRestoration, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 80,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.Scripts, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 81,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react4.LiveReload, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 82,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
            "div",
            {
              id: "cookies-simple-with-icon-and-dismiss-button",
              className: (0, import_clsx.default)(
                "fixed bottom-0 right-0 z-[60] mx-auto w-full p-6 sm:max-w-xl",
                {
                  "pointer-events-none opacity-0": data.track,
                  "pointer-events-auto opacity-100": !data.track
                }
              ),
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
                analyticsFetcher.Form,
                {
                  method: "post",
                  action: "/action/enable-analytics",
                  className: "rounded-xl border border-gray-200 bg-slate-100 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "grid gap-y-3 sm:flex sm:items-center sm:gap-y-0 sm:gap-x-5", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { className: "sm:max-w-sm", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h2", { className: "text-gray-500", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("span", { className: "font-semibold text-gray-800 dark:text-gray-200", children: "We use cookies" }, void 0, !1, {
                        fileName: "app/root.tsx",
                        lineNumber: 102,
                        columnNumber: 21
                      }, this),
                      " ",
                      "to analyze our traffic and create a smooth user experience."
                    ] }, void 0, !0, {
                      fileName: "app/root.tsx",
                      lineNumber: 101,
                      columnNumber: 19
                    }, this) }, void 0, !1, {
                      fileName: "app/root.tsx",
                      lineNumber: 100,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(
                      "button",
                      {
                        name: "accept-gdpr",
                        value: "true",
                        type: "submit",
                        className: "inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-2 px-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
                        children: "Accept"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/root.tsx",
                        lineNumber: 108,
                        columnNumber: 17
                      },
                      this
                    )
                  ] }, void 0, !0, {
                    fileName: "app/root.tsx",
                    lineNumber: 99,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 94,
                  columnNumber: 13
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/root.tsx",
              lineNumber: 83,
              columnNumber: 11
            },
            this
          ),
          null
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/root.tsx",
        lineNumber: 73,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 67,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}

// app/routes/action/enable-analytics.tsx
var enable_analytics_exports = {};
__export(enable_analytics_exports, {
  action: () => action
});
var import_node6 = require("@remix-run/node");
var action = async ({ request }) => {
  let formData = await request.formData(), cookieHeader = request.headers.get("Cookie"), cookie = await gdprConsent.parse(cookieHeader) || {};
  return formData.get("accept-gdpr") === "true" && (cookie.gdprConsent = !0), (0, import_node6.json)(
    { success: !0 },
    {
      headers: {
        "Set-Cookie": await gdprConsent.serialize(cookie)
      }
    }
  );
};

// app/routes/action/set-theme.tsx
var set_theme_exports = {};
__export(set_theme_exports, {
  action: () => action2,
  loader: () => loader2
});
var import_node7 = require("@remix-run/node");
var action2 = async ({ request }) => {
  let themeSession = await getThemeSession(request), requestText = await request.text(), theme = new URLSearchParams(requestText).get("theme");
  return isTheme(theme) ? (themeSession.setTheme(theme), (0, import_node7.json)(
    { success: !0 },
    { headers: { "Set-Cookie": await themeSession.commit() } }
  )) : (0, import_node7.json)({
    success: !1,
    message: `theme value of ${theme} is not a valid theme`
  });
}, loader2 = async () => (0, import_node7.redirect)("/", { status: 404 });

// app/routes/healthcheck.tsx
var healthcheck_exports = {};
__export(healthcheck_exports, {
  loader: () => loader3
});
async function loader3({ request }) {
  let host = request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  try {
    let url = new URL("/", `http://${host}`);
    return await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok)
          return Promise.reject(r);
      })
    ]), new Response("OK");
  } catch (error) {
    return console.log("healthcheck \u274C", { error }), new Response("ERROR", { status: 500 });
  }
}

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3,
  loader: () => loader4
});
var import_node8 = require("@remix-run/node");
async function action3({ request }) {
  return await authenticator.logout(request, {
    redirectTo: "/"
  });
}
async function loader4() {
  return (0, import_node8.redirect)("/");
}

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});

// app/components/layout/Header.tsx
var import_react6 = require("react"), import_clsx2 = __toESM(require("clsx")), import_react7 = require("@remix-run/react"), import_jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function Header() {
  let [showNav, setShowNav] = (0, import_react6.useState)(!0);
  return (0, import_react6.useEffect)(() => {
    let handleScroll = () => {
      window.pageYOffset > 100 ? setShowNav(!0) : setShowNav(!1);
    };
    return window.addEventListener("scroll", handleScroll), () => window.removeEventListener("scroll", handleScroll);
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
    "header",
    {
      className: (0, import_clsx2.default)(
        "fixed z-50 flex w-full flex-wrap text-sm transition-opacity duration-500 md:flex-nowrap md:justify-start",
        {
          "opacity-0": !showNav,
          "opacity-100": showNav
        }
      ),
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
        "nav",
        {
          className: "relative mx-2 mt-6 w-full max-w-7xl rounded-[36px] border border-gray-200 bg-slate-100 py-3 px-4 dark:border-gray-700 dark:bg-gray-800 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto",
          "aria-label": "Global",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                "a",
                {
                  className: "flex-none text-xl font-semibold dark:text-white",
                  href: "#",
                  "aria-label": "Brand",
                  children: "Brand"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/layout/Header.tsx",
                  lineNumber: 36,
                  columnNumber: 11
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "md:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                "button",
                {
                  type: "button",
                  className: "hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-full border bg-slate-100 p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800",
                  "data-hs-collapse": "#navbar-collapse-with-animation",
                  "aria-controls": "navbar-collapse-with-animation",
                  "aria-label": "Toggle navigation",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                      "svg",
                      {
                        className: "h-4 w-4 hs-collapse-open:hidden",
                        width: 16,
                        height: 16,
                        fill: "currentColor",
                        viewBox: "0 0 16 16",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                          "path",
                          {
                            fillRule: "evenodd",
                            d: "M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/components/layout/Header.tsx",
                            lineNumber: 58,
                            columnNumber: 17
                          },
                          this
                        )
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/layout/Header.tsx",
                        lineNumber: 51,
                        columnNumber: 15
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                      "svg",
                      {
                        className: "hidden h-4 w-4 hs-collapse-open:block",
                        width: 16,
                        height: 16,
                        fill: "currentColor",
                        viewBox: "0 0 16 16",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" }, void 0, !1, {
                          fileName: "app/components/layout/Header.tsx",
                          lineNumber: 70,
                          columnNumber: 17
                        }, this)
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/layout/Header.tsx",
                        lineNumber: 63,
                        columnNumber: 15
                      },
                      this
                    )
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/components/layout/Header.tsx",
                  lineNumber: 44,
                  columnNumber: 13
                },
                this
              ) }, void 0, !1, {
                fileName: "app/components/layout/Header.tsx",
                lineNumber: 43,
                columnNumber: 11
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/layout/Header.tsx",
              lineNumber: 35,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
              "div",
              {
                id: "navbar-collapse-with-animation",
                className: "hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 md:block",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "mt-5 flex flex-col gap-y-4 gap-x-0 md:mt-0 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:pl-7", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    "a",
                    {
                      className: "font-medium text-blue-600 dark:text-blue-500 md:py-6",
                      href: "#",
                      "aria-current": "page",
                      children: "Landing"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/layout/Header.tsx",
                      lineNumber: 80,
                      columnNumber: 13
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    "a",
                    {
                      className: "font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 md:py-6",
                      href: "#",
                      children: "Account"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/layout/Header.tsx",
                      lineNumber: 87,
                      columnNumber: 13
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    "a",
                    {
                      className: "font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 md:py-6",
                      href: "#",
                      children: "Work"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/layout/Header.tsx",
                      lineNumber: 93,
                      columnNumber: 13
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    "a",
                    {
                      className: "font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 md:py-6",
                      href: "#",
                      children: "Blog"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/layout/Header.tsx",
                      lineNumber: 99,
                      columnNumber: 13
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "hs-dropdown [--strategy:static] [--adaptive:none] md:py-4 md:[--strategy:fixed] md:[--trigger:hover]", children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                      "button",
                      {
                        type: "button",
                        className: "flex w-full items-center font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 ",
                        children: [
                          "Dropdown",
                          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                            "svg",
                            {
                              className: "ml-2 h-2.5 w-2.5 text-gray-600",
                              width: 16,
                              height: 16,
                              viewBox: "0 0 16 16",
                              fill: "none",
                              xmlns: "http://www.w3.org/2000/svg",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                                "path",
                                {
                                  d: "M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5",
                                  stroke: "currentColor",
                                  strokeWidth: 2,
                                  strokeLinecap: "round"
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/layout/Header.tsx",
                                  lineNumber: 119,
                                  columnNumber: 19
                                },
                                this
                              )
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/components/layout/Header.tsx",
                              lineNumber: 111,
                              columnNumber: 17
                            },
                            this
                          )
                        ]
                      },
                      void 0,
                      !0,
                      {
                        fileName: "app/components/layout/Header.tsx",
                        lineNumber: 106,
                        columnNumber: 15
                      },
                      this
                    ),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "hs-dropdown-menu top-full z-10 hidden rounded-lg bg-slate-100 p-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-top-5 before:left-0 before:h-5 before:w-full hs-dropdown-open:opacity-100 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:w-48 md:border md:shadow-md md:duration-[150ms] md:dark:border", children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                        "a",
                        {
                          className: "flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300",
                          href: "#",
                          children: "About"
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/layout/Header.tsx",
                          lineNumber: 128,
                          columnNumber: 17
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "hs-dropdown relative [--strategy:static] [--adaptive:none] md:[--trigger:hover] md:[--strategy:absolute]", children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                          "button",
                          {
                            type: "button",
                            className: "flex w-full w-full items-center justify-between rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300",
                            children: [
                              "Sub Menu",
                              /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                                "svg",
                                {
                                  className: "ml-2 h-2.5 w-2.5 text-gray-600 md:-rotate-90",
                                  width: 16,
                                  height: 16,
                                  viewBox: "0 0 16 16",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                                    "path",
                                    {
                                      d: "M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5",
                                      stroke: "currentColor",
                                      strokeWidth: 2,
                                      strokeLinecap: "round"
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "app/components/layout/Header.tsx",
                                      lineNumber: 148,
                                      columnNumber: 23
                                    },
                                    this
                                  )
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/layout/Header.tsx",
                                  lineNumber: 140,
                                  columnNumber: 21
                                },
                                this
                              )
                            ]
                          },
                          void 0,
                          !0,
                          {
                            fileName: "app/components/layout/Header.tsx",
                            lineNumber: 135,
                            columnNumber: 19
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "hs-dropdown-menu top-0 right-full z-10 !mx-[10px] hidden rounded-lg bg-slate-100 p-2 opacity-0 transition-[opacity,margin] duration-[0.1ms] before:absolute before:-right-5 before:top-0 before:h-full before:w-5 hs-dropdown-open:opacity-100 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 md:mt-2 md:w-48 md:border md:shadow-md md:duration-[150ms] md:dark:border", children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                            "a",
                            {
                              className: "flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300",
                              href: "#",
                              children: "About"
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/components/layout/Header.tsx",
                              lineNumber: 157,
                              columnNumber: 21
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                            "a",
                            {
                              className: "flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300",
                              href: "#",
                              children: "Downloads"
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/components/layout/Header.tsx",
                              lineNumber: 163,
                              columnNumber: 21
                            },
                            this
                          ),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                            "a",
                            {
                              className: "flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300",
                              href: "#",
                              children: "Team Account"
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/components/layout/Header.tsx",
                              lineNumber: 169,
                              columnNumber: 21
                            },
                            this
                          )
                        ] }, void 0, !0, {
                          fileName: "app/components/layout/Header.tsx",
                          lineNumber: 156,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/components/layout/Header.tsx",
                        lineNumber: 134,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                        "a",
                        {
                          className: "flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300",
                          href: "#",
                          children: "Downloads"
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/layout/Header.tsx",
                          lineNumber: 177,
                          columnNumber: 17
                        },
                        this
                      ),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                        "a",
                        {
                          className: "flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300",
                          href: "#",
                          children: "Team Account"
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/layout/Header.tsx",
                          lineNumber: 183,
                          columnNumber: 17
                        },
                        this
                      )
                    ] }, void 0, !0, {
                      fileName: "app/components/layout/Header.tsx",
                      lineNumber: 127,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/components/layout/Header.tsx",
                    lineNumber: 105,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                    import_react7.Link,
                    {
                      className: "flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 md:my-6 md:border-l md:border-gray-300 md:pl-6",
                      to: "/login",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(
                          "svg",
                          {
                            className: "h-4 w-4",
                            xmlns: "http://www.w3.org/2000/svg",
                            width: 16,
                            height: 16,
                            fill: "currentColor",
                            viewBox: "0 0 16 16",
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("path", { d: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" }, void 0, !1, {
                              fileName: "app/components/layout/Header.tsx",
                              lineNumber: 203,
                              columnNumber: 17
                            }, this)
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/components/layout/Header.tsx",
                            lineNumber: 195,
                            columnNumber: 15
                          },
                          this
                        ),
                        "Log in"
                      ]
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/components/layout/Header.tsx",
                      lineNumber: 191,
                      columnNumber: 13
                    },
                    this
                  )
                ] }, void 0, !0, {
                  fileName: "app/components/layout/Header.tsx",
                  lineNumber: 79,
                  columnNumber: 11
                }, this)
              },
              void 0,
              !1,
              {
                fileName: "app/components/layout/Header.tsx",
                lineNumber: 75,
                columnNumber: 9
              },
              this
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/layout/Header.tsx",
          lineNumber: 31,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/layout/Header.tsx",
      lineNumber: 22,
      columnNumber: 5
    },
    this
  );
}

// app/components/pages/landing/Hero.tsx
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime");
function Hero() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "relative overflow-hidden before:absolute before:top-0 before:left-1/2 before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-56 pb-10", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "flex justify-center", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
      "a",
      {
        className: "inline-flex items-center gap-x-2 bg-slate-100 border border-gray-200 text-sm text-gray-800 p-1 pl-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200",
        href: "#",
        children: [
          "PRO release - Join to waitlist",
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
            "svg",
            {
              className: "w-2.5 h-2.5",
              width: 16,
              height: 16,
              viewBox: "0 0 16 16",
              fill: "none",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                "path",
                {
                  d: "M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  strokeLinecap: "round"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/pages/landing/Hero.tsx",
                  lineNumber: 19,
                  columnNumber: 29
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/landing/Hero.tsx",
              lineNumber: 12,
              columnNumber: 25
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/pages/landing/Hero.tsx",
            lineNumber: 11,
            columnNumber: 21
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/pages/landing/Hero.tsx",
        lineNumber: 6,
        columnNumber: 17
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/pages/landing/Hero.tsx",
      lineNumber: 5,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mt-5 max-w-2xl text-center mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h1", { className: "block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200", children: [
      "Let's Build",
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent", children: "Together" }, void 0, !1, {
        fileName: "app/components/pages/landing/Hero.tsx",
        lineNumber: 34,
        columnNumber: 21
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/pages/landing/Hero.tsx",
      lineNumber: 32,
      columnNumber: 17
    }, this) }, void 0, !1, {
      fileName: "app/components/pages/landing/Hero.tsx",
      lineNumber: 31,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mt-5 max-w-3xl text-center mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", { className: "text-lg text-gray-600 dark:text-gray-400", children: "Preline UI is an open-source set of prebuilt UI components, ready-to-use examples and Figma design system based on the utility-first Tailwind CSS framework." }, void 0, !1, {
      fileName: "app/components/pages/landing/Hero.tsx",
      lineNumber: 41,
      columnNumber: 17
    }, this) }, void 0, !1, {
      fileName: "app/components/pages/landing/Hero.tsx",
      lineNumber: 40,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mt-8 grid gap-3 w-full sm:inline-flex sm:justify-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "a",
        {
          className: "inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-4 dark:focus:ring-offset-gray-800",
          href: "#",
          children: [
            "Get started",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
              "svg",
              {
                className: "w-3 h-3",
                width: 16,
                height: 16,
                viewBox: "0 0 16 16",
                fill: "none",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                  "path",
                  {
                    d: "M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/pages/landing/Hero.tsx",
                    lineNumber: 61,
                    columnNumber: 25
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/pages/landing/Hero.tsx",
                lineNumber: 54,
                columnNumber: 21
              },
              this
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/pages/landing/Hero.tsx",
          lineNumber: 49,
          columnNumber: 17
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "a",
        {
          className: "relative group inline-flex justify-center items-center gap-x-3.5 text-center bg-slate-100 border hover:border-gray-300 shadow-sm font-mono text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition p-2 pl-4 dark:bg-slate-900 dark:border-gray-800 dark:hover:border-gray-600 dark:shadow-slate-700/[.7] dark:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800",
          href: "javascript:;",
          children: [
            "$ npm i preline",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "flex justify-center items-center bg-gray-200 rounded-md w-7 h-7 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
              "svg",
              {
                className: "w-3.5 h-3.5 group-hover:rotate-6 transition",
                width: 16,
                height: 16,
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" }, void 0, !1, {
                    fileName: "app/components/pages/landing/Hero.tsx",
                    lineNumber: 82,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" }, void 0, !1, {
                    fileName: "app/components/pages/landing/Hero.tsx",
                    lineNumber: 83,
                    columnNumber: 29
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/components/pages/landing/Hero.tsx",
                lineNumber: 75,
                columnNumber: 25
              },
              this
            ) }, void 0, !1, {
              fileName: "app/components/pages/landing/Hero.tsx",
              lineNumber: 74,
              columnNumber: 21
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/pages/landing/Hero.tsx",
          lineNumber: 69,
          columnNumber: 17
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/pages/landing/Hero.tsx",
      lineNumber: 48,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", { className: "mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Package Manager:" }, void 0, !1, {
        fileName: "app/components/pages/landing/Hero.tsx",
        lineNumber: 90,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("span", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "npm" }, void 0, !1, {
        fileName: "app/components/pages/landing/Hero.tsx",
        lineNumber: 93,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "svg",
        {
          className: "h-5 w-5 text-gray-300 dark:text-gray-600",
          width: 16,
          height: 16,
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M6 13L10 3", stroke: "currentColor", strokeLinecap: "round" }, void 0, !1, {
            fileName: "app/components/pages/landing/Hero.tsx",
            lineNumber: 105,
            columnNumber: 21
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/pages/landing/Hero.tsx",
          lineNumber: 96,
          columnNumber: 17
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
        "a",
        {
          className: "inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 hover:underline font-medium",
          href: "#",
          children: [
            "Installation Guide",
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
              "svg",
              {
                className: "w-2.5 h-2.5",
                width: 16,
                height: 16,
                viewBox: "0 0 16 16",
                fill: "none",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(
                  "path",
                  {
                    d: "M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/pages/landing/Hero.tsx",
                    lineNumber: 119,
                    columnNumber: 25
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/pages/landing/Hero.tsx",
                lineNumber: 112,
                columnNumber: 21
              },
              this
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/pages/landing/Hero.tsx",
          lineNumber: 107,
          columnNumber: 17
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/pages/landing/Hero.tsx",
      lineNumber: 89,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/pages/landing/Hero.tsx",
    lineNumber: 3,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/pages/landing/Hero.tsx",
    lineNumber: 2,
    columnNumber: 12
  }, this);
}

// app/utils.ts
var import_react8 = require("@remix-run/react"), import_react9 = require("react");
function useMatchesData(id) {
  let matchingRoutes = (0, import_react8.useMatches)(), route = (0, import_react9.useMemo)(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  );
  return route == null ? void 0 : route.data;
}
function isUser(user) {
  return user && typeof user == "object" && typeof user.email == "string";
}
function useOptionalUser() {
  let data = useMatchesData("root");
  if (!(!data || !isUser(data.user)))
    return data.user;
}
function useUser() {
  let maybeUser = useOptionalUser();
  if (!maybeUser)
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  return maybeUser;
}

// app/routes/index.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime");
function Index() {
  let user = useOptionalUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Header, {}, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Hero, {}, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 10,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action4,
  default: () => LoginPage,
  loader: () => loader5,
  meta: () => meta2,
  validator: () => validator
});
var import_react11 = require("@remix-run/react"), import_remix_validated_form3 = require("remix-validated-form");

// app/components/form/InputField.tsx
var import_remix_validated_form = require("remix-validated-form"), import_jsx_dev_runtime7 = require("react/jsx-dev-runtime"), InputField = ({
  name,
  label,
  type = "text",
  defaultValue = "",
  placeholder = ""
}) => {
  let { error, getInputProps } = (0, import_remix_validated_form.useField)(name);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      "label",
      {
        className: "mb-2 block text-sm dark:text-white",
        htmlFor: name,
        children: label
      },
      void 0,
      !1,
      {
        fileName: "app/components/form/InputField.tsx",
        lineNumber: 17,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      "input",
      {
        ...getInputProps({
          id: name
        }),
        placeholder,
        defaultValue,
        type,
        className: "py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      },
      void 0,
      !1,
      {
        fileName: "app/components/form/InputField.tsx",
        lineNumber: 19,
        columnNumber: 13
      },
      this
    ),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      "svg",
      {
        className: "h-5 w-5 text-red-500",
        width: 16,
        height: 16,
        fill: "currentColor",
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" }, void 0, !1, {
          fileName: "app/components/form/InputField.tsx",
          lineNumber: 33,
          columnNumber: 21
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/form/InputField.tsx",
        lineNumber: 25,
        columnNumber: 17
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/form/InputField.tsx",
      lineNumber: 24,
      columnNumber: 23
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)(
      "p",
      {
        className: "mt-2 text-xs text-red-600",
        id: "email-error",
        children: error
      },
      void 0,
      !1,
      {
        fileName: "app/components/form/InputField.tsx",
        lineNumber: 37,
        columnNumber: 17
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/form/InputField.tsx",
    lineNumber: 16,
    columnNumber: 9
  }, this);
}, InputField_default = InputField;

// app/routes/login.tsx
var import_with_zod = require("@remix-validated-form/with-zod"), import_zod = require("zod");

// app/components/form/SubmitButton.tsx
var import_remix_validated_form2 = require("remix-validated-form"), import_react10 = require("@remix-run/react"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime"), SubmitButton = () => {
  let isSubmitting = (0, import_remix_validated_form2.useIsSubmitting)(), {
    submission
  } = (0, import_react10.useTransition)(), isNotDelete = (submission == null ? void 0 : submission.formData.get("action")) !== "delete";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)(
    "button",
    {
      type: "submit",
      className: "inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
      disabled: isSubmitting,
      children: isSubmitting && isNotDelete ? "Submitting..." : "Submit"
    },
    void 0,
    !1,
    {
      fileName: "app/components/form/SubmitButton.tsx",
      lineNumber: 13,
      columnNumber: 9
    },
    this
  );
}, SubmitButton_default = SubmitButton;

// app/routes/login.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), validator = (0, import_with_zod.withZod)(
  import_zod.z.object({
    email: import_zod.z.string().min(1, { message: "Email is required" }).email("Must be a valid email"),
    password: import_zod.z.string().min(8, { message: "Password is too short" })
  })
);
async function loader5({ request }) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/app"
  });
}
async function action4({ request }) {
  let formData = await request.formData(), result = await validator.validate(
    formData
  );
  return result.error ? (0, import_remix_validated_form3.validationError)(result.error) : await authenticator.authenticate("form", request, {
    successRedirect: "/app",
    failureRedirect: "/login?type=error&message=Invalid%20credentials",
    context: {
      formData,
      request
    }
  });
}
var meta2 = () => ({
  title: "Login"
});
function LoginPage() {
  let [searchParams] = (0, import_react11.useSearchParams)(), message = searchParams.get("message"), redirectTo = searchParams.get("redirectTo") || "/app", actionData = (0, import_react11.useActionData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("main", { className: "mx-auto flex h-full w-full max-w-md items-center p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mt-7 rounded-xl border border-gray-200 bg-slate-100 shadow-sm dark:border-gray-700 dark:bg-gray-800", children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "p-4 sm:p-7", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("h1", { className: "block text-2xl font-bold text-gray-800 dark:text-white", children: "Sign in" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 107,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: [
        "Don't have an account yet?",
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          import_react11.Link,
          {
            className: "font-medium text-blue-600 decoration-2 hover:underline ml-1",
            to: "/join",
            children: "Sign up here"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 112,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 110,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 106,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "mt-5", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
        "button",
        {
          type: "button",
          className: "inline-flex w-full items-center justify-center gap-2 rounded-md border bg-slate-100 py-3 px-4 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
              "svg",
              {
                className: "h-auto w-4",
                width: 46,
                height: 47,
                viewBox: "0 0 46 47",
                fill: "none",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                    "path",
                    {
                      d: "M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z",
                      fill: "#4285F4"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 132,
                      columnNumber: 17
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                    "path",
                    {
                      d: "M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z",
                      fill: "#34A853"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 136,
                      columnNumber: 17
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                    "path",
                    {
                      d: "M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z",
                      fill: "#FBBC05"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 140,
                      columnNumber: 17
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
                    "path",
                    {
                      d: "M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z",
                      fill: "#EB4335"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/login.tsx",
                      lineNumber: 144,
                      columnNumber: 17
                    },
                    this
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/login.tsx",
                lineNumber: 125,
                columnNumber: 15
              },
              this
            ),
            "Sign in with Google"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 121,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600", children: "Or" }, void 0, !1, {
        fileName: "app/routes/login.tsx",
        lineNumber: 151,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_remix_validated_form3.ValidatedForm, { validator, method: "post", className: "space-y-5", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          InputField_default,
          {
            label: "Email",
            type: "email",
            name: "email"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 157,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(
          InputField_default,
          {
            label: "Password",
            type: "password",
            name: "password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 162,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(SubmitButton_default, {}, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 167,
          columnNumber: 15
        }, this),
        message && /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", { className: "bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4", role: "alert", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("span", { className: "font-bold", children: "Error" }, void 0, !1, {
            fileName: "app/routes/login.tsx",
            lineNumber: 170,
            columnNumber: 19
          }, this),
          " ",
          message
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 169,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 154,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 120,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 105,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 104,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 103,
    columnNumber: 5
  }, this);
}

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  action: () => action5,
  default: () => Join,
  loader: () => loader6,
  meta: () => meta3,
  validator: () => validator2
});
var import_node10 = require("@remix-run/node"), import_react12 = require("@remix-run/react");

// app/session.server.ts
var import_node9 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage2 = (0, import_node9.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage2.getSession(cookie);
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), (0, import_node9.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage2.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}

// app/routes/join.tsx
var import_with_zod2 = require("@remix-validated-form/with-zod"), import_zod2 = require("zod");
var import_remix_validated_form4 = require("remix-validated-form");
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime"), validator2 = (0, import_with_zod2.withZod)(
  import_zod2.z.object({
    email: import_zod2.z.string().min(1, { message: "Email is required" }).email("Must be a valid email"),
    password: import_zod2.z.string().min(8, { message: "Password is too short" }),
    confirmPassword: import_zod2.z.string().min(8, { message: "Password is too short" })
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  })
);
async function loader6({ request }) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/app"
  });
}
async function action5({ request }) {
  let formData = await request.formData(), result = await validator2.validate(
    formData
  );
  if (console.log(result.error), result.error)
    return (0, import_remix_validated_form4.validationError)(result.error);
  if (await getUserByEmail(result.data.email))
    return (0, import_node10.json)(
      {
        error: "A user already exists with this email"
      },
      { status: 400 }
    );
  let user = await createUser(result.data.email, result.data.password);
  return createUserSession({
    request,
    userId: user.id,
    remember: !1,
    redirectTo: "/app"
  });
}
var meta3 = () => ({
  title: "Sign Up"
});
function Join() {
  let [searchParams] = (0, import_react12.useSearchParams)(), redirectTo = searchParams.get("redirectTo") ?? void 0, actionData = (0, import_react12.useActionData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("main", { className: "mx-auto flex h-full w-full max-w-md items-center p-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "mt-7 rounded-xl border border-gray-200 bg-slate-100 shadow-sm dark:border-gray-700 dark:bg-gray-800", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "p-4 sm:p-7", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "text-center", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h1", { className: "block text-2xl font-bold text-gray-800 dark:text-white", children: "Sign up" }, void 0, !1, {
        fileName: "app/routes/join.tsx",
        lineNumber: 86,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: [
        "Already have an account?",
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          import_react12.Link,
          {
            className: "font-medium text-blue-600 decoration-2 hover:underline ml-1",
            to: "/login",
            children: "Sign in here"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 91,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 89,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 85,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "mt-5", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
        "button",
        {
          type: "button",
          className: "inline-flex w-full items-center justify-center gap-2 rounded-md border bg-slate-100 py-3 px-4 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
              "svg",
              {
                className: "h-auto w-4",
                width: 46,
                height: 47,
                viewBox: "0 0 46 47",
                fill: "none",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
                    "path",
                    {
                      d: "M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z",
                      fill: "#4285F4"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/join.tsx",
                      lineNumber: 111,
                      columnNumber: 17
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
                    "path",
                    {
                      d: "M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z",
                      fill: "#34A853"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/join.tsx",
                      lineNumber: 115,
                      columnNumber: 17
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
                    "path",
                    {
                      d: "M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z",
                      fill: "#FBBC05"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/join.tsx",
                      lineNumber: 119,
                      columnNumber: 17
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
                    "path",
                    {
                      d: "M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z",
                      fill: "#EB4335"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/routes/join.tsx",
                      lineNumber: 123,
                      columnNumber: 17
                    },
                    this
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/routes/join.tsx",
                lineNumber: 104,
                columnNumber: 15
              },
              this
            ),
            "Sign up with Google"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 100,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center py-3 text-xs uppercase text-gray-400 before:mr-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ml-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600", children: "Or" }, void 0, !1, {
        fileName: "app/routes/join.tsx",
        lineNumber: 130,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_remix_validated_form4.ValidatedForm, { validator: validator2, method: "post", className: "space-y-5", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          InputField_default,
          {
            label: "Email",
            type: "email",
            name: "email"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 137,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          InputField_default,
          {
            label: "Password",
            type: "password",
            name: "password"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 142,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
          InputField_default,
          {
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 147,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "flex", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
            "input",
            {
              required: !0,
              id: "remember-me",
              name: "remember-me",
              type: "checkbox",
              className: "pointer-events-none mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/join.tsx",
              lineNumber: 154,
              columnNumber: 19
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/join.tsx",
            lineNumber: 153,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
            "label",
            {
              htmlFor: "remember-me",
              className: "text-sm dark:text-white",
              children: [
                "I accept the",
                " ",
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(
                  "a",
                  {
                    className: "font-medium text-blue-600 decoration-2 hover:underline",
                    href: "#",
                    children: "Terms and Conditions"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/join.tsx",
                    lineNumber: 167,
                    columnNumber: 21
                  },
                  this
                )
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/routes/join.tsx",
              lineNumber: 162,
              columnNumber: 19
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/join.tsx",
            lineNumber: 161,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/join.tsx",
          lineNumber: 152,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(SubmitButton_default, {}, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 176,
          columnNumber: 15
        }, this),
        (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", { className: "bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4", role: "alert", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", { className: "font-bold", children: "Error" }, void 0, !1, {
            fileName: "app/routes/join.tsx",
            lineNumber: 179,
            columnNumber: 19
          }, this),
          " ",
          actionData == null ? void 0 : actionData.error
        ] }, void 0, !0, {
          fileName: "app/routes/join.tsx",
          lineNumber: 178,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 134,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 99,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 84,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 83,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 82,
    columnNumber: 5
  }, this);
}

// app/routes/app.tsx
var app_exports = {};
__export(app_exports, {
  default: () => NotesPage,
  loader: () => loader7
});
var import_node11 = require("@remix-run/node"), import_react15 = require("@remix-run/react");

// app/components/dashboard-layout/navbar/AccountDropdown.tsx
var import_react13 = require("@remix-run/react"), import_bi = require("react-icons/bi");

// app/components/Avatar.tsx
var AvatarPrimitive = __toESM(require("@radix-ui/react-avatar")), import_clsx3 = __toESM(require("clsx")), import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), Avatar = ({
  className = "",
  initials,
  imgSrc
}) => /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(AvatarPrimitive.Root, { className: (0, import_clsx3.default)("bg-slate-800 dark:bg-slate-100 inline-flex select-none items-center justify-center overflow-hidden align-middle h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-slate-800", className), children: [
  /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
    AvatarPrimitive.Image,
    {
      className: "h-full w-full rounded-[inherit] object-cover",
      src: imgSrc,
      alt: "User avatar"
    },
    void 0,
    !1,
    {
      fileName: "app/components/Avatar.tsx",
      lineNumber: 14,
      columnNumber: 9
    },
    this
  ),
  /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(
    AvatarPrimitive.Fallback,
    {
      className: "text-slate-800 leading-1 flex h-full w-full items-center justify-center bg-slate-100 text-[15px] font-medium",
      delayMs: 600,
      children: initials
    },
    void 0,
    !1,
    {
      fileName: "app/components/Avatar.tsx",
      lineNumber: 19,
      columnNumber: 9
    },
    this
  )
] }, void 0, !0, {
  fileName: "app/components/Avatar.tsx",
  lineNumber: 13,
  columnNumber: 5
}, this), Avatar_default = Avatar;

// app/components/dashboard-layout/navbar/AccountDropdown.tsx
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime");
function AccountDropdown({
  avatar,
  email
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "hs-dropdown relative inline-flex [--placement:bottom-right]", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
      "button",
      {
        id: "hs-dropdown-with-header",
        type: "button",
        className: "hs-dropdown-toggle inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-slate-100 align-middle text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-slate-700 dark:focus:ring-offset-slate-800",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
          Avatar_default,
          {
            imgSrc: avatar,
            initials: email.slice(0, 2).toUpperCase()
          },
          void 0,
          !1,
          {
            fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
            lineNumber: 18,
            columnNumber: 13
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
        lineNumber: 13,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
      "div",
      {
        className: "hs-dropdown-menu duration hidden min-w-[15rem] rounded-lg bg-slate-100 p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:border dark:border-slate-700 dark:bg-slate-800",
        "aria-labelledby": "hs-dropdown-with-header",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "-m-2 rounded-t-lg bg-slate-100 py-3 px-5 dark:bg-slate-700", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Signed in as" }, void 0, !1, {
              fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
              lineNumber: 28,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", { className: "text-sm font-medium text-slate-800 dark:text-slate-300", children: email }, void 0, !1, {
              fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
              lineNumber: 31,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
            lineNumber: 27,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", { className: "mt-2 py-2 first:pt-0 last:pb-0", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
              "a",
              {
                className: "flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-slate-800 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300",
                href: "#",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
                    "svg",
                    {
                      className: "flex-none",
                      width: 16,
                      height: 16,
                      viewBox: "0 0 16 16",
                      fill: "currentColor",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("path", { d: "M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" }, void 0, !1, {
                        fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
                        lineNumber: 47,
                        columnNumber: 25
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
                      lineNumber: 40,
                      columnNumber: 21
                    },
                    this
                  ),
                  "Newsletter"
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
                lineNumber: 36,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_react13.Form, { method: "post", action: "/logout", children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(
              "button",
              {
                className: "w-full flex items-center gap-x-3.5 rounded-md py-2 px-3 text-sm text-slate-800 hover:bg-slate-100 focus:ring-2 focus:ring-blue-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-300",
                type: "submit",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_bi.BiLogOut, {}, void 0, !1, {
                    fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
                    lineNumber: 56,
                    columnNumber: 25
                  }, this),
                  "Sign out"
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
                lineNumber: 52,
                columnNumber: 21
              },
              this
            ) }, void 0, !1, {
              fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
              lineNumber: 51,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
            lineNumber: 35,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
        lineNumber: 23,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/dashboard-layout/navbar/AccountDropdown.tsx",
    lineNumber: 12,
    columnNumber: 12
  }, this);
}

// app/components/dashboard-layout/Navbar.tsx
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime");
function Navbar() {
  let user = useUser(), [theme, setTheme] = useTheme();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("header", { className: "sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-slate-100 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-nowrap sm:justify-start sm:py-4 lg:pl-64", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
    "nav",
    {
      className: "mx-auto flex w-full basis-full items-center px-4 sm:px-6 md:px-8",
      "aria-label": "Global",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "mr-5 lg:mr-0 lg:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
          "a",
          {
            className: "flex-none text-xl font-semibold dark:text-white",
            href: "#",
            "aria-label": "Brand",
            children: "Brand"
          },
          void 0,
          !1,
          {
            fileName: "app/components/dashboard-layout/Navbar.tsx",
            lineNumber: 22,
            columnNumber: 17
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/dashboard-layout/Navbar.tsx",
          lineNumber: 21,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "ml-auto flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
            "button",
            {
              type: "button",
              className: "inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-slate-100 align-middle text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-slate-700 dark:focus:ring-offset-slate-800",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                "svg",
                {
                  className: "h-3.5 w-3.5",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: 16,
                  height: 16,
                  fill: "currentColor",
                  viewBox: "0 0 16 16",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("path", { d: "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" }, void 0, !1, {
                    fileName: "app/components/dashboard-layout/Navbar.tsx",
                    lineNumber: 44,
                    columnNumber: 29
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/components/dashboard-layout/Navbar.tsx",
                  lineNumber: 36,
                  columnNumber: 25
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/dashboard-layout/Navbar.tsx",
              lineNumber: 32,
              columnNumber: 21
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/dashboard-layout/Navbar.tsx",
            lineNumber: 31,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "hidden sm:block", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("label", { htmlFor: "icon", className: "sr-only", children: "Search" }, void 0, !1, {
              fileName: "app/components/dashboard-layout/Navbar.tsx",
              lineNumber: 49,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "relative", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                "svg",
                {
                  className: "h-4 w-4 text-slate-400",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: 16,
                  height: 16,
                  fill: "currentColor",
                  viewBox: "0 0 16 16",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("path", { d: "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" }, void 0, !1, {
                    fileName: "app/components/dashboard-layout/Navbar.tsx",
                    lineNumber: 62,
                    columnNumber: 33
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/components/dashboard-layout/Navbar.tsx",
                  lineNumber: 54,
                  columnNumber: 29
                },
                this
              ) }, void 0, !1, {
                fileName: "app/components/dashboard-layout/Navbar.tsx",
                lineNumber: 53,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                "input",
                {
                  type: "text",
                  id: "icon",
                  name: "icon",
                  className: "block w-full bg-slate-100 rounded-md border-slate-200 py-2 px-4 pl-11 text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
                  placeholder: "Search"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/dashboard-layout/Navbar.tsx",
                  lineNumber: 65,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/dashboard-layout/Navbar.tsx",
              lineNumber: 52,
              columnNumber: 21
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/dashboard-layout/Navbar.tsx",
            lineNumber: 48,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", { className: "flex flex-row items-center justify-end gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
              "button",
              {
                onClick: () => {
                  setTheme(
                    (prevTheme) => prevTheme === "light" /* LIGHT */ ? "dark" /* DARK */ : "light" /* LIGHT */
                  );
                },
                type: "button",
                className: "inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-slate-100 align-middle text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-slate-700 dark:focus:ring-offset-slate-800",
                children: theme === "light" /* LIGHT */ ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    className: "h-3.5 w-3.5",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/dashboard-layout/Navbar.tsx",
                        lineNumber: 89,
                        columnNumber: 33
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/dashboard-layout/Navbar.tsx",
                    lineNumber: 81,
                    columnNumber: 29
                  },
                  this
                ) : /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: 1.5,
                    stroke: "currentColor",
                    className: "h-3.5 w-3.5",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                      "path",
                      {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/dashboard-layout/Navbar.tsx",
                        lineNumber: 104,
                        columnNumber: 33
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/dashboard-layout/Navbar.tsx",
                    lineNumber: 96,
                    columnNumber: 29
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/dashboard-layout/Navbar.tsx",
                lineNumber: 75,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
              "button",
              {
                type: "button",
                className: "inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-slate-100 align-middle text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-slate-700 dark:focus:ring-offset-slate-800",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                  "svg",
                  {
                    className: "h-3.5 w-3.5",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: 16,
                    height: 16,
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("path", { d: "M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" }, void 0, !1, {
                      fileName: "app/components/dashboard-layout/Navbar.tsx",
                      lineNumber: 125,
                      columnNumber: 29
                    }, this)
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/dashboard-layout/Navbar.tsx",
                    lineNumber: 117,
                    columnNumber: 25
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/dashboard-layout/Navbar.tsx",
                lineNumber: 113,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
              "button",
              {
                type: "button",
                className: "hs-dropdown-toggle inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-slate-100 align-middle text-xs font-medium text-slate-700 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-slate-700 dark:focus:ring-offset-slate-800",
                "data-hs-offcanvas": "#hs-offcanvas-right",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
                  "svg",
                  {
                    className: "h-3.5 w-3.5",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: 16,
                    height: 16,
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("path", { d: "M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" }, void 0, !1, {
                        fileName: "app/components/dashboard-layout/Navbar.tsx",
                        lineNumber: 141,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("path", { d: "M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" }, void 0, !1, {
                        fileName: "app/components/dashboard-layout/Navbar.tsx",
                        lineNumber: 142,
                        columnNumber: 29
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/components/dashboard-layout/Navbar.tsx",
                    lineNumber: 133,
                    columnNumber: 25
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/dashboard-layout/Navbar.tsx",
                lineNumber: 128,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(
              AccountDropdown,
              {
                avatar: user.avatar,
                email: user.email
              },
              void 0,
              !1,
              {
                fileName: "app/components/dashboard-layout/Navbar.tsx",
                lineNumber: 145,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/components/dashboard-layout/Navbar.tsx",
            lineNumber: 74,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/dashboard-layout/Navbar.tsx",
          lineNumber: 30,
          columnNumber: 13
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/dashboard-layout/Navbar.tsx",
      lineNumber: 17,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/dashboard-layout/Navbar.tsx",
    lineNumber: 16,
    columnNumber: 12
  }, this);
}

// app/components/dashboard-layout/Sidebar.tsx
var import_react14 = require("@remix-run/react"), import_ai = require("react-icons/ai"), import_hi = require("react-icons/hi"), import_bi2 = require("react-icons/bi"), import_jsx_dev_runtime14 = require("react/jsx-dev-runtime"), SIDEBAR_LINKS = [
  {
    title: "Dashboard",
    href: "/app",
    icon: import_ai.AiOutlineHome
  },
  {
    title: "Expenses",
    href: "/app/expenses",
    icon: import_bi2.BiTransfer,
    children: [
      {
        title: "Overview",
        href: "/app/expenses"
      },
      {
        title: "Add Expense",
        href: "/app/expenses/new"
      }
    ]
  },
  {
    title: "Investments",
    href: "/app/investments",
    icon: import_ai.AiOutlineLineChart,
    children: [
      {
        title: "Overview",
        href: "/app/investments"
      },
      {
        title: "Add Investment",
        href: "/app/investments/new"
      }
    ]
  },
  {
    title: "Groups",
    href: "/app/groups",
    icon: import_hi.HiOutlineUserGroup,
    children: [
      {
        title: "Overview",
        href: "/app/groups"
      },
      {
        title: "Add Group",
        href: "/app/groups/new"
      }
    ]
  },
  {
    icon: import_hi.HiOutlineCog,
    title: "Settings",
    href: "/app/settings"
  }
];
function Sidebar() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "sticky inset-x-0 top-0 z-20 border-y bg-slate-100 px-4 dark:border-slate-700 dark:bg-slate-800 sm:px-6 md:px-8 lg:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "flex items-center py-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        "button",
        {
          type: "button",
          className: "text-slate-500 hover:text-slate-600",
          "data-hs-overlay": "#application-sidebar",
          "aria-controls": "application-sidebar",
          "aria-label": "Toggle navigation",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", { className: "sr-only", children: "Toggle Navigation" }, void 0, !1, {
              fileName: "app/components/dashboard-layout/Sidebar.tsx",
              lineNumber: 76,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
              "svg",
              {
                className: "h-5 w-5",
                width: 16,
                height: 16,
                fill: "currentColor",
                viewBox: "0 0 16 16",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                  "path",
                  {
                    fillRule: "evenodd",
                    d: "M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/dashboard-layout/Sidebar.tsx",
                    lineNumber: 84,
                    columnNumber: 25
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/dashboard-layout/Sidebar.tsx",
                lineNumber: 77,
                columnNumber: 21
              },
              this
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/dashboard-layout/Sidebar.tsx",
          lineNumber: 69,
          columnNumber: 17
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
        "ol",
        {
          className: "ml-3 flex min-w-0 items-center whitespace-nowrap",
          "aria-label": "Breadcrumb",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("li", { className: "flex items-center text-sm text-slate-800 dark:text-slate-400", children: [
              "Application Layout",
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                "svg",
                {
                  className: "mx-3 h-2.5 w-2.5 flex-shrink-0 overflow-visible text-slate-400 dark:text-slate-600",
                  width: 16,
                  height: 16,
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                    "path",
                    {
                      d: "M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/dashboard-layout/Sidebar.tsx",
                      lineNumber: 106,
                      columnNumber: 29
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/dashboard-layout/Sidebar.tsx",
                  lineNumber: 98,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/dashboard-layout/Sidebar.tsx",
              lineNumber: 96,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
              "li",
              {
                className: "truncate text-sm font-semibold text-slate-800 dark:text-slate-400",
                "aria-current": "page",
                children: "Dashboard"
              },
              void 0,
              !1,
              {
                fileName: "app/components/dashboard-layout/Sidebar.tsx",
                lineNumber: 114,
                columnNumber: 21
              },
              this
            )
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/dashboard-layout/Sidebar.tsx",
          lineNumber: 92,
          columnNumber: 17
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/dashboard-layout/Sidebar.tsx",
      lineNumber: 67,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/components/dashboard-layout/Sidebar.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
      "div",
      {
        id: "application-sidebar",
        className: "hs-overlay scrollbar-y dark:scrollbar-y fixed top-0 left-0 bottom-0 z-[60] hidden w-64 -translate-x-full transform overflow-y-auto border-r border-slate-200 bg-slate-100 pt-7 pb-10 transition-all duration-300 hs-overlay-open:translate-x-0 dark:border-slate-700 dark:bg-slate-800 lg:right-auto lg:bottom-0 lg:block lg:translate-x-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", { className: "px-6", children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
            import_react14.Link,
            {
              className: "flex-none text-xl font-semibold dark:text-white",
              to: ".",
              "aria-label": "Brand",
              children: "Brand"
            },
            void 0,
            !1,
            {
              fileName: "app/components/dashboard-layout/Sidebar.tsx",
              lineNumber: 131,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "app/components/dashboard-layout/Sidebar.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
            "nav",
            {
              className: "hs-accordion-group flex w-full flex-col flex-wrap p-6",
              "data-hs-accordion-always-open": "",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("ul", { className: "space-y-1.5", children: SIDEBAR_LINKS.map((link, index) => {
                let { title, href, children, icon } = link;
                return children ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("li", { className: "hs-accordion", id: "users-accordion", children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                    "button",
                    {
                      className: "w-full hs-accordion-toggle flex items-center gap-x-3.5 rounded-md py-2 px-2.5 text-sm text-slate-700 hover:bg-slate-100 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-300 dark:hs-accordion-active:text-white",
                      children: [
                        icon({
                          className: "h-3.5 w-3.5"
                        }),
                        title,
                        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                          "svg",
                          {
                            className: "ml-auto hidden h-3 w-3 text-slate-600 group-hover:text-slate-500 hs-accordion-active:block dark:text-slate-400",
                            width: 16,
                            height: 16,
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                              "path",
                              {
                                d: "M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                strokeLinecap: "round"
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/components/dashboard-layout/Sidebar.tsx",
                                lineNumber: 184,
                                columnNumber: 45
                              },
                              this
                            )
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/components/dashboard-layout/Sidebar.tsx",
                            lineNumber: 176,
                            columnNumber: 41
                          },
                          this
                        ),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                          "svg",
                          {
                            className: "ml-auto block h-3 w-3 text-slate-600 group-hover:text-slate-500 hs-accordion-active:hidden dark:text-slate-400",
                            width: 16,
                            height: 16,
                            viewBox: "0 0 16 16",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                              "path",
                              {
                                d: "M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5",
                                stroke: "currentColor",
                                strokeWidth: 2,
                                strokeLinecap: "round"
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/components/dashboard-layout/Sidebar.tsx",
                                lineNumber: 199,
                                columnNumber: 45
                              },
                              this
                            )
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/components/dashboard-layout/Sidebar.tsx",
                            lineNumber: 191,
                            columnNumber: 41
                          },
                          this
                        )
                      ]
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/components/dashboard-layout/Sidebar.tsx",
                      lineNumber: 167,
                      columnNumber: 37
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                    "div",
                    {
                      id: "users-accordion-child",
                      className: "hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                        "ul",
                        {
                          className: "hs-accordion-group pl-3 pt-2",
                          "data-hs-accordion-always-open": "",
                          children: children.map((child, index2) => {
                            let { title: title2, href: href2 } = child;
                            return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                              import_react14.Link,
                              {
                                to: href2,
                                className: "flex items-center gap-x-3.5 rounded-md py-2 px-2.5 text-sm text-slate-700 hover:bg-slate-100 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-300 dark:hs-accordion-active:text-white",
                                children: title2
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/components/dashboard-layout/Sidebar.tsx",
                                lineNumber: 219,
                                columnNumber: 57
                              },
                              this
                            ) }, index2, !1, {
                              fileName: "app/components/dashboard-layout/Sidebar.tsx",
                              lineNumber: 218,
                              columnNumber: 53
                            }, this);
                          })
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/dashboard-layout/Sidebar.tsx",
                          lineNumber: 211,
                          columnNumber: 41
                        },
                        this
                      )
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/dashboard-layout/Sidebar.tsx",
                      lineNumber: 207,
                      columnNumber: 37
                    },
                    this
                  )
                ] }, index, !0, {
                  fileName: "app/components/dashboard-layout/Sidebar.tsx",
                  lineNumber: 166,
                  columnNumber: 33
                }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(
                  import_react14.Link,
                  {
                    className: "flex items-center gap-x-3.5 rounded-md py-2 px-2.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-300",
                    to: href,
                    children: [
                      icon({
                        className: "h-3.5 w-3.5"
                      }),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("span", { children: title }, void 0, !1, {
                        fileName: "app/components/dashboard-layout/Sidebar.tsx",
                        lineNumber: 160,
                        columnNumber: 45
                      }, this)
                    ]
                  },
                  void 0,
                  !0,
                  {
                    fileName: "app/components/dashboard-layout/Sidebar.tsx",
                    lineNumber: 150,
                    columnNumber: 41
                  },
                  this
                ) }, index, !1, {
                  fileName: "app/components/dashboard-layout/Sidebar.tsx",
                  lineNumber: 149,
                  columnNumber: 37
                }, this);
              }) }, void 0, !1, {
                fileName: "app/components/dashboard-layout/Sidebar.tsx",
                lineNumber: 143,
                columnNumber: 17
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/components/dashboard-layout/Sidebar.tsx",
              lineNumber: 139,
              columnNumber: 13
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/dashboard-layout/Sidebar.tsx",
        lineNumber: 126,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/dashboard-layout/Sidebar.tsx",
    lineNumber: 65,
    columnNumber: 12
  }, this);
}

// app/routes/app.tsx
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
async function loader7({ request }) {
  let { id } = await requireUserId(request);
  return (0, import_node11.json)({});
}
function NotesPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_jsx_dev_runtime15.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(Navbar, {}, void 0, !1, {
      fileName: "app/routes/app.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(Sidebar, {}, void 0, !1, {
      fileName: "app/routes/app.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", { className: "min-h-screen w-full bg-slate-100 px-4 pt-10 dark:bg-slate-900 sm:px-6 md:px-8 lg:pl-72", children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_react15.Outlet, {}, void 0, !1, {
      fileName: "app/routes/app.tsx",
      lineNumber: 22,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/app.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/app.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}

// app/routes/app/investments.tsx
var investments_exports = {};
__export(investments_exports, {
  default: () => NoteIndexPage,
  loader: () => loader8
});

// app/components/Table.tsx
var import_react16 = require("@remix-run/react"), import_react_table = require("@tanstack/react-table"), import_clsx4 = __toESM(require("clsx")), import_jsx_dev_runtime16 = require("react/jsx-dev-runtime");
function Table({
  title,
  label,
  pluralLabel,
  icon,
  subtitle,
  createUrl,
  showInsights = !1,
  insights,
  individualUrl,
  data = [],
  columns = []
}) {
  let navigate = (0, import_react16.useNavigate)(), table = (0, import_react_table.useReactTable)({
    data,
    columns,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)(),
    getSortedRowModel: (0, import_react_table.getSortedRowModel)(),
    getFilteredRowModel: (0, import_react_table.getFilteredRowModel)(),
    getPaginationRowModel: (0, import_react_table.getPaginationRowModel)()
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex flex-col text-slate-800 dark:text-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "-m-1.5 overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "inline-block min-w-full p-1.5 align-middle", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-900", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "grid gap-3 border-b border-slate-200 px-6 py-4 dark:border-slate-700 md:flex md:items-center md:justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("h2", { className: "text-xl font-semibold text-slate-800 dark:text-slate-200", children: title }, void 0, !1, {
          fileName: "app/components/Table.tsx",
          lineNumber: 52,
          columnNumber: 29
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: subtitle }, void 0, !1, {
          fileName: "app/components/Table.tsx",
          lineNumber: 55,
          columnNumber: 29
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/Table.tsx",
        lineNumber: 51,
        columnNumber: 25
      }, this),
      data.length !== 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "inline-flex gap-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          "a",
          {
            className: "inline-flex items-center justify-center gap-2 rounded-md border bg-slate-100 py-2 px-3 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800",
            href: "#",
            children: "View all"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Table.tsx",
            lineNumber: 61,
            columnNumber: 33
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          import_react16.Link,
          {
            className: "inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-2 px-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800",
            to: createUrl,
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                "svg",
                {
                  className: "h-3 w-3",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: 16,
                  height: 16,
                  viewBox: "0 0 16 16",
                  fill: "none",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                    "path",
                    {
                      d: "M2.63452 7.50001L13.6345 7.5M8.13452 13V2",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Table.tsx",
                      lineNumber: 79,
                      columnNumber: 41
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/Table.tsx",
                  lineNumber: 71,
                  columnNumber: 37
                },
                this
              ),
              "Create"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Table.tsx",
            lineNumber: 67,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Table.tsx",
        lineNumber: 60,
        columnNumber: 29
      }, this) }, void 0, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 59,
        columnNumber: 47
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Table.tsx",
      lineNumber: 50,
      columnNumber: 21
    }, this),
    showInsights && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "border-b border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "button",
        {
          type: "button",
          className: "hs-collapse-toggle flex w-full items-center gap-2 py-4 px-6 font-semibold text-slate-800 dark:text-slate-200",
          id: "hs-basic-collapse",
          "data-hs-collapse": "#hs-as-table-collapse",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
              "svg",
              {
                className: "h-2.5 w-2.5 hs-collapse-open:rotate-90",
                width: 16,
                height: 16,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                  "path",
                  {
                    d: "M4.50598 2L10.1524 7.64645C10.3477 7.84171 10.3477 8.15829 10.1524 8.35355L4.50598 14",
                    stroke: "currentColor",
                    strokeWidth: 2,
                    strokeLinecap: "round"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/Table.tsx",
                    lineNumber: 109,
                    columnNumber: 37
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/Table.tsx",
                lineNumber: 101,
                columnNumber: 33
              },
              this
            ),
            "Insights"
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/Table.tsx",
          lineNumber: 95,
          columnNumber: 29
        },
        this
      ),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "div",
        {
          id: "hs-as-table-collapse",
          className: "hs-collapse hidden w-full overflow-hidden transition-[height] duration-300",
          "aria-labelledby": "hs-basic-collapse",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "px-6 pb-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
              "svg",
              {
                className: "h-5 w-5 flex-shrink-0",
                width: 16,
                height: 16,
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                    "path",
                    {
                      d: "M15.1965 7.85999C15.1965 3.71785 11.8387 0.359985 7.69653 0.359985C3.5544 0.359985 0.196533 3.71785 0.196533 7.85999C0.196533 12.0021 3.5544 15.36 7.69653 15.36C11.8387 15.36 15.1965 12.0021 15.1965 7.85999Z",
                      fill: "currentColor",
                      className: "fill-blue-500"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Table.tsx",
                      lineNumber: 133,
                      columnNumber: 45
                    },
                    this
                  ),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                    "path",
                    {
                      d: "M10.9295 4.88618C11.1083 4.67577 11.4238 4.65019 11.6343 4.82904C11.8446 5.00788 11.8702 5.32343 11.6914 5.53383L7.44139 10.5338C7.25974 10.7475 6.93787 10.77 6.72825 10.5837L4.47825 8.5837C4.27186 8.40024 4.25327 8.0842 4.43673 7.87781C4.62019 7.67142 4.93622 7.65283 5.14261 7.83629L7.01053 9.49669L10.9295 4.88618Z",
                      fill: "currentColor",
                      className: "fill-white"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Table.tsx",
                      lineNumber: 138,
                      columnNumber: 45
                    },
                    this
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/components/Table.tsx",
                lineNumber: 125,
                columnNumber: 41
              },
              this
            ),
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("span", { className: "text-sm text-slate-800 dark:text-slate-400", children: "There are no insights for this period." }, void 0, !1, {
              fileName: "app/components/Table.tsx",
              lineNumber: 144,
              columnNumber: 41
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/Table.tsx",
            lineNumber: 124,
            columnNumber: 37
          }, this) }, void 0, !1, {
            fileName: "app/components/Table.tsx",
            lineNumber: 123,
            columnNumber: 33
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/Table.tsx",
          lineNumber: 118,
          columnNumber: 29
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/Table.tsx",
      lineNumber: 94,
      columnNumber: 25
    }, this),
    data.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "mx-auto flex min-h-[400px] w-full max-w-sm flex-col justify-center px-6 py-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex h-[46px] w-[46px] items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800", children: icon({
        className: "h-6 w-6 text-gray-600 dark:text-gray-400"
      }) }, void 0, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 154,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("h2", { className: "mt-5 font-semibold text-gray-800 dark:text-white", children: `No ${pluralLabel} yet` }, void 0, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 159,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: `You haven't created any ${pluralLabel} yet. Click the button below to create your first ${label}.` }, void 0, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 162,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "mt-5 grid gap-2 sm:flex", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          import_react16.Link,
          {
            to: createUrl,
            className: "inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-2 px-3 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                "svg",
                {
                  className: "h-3 w-3",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: 16,
                  height: 16,
                  viewBox: "0 0 16 16",
                  fill: "none",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                    "path",
                    {
                      d: "M2.63452 7.50001L13.6345 7.5M8.13452 13V2",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Table.tsx",
                      lineNumber: 200,
                      columnNumber: 41
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/Table.tsx",
                  lineNumber: 192,
                  columnNumber: 37
                },
                this
              ),
              "Create a new ",
              label
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Table.tsx",
            lineNumber: 188,
            columnNumber: 33
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          "button",
          {
            type: "button",
            className: "inline-flex items-center justify-center gap-2 rounded-md border bg-slate-100 py-2 px-3 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-gray-800",
            children: "Use a Template"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Table.tsx",
            lineNumber: 209,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Table.tsx",
        lineNumber: 187,
        columnNumber: 29
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Table.tsx",
      lineNumber: 153,
      columnNumber: 25
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("table", { className: "min-w-full divide-y divide-slate-200 dark:divide-slate-700", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("thead", { className: "bg-slate-50 dark:bg-slate-900", children: table.getHeaderGroups().map((headerGroup, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tr", { children: headerGroup.headers.map((header, idx2) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
        "th",
        {
          onClick: header.column.getToggleSortingHandler(),
          className: (0, import_clsx4.default)("px-6 py-3 capitalize text-left", {
            "cursor-pointer select-none": header.column.getCanSort()
          }),
          colSpan: header.colSpan,
          children: header.isPlaceholder ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex gap-2 items-center", children: [
            (0, import_react_table.flexRender)(
              header.column.columnDef.header,
              header.getContext()
            ),
            header.column.getCanSort() && /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "flex flex-col gap-0.5 items-center justify-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                "button",
                {
                  className: (0, import_clsx4.default)({
                    "text-[#669DCB]": header.column.getIsSorted() === "asc",
                    "text-grey-600": header.column.getIsSorted() !== "asc"
                  }),
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "8",
                      height: "4",
                      fill: "none",
                      viewBox: "0 0 11 5",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("path", { fill: "currentColor", d: "M10.333 5l-5-5-5 5" }, void 0, !1, {
                        fileName: "app/components/Table.tsx",
                        lineNumber: 249,
                        columnNumber: 77
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Table.tsx",
                      lineNumber: 242,
                      columnNumber: 73
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/Table.tsx",
                  lineNumber: 236,
                  columnNumber: 69
                },
                this
              ),
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                "button",
                {
                  className: (0, import_clsx4.default)({
                    "text-[#669DCB]": header.column.getIsSorted() === "desc",
                    "text-grey-600": header.column.getIsSorted() !== "desc"
                  }),
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "8",
                      height: "4",
                      fill: "none",
                      viewBox: "0 0 11 5",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("path", { fill: "currentColor", d: "M.333 0l5 5 5-5" }, void 0, !1, {
                        fileName: "app/components/Table.tsx",
                        lineNumber: 266,
                        columnNumber: 77
                      }, this)
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Table.tsx",
                      lineNumber: 259,
                      columnNumber: 73
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/Table.tsx",
                  lineNumber: 252,
                  columnNumber: 69
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "app/components/Table.tsx",
              lineNumber: 235,
              columnNumber: 65
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/Table.tsx",
            lineNumber: 229,
            columnNumber: 57
          }, this)
        },
        idx2,
        !1,
        {
          fileName: "app/components/Table.tsx",
          lineNumber: 224,
          columnNumber: 49
        },
        this
      )) }, idx, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 221,
        columnNumber: 37
      }, this)) }, void 0, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 219,
        columnNumber: 29
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-700", children: table.getRowModel().rows.map((row, idx) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tr", { className: "bg-slate-100 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 cursor-pointer", children: row.getVisibleCells().map((cell, idx2) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", { onClick: () => {
        !individualUrl || navigate(`${individualUrl}${cell.row.original.id}`);
      }, className: "h-px w-px whitespace-nowrap px-6 py-2", children: (0, import_react_table.flexRender)(
        cell.column.columnDef.cell,
        cell.getContext()
      ) }, idx2, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 350,
        columnNumber: 53
      }, this)) }, idx, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 347,
        columnNumber: 41
      }, this)) }, void 0, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 344,
        columnNumber: 29
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Table.tsx",
      lineNumber: 218,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "grid gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-700 md:flex md:items-center md:justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("span", { className: "font-semibold text-slate-800 dark:text-slate-200", children: data.length }, void 0, !1, {
          fileName: "app/components/Table.tsx",
          lineNumber: 472,
          columnNumber: 33
        }, this),
        " ",
        "results"
      ] }, void 0, !0, {
        fileName: "app/components/Table.tsx",
        lineNumber: 471,
        columnNumber: 29
      }, this) }, void 0, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 470,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", { className: "inline-flex gap-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          "button",
          {
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            type: "button",
            className: "inline-flex items-center justify-center gap-2 rounded-md border bg-slate-100 py-2 px-3 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                "svg",
                {
                  className: "h-3 w-3",
                  width: 16,
                  height: 16,
                  viewBox: "0 0 16 15",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                    "path",
                    {
                      d: "M10.506 1.64001L4.85953 7.28646C4.66427 7.48172 4.66427 7.79831 4.85953 7.99357L10.506 13.64",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Table.tsx",
                      lineNumber: 496,
                      columnNumber: 41
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/Table.tsx",
                  lineNumber: 488,
                  columnNumber: 37
                },
                this
              ),
              "Prev"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Table.tsx",
            lineNumber: 482,
            columnNumber: 33
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
          "button",
          {
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            type: "button",
            className: "inline-flex items-center justify-center gap-2 rounded-md border bg-slate-100 py-2 px-3 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800",
            children: [
              "Next",
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                "svg",
                {
                  className: "h-3 w-3",
                  width: 16,
                  height: 16,
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(
                    "path",
                    {
                      d: "M4.50598 2L10.1524 7.64645C10.3477 7.84171 10.3477 8.15829 10.1524 8.35355L4.50598 14",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round"
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Table.tsx",
                      lineNumber: 520,
                      columnNumber: 41
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/Table.tsx",
                  lineNumber: 512,
                  columnNumber: 37
                },
                this
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/Table.tsx",
            lineNumber: 505,
            columnNumber: 33
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/Table.tsx",
        lineNumber: 481,
        columnNumber: 29
      }, this) }, void 0, !1, {
        fileName: "app/components/Table.tsx",
        lineNumber: 480,
        columnNumber: 25
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/Table.tsx",
      lineNumber: 469,
      columnNumber: 21
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/Table.tsx",
    lineNumber: 48,
    columnNumber: 17
  }, this) }, void 0, !1, {
    fileName: "app/components/Table.tsx",
    lineNumber: 47,
    columnNumber: 13
  }, this) }, void 0, !1, {
    fileName: "app/components/Table.tsx",
    lineNumber: 46,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/components/Table.tsx",
    lineNumber: 45,
    columnNumber: 12
  }, this);
}

// app/routes/app/investments.tsx
var import_bi3 = require("react-icons/bi"), import_bs = require("react-icons/bs"), import_react17 = require("@remix-run/react"), import_server_runtime3 = require("@remix-run/server-runtime");

// app/utils/constants.ts
var EXPENSE_CATEGORIES = {
  food: {
    name: "Food",
    logo: "\u{1F354}"
  },
  transport: {
    name: "Transport",
    logo: "\u{1F697}"
  },
  entertainment: {
    name: "Entertainment",
    logo: "\u{1F3AC}"
  },
  shopping: {
    name: "Shopping",
    logo: "\u{1F6CD}\uFE0F"
  },
  health: {
    name: "Health",
    logo: "\u{1F3E5}"
  },
  utilities: {
    name: "Utilities",
    logo: "\u{1F50C}"
  },
  insurance: {
    name: "Insurance",
    logo: "\u{1F4DC}"
  },
  housing: {
    name: "Housing",
    logo: "\u{1F3E0}"
  },
  education: {
    name: "Education",
    logo: "\u{1F4DA}"
  },
  other: {
    name: "Other",
    logo: "\u{1F937}\u200D\u2642\uFE0F"
  }
}, INVESTMENT_CATEGORIES = {
  equity: {
    name: "Stocks",
    logo: "\u{1F4C8}"
  },
  "fixed-income": {
    name: "Bonds",
    logo: "\u{1F4C9}"
  },
  "real-estate": {
    name: "Real Estate",
    logo: "\u{1F3D8}\uFE0F"
  },
  crypto: {
    name: "Cryptocurrency",
    logo: "\u{1F4B0}"
  },
  "mutual-funds": {
    name: "Mutual Funds",
    logo: "\u{1F4CA}"
  },
  etfs: {
    name: "ETFs",
    logo: "\u{1F4C8}"
  },
  other: {
    name: "Other",
    logo: "\u{1F937}\u200D\u2642\uFE0F"
  }
};

// app/models/group.server.ts
var import_server_runtime = require("@remix-run/server-runtime"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));
var deleteGroup = async (request, id) => {
  if (!await authenticator.isAuthenticated(request))
    throw (0, import_server_runtime.redirect)("/login");
  return await prisma.group.delete({
    where: {
      id
    }
  });
}, getGroup = async (request, id) => {
  if (!await authenticator.isAuthenticated(request))
    throw (0, import_server_runtime.redirect)("/login");
  let group = await prisma.group.findUnique({
    where: {
      id
    },
    include: {
      expenses: !0,
      investments: !0,
      comments: !0
    }
  });
  (0, import_tiny_invariant2.default)(group, "Group does not exist");
  let groupUsers = await prisma.groupUsers.findMany({
    where: {
      groupId: id
    }
  }), usersData = await Promise.all(
    groupUsers.map(async (user2) => await prisma.user.findUnique({
      where: {
        id: user2.userId
      }
    }))
  );
  return {
    ...group,
    users: usersData
  };
}, createGroup = async (request, group, emails) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    throw (0, import_server_runtime.redirect)("/login");
  let email = user.email, newGroup = await prisma.group.create({
    data: {
      title: group.title,
      description: group.description
    }
  });
  await prisma.groupUsers.create({
    data: {
      userId: user.id,
      groupId: newGroup.id,
      isAdmin: !0
    }
  });
  for (let email2 of emails) {
    let userToAdd = await prisma.user.findUnique({
      where: {
        email: email2
      }
    });
    userToAdd && await prisma.groupUsers.create({
      data: {
        userId: userToAdd.id,
        groupId: newGroup.id
      }
    });
  }
  return newGroup;
};
var getGroups = async (request) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    throw (0, import_server_runtime.redirect)("/login");
  let id = user.id, userGroups = await prisma.groupUsers.findMany({
    where: {
      userId: id
    }
  });
  return await Promise.all(
    userGroups.map(async (group) => {
      let data = await prisma.group.findUnique({
        where: {
          id: group.groupId
        },
        include: {
          expenses: !0,
          investments: !0
        }
      }), users = await prisma.groupUsers.findMany({
        where: {
          groupId: group.groupId
        }
      });
      return {
        ...data,
        users: users.map((user2) => user2.userId)
      };
    })
  );
}, updateGroup = async (request, id, group, newEmails) => {
  if (!await authenticator.isAuthenticated(request))
    throw (0, import_server_runtime.redirect)("/login");
  let updatedGroup = await prisma.group.update({
    where: {
      id
    },
    data: {
      title: group.title,
      description: group.description
    }
  }), users = (await prisma.groupUsers.findMany({
    where: {
      groupId: id
    }
  })).map((user2) => user2.userId);
  for (let email of newEmails) {
    let userToAdd = await prisma.user.findUnique({
      where: {
        email
      }
    });
    userToAdd && (users.includes(userToAdd.id) || await prisma.groupUsers.create({
      data: {
        userId: userToAdd.id,
        groupId: id
      }
    }));
  }
  return updatedGroup;
};

// app/models/investment.server.ts
var import_server_runtime2 = require("@remix-run/server-runtime");
var getInvestments = async (request) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    throw (0, import_server_runtime2.redirect)("/login");
  let userGroups = await getUserGroups(user.id);
  return await prisma.investment.findMany({
    where: {
      OR: [
        {
          groupId: {
            in: userGroups.map((group) => group.id)
          }
        },
        {
          userId: user.id
        }
      ]
    }
  });
}, createInvestment = async (request, data) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    throw (0, import_server_runtime2.redirect)("/login");
  let { groupId, ...otherData } = data;
  return data.groupId === "individual" ? await prisma.investment.create({
    data: {
      ...otherData,
      user: {
        connect: {
          id: user.id
        }
      }
    }
  }) : await prisma.investment.create({
    data: {
      ...otherData,
      Group: {
        connect: {
          id: data.groupId
        }
      }
    }
  });
}, updateInvestment = async (request, data) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    throw (0, import_server_runtime2.redirect)("/login");
  let { groupId, ...otherData } = data;
  return data.groupId === "individual" ? await prisma.investment.update({
    where: {
      id: data.id
    },
    data: {
      ...otherData,
      user: {
        connect: {
          id: user.id
        }
      },
      Group: {
        disconnect: !0
      }
    }
  }) : await prisma.investment.update({
    where: {
      id: data.id
    },
    data: {
      ...otherData,
      Group: {
        connect: {
          id: data.groupId
        }
      }
    }
  });
}, getInvestment = async (request, id) => {
  if (!await authenticator.isAuthenticated(request))
    throw (0, import_server_runtime2.redirect)("/login");
  return await prisma.investment.findUnique({
    where: {
      id
    }
  });
};

// app/routes/app/investments.tsx
var import_ai2 = require("react-icons/ai"), import_jsx_dev_runtime17 = require("react/jsx-dev-runtime");
async function loader8({ request }) {
  let investments = await getInvestments(request), groups = await getGroups(request);
  return (0, import_server_runtime3.json)({
    investments,
    groups
  });
}
function NoteIndexPage() {
  let data = (0, import_react17.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_jsx_dev_runtime17.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react17.Outlet, {}, void 0, !1, {
      fileName: "app/routes/app/investments.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(
      Table,
      {
        title: "Investments",
        subtitle: "All your investments",
        individualUrl: "/app/investments/",
        createUrl: "/app/investments/new",
        icon: import_ai2.AiOutlineLineChart,
        label: "Investment",
        pluralLabel: "Investments",
        data: data.investments,
        columns: [
          {
            accessorKey: "Symbol",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { children: row.row.original.symbol }, void 0, !1, {
              fileName: "app/routes/app/investments.tsx",
              lineNumber: 38,
              columnNumber: 28
            }, this)
          },
          {
            accessorKey: "category",
            cell: (row) => {
              let category = INVESTMENT_CATEGORIES[row.row.original.category];
              return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { children: `${category.logo} ${category.name}` }, void 0, !1, {
                fileName: "app/routes/app/investments.tsx",
                lineNumber: 44,
                columnNumber: 22
              }, this);
            }
          },
          {
            accessorKey: "payDate",
            header: "Due",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { children: new Date(row.row.original.payDate).toLocaleDateString() }, void 0, !1, {
              fileName: "app/routes/app/investments.tsx",
              lineNumber: 51,
              columnNumber: 15
            }, this)
          },
          {
            accessorKey: "amount"
          },
          {
            accessorKey: "unitPrice",
            header: "Unit Price",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { children: `$${row.row.original.unitPrice}` }, void 0, !1, {
              fileName: "app/routes/app/investments.tsx",
              lineNumber: 62,
              columnNumber: 28
            }, this)
          },
          {
            accessorKey: "group",
            cell: (row) => row.row.original.groupId ? /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-blue-100 py-0.5 px-2 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_bi3.BiGroup, { className: "h-2.5 w-2.5" }, void 0, !1, {
                fileName: "app/routes/app/investments.tsx",
                lineNumber: 69,
                columnNumber: 19
              }, this),
              "Group"
            ] }, void 0, !0, {
              fileName: "app/routes/app/investments.tsx",
              lineNumber: 68,
              columnNumber: 17
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-gray-100 py-0.5 px-2 text-xs font-medium text-gray-800 dark:bg-gray-900 dark:text-gray-200", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_bs.BsPerson, {}, void 0, !1, {
                fileName: "app/routes/app/investments.tsx",
                lineNumber: 74,
                columnNumber: 19
              }, this),
              "Individual"
            ] }, void 0, !0, {
              fileName: "app/routes/app/investments.tsx",
              lineNumber: 73,
              columnNumber: 17
            }, this)
          }
        ]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/app/investments.tsx",
        lineNumber: 26,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/app/investments.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}

// app/routes/app/investments/$investmentId.tsx
var investmentId_exports = {};
__export(investmentId_exports, {
  action: () => action7,
  default: () => NoteDetailsPage,
  loader: () => loader9
});
var import_node13 = require("@remix-run/node"), import_remix_validated_form8 = require("remix-validated-form"), import_tiny_invariant3 = __toESM(require("tiny-invariant"));

// app/components/pages/investments/ChangeInvestment.tsx
var import_react20 = require("@remix-run/react"), import_ai3 = require("react-icons/ai"), import_bi4 = require("react-icons/bi"), import_remix_validated_form7 = require("remix-validated-form");

// app/components/form/SelectField.tsx
var import_remix_validated_form5 = require("remix-validated-form"), import_jsx_dev_runtime18 = require("react/jsx-dev-runtime"), SelectField = ({ name, label, options, defaultValue = "" }) => {
  let { error, getInputProps } = (0, import_remix_validated_form5.useField)(name);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
      "label",
      {
        className: "mb-2 block text-sm dark:text-white",
        htmlFor: name,
        children: label
      },
      void 0,
      !1,
      {
        fileName: "app/components/form/SelectField.tsx",
        lineNumber: 18,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
      "select",
      {
        ...getInputProps({
          id: name
        }),
        defaultValue,
        className: "py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("option", { children: "Open this select menu" }, void 0, !1, {
            fileName: "app/components/form/SelectField.tsx",
            lineNumber: 27,
            columnNumber: 17
          }, this),
          options.map((option, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
            "option",
            {
              value: option.value,
              disabled: option.disabled,
              children: option.label
            },
            index,
            !1,
            {
              fileName: "app/components/form/SelectField.tsx",
              lineNumber: 30,
              columnNumber: 25
            },
            this
          ))
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/form/SelectField.tsx",
        lineNumber: 20,
        columnNumber: 13
      },
      this
    ),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3", children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
      "svg",
      {
        className: "h-5 w-5 text-red-500",
        width: 16,
        height: 16,
        fill: "currentColor",
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" }, void 0, !1, {
          fileName: "app/components/form/SelectField.tsx",
          lineNumber: 49,
          columnNumber: 21
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/form/SelectField.tsx",
        lineNumber: 41,
        columnNumber: 17
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/form/SelectField.tsx",
      lineNumber: 40,
      columnNumber: 23
    }, this),
    error && /* @__PURE__ */ (0, import_jsx_dev_runtime18.jsxDEV)(
      "p",
      {
        className: "mt-2 text-xs text-red-600",
        id: "email-error",
        children: error
      },
      void 0,
      !1,
      {
        fileName: "app/components/form/SelectField.tsx",
        lineNumber: 53,
        columnNumber: 17
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/form/SelectField.tsx",
    lineNumber: 17,
    columnNumber: 9
  }, this);
}, SelectField_default = SelectField;

// app/components/Modal.tsx
var import_react18 = require("@remix-run/react"), import_react19 = require("react"), import_jsx_dev_runtime19 = require("react/jsx-dev-runtime");
function Modal({
  children,
  title,
  icon,
  description,
  onCloseUrl
}) {
  let navigate = (0, import_react18.useNavigate)();
  return (0, import_react19.useEffect)(() => {
    let handleEscape = (event) => {
      event.key === "Escape" && navigate(onCloseUrl);
    };
    return window.addEventListener("keydown", handleEscape), () => window.removeEventListener("keydown", handleEscape);
  }, []), /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
    "div",
    {
      className: "hs-overlay w-full h-full fixed top-0 left-0 z-[70] overflow-x-hidden overflow-y-auto",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
          import_react18.Link,
          {
            to: onCloseUrl,
            className: "w-full h-full fixed top-0 left-0 bg-slate-100/70 dark:bg-slate-800/70 backdrop-blur-sm backdrop-filter"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Modal.tsx",
            lineNumber: 22,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "animate-fade-in duration-500 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "relative flex flex-col bg-slate-100 shadow-lg rounded-xl dark:bg-slate-800", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "relative overflow-hidden min-h-[8rem] bg-slate-900 text-center rounded-t-xl", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
              import_react18.Link,
              {
                to: onCloseUrl,
                className: "inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-slate-500 hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-slate-700 dark:focus:ring-offset-slate-800",
                "data-hs-overlay": "#hs-bg-slate-on-hover-cards",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "sr-only", children: "Close" }, void 0, !1, {
                    fileName: "app/components/Modal.tsx",
                    lineNumber: 34,
                    columnNumber: 33
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
                    "svg",
                    {
                      className: "w-3.5 h-3.5",
                      width: 8,
                      height: 8,
                      viewBox: "0 0 8 8",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
                        "path",
                        {
                          d: "M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z",
                          fill: "currentColor"
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/Modal.tsx",
                          lineNumber: 43,
                          columnNumber: 37
                        },
                        this
                      )
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/Modal.tsx",
                      lineNumber: 35,
                      columnNumber: 33
                    },
                    this
                  )
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/components/Modal.tsx",
                lineNumber: 29,
                columnNumber: 29
              },
              this
            ) }, void 0, !1, {
              fileName: "app/components/Modal.tsx",
              lineNumber: 28,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("figure", { className: "absolute inset-x-0 bottom-0", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
              "svg",
              {
                preserveAspectRatio: "none",
                xmlns: "http://www.w3.org/2000/svg",
                x: "0px",
                y: "0px",
                viewBox: "0 0 1920 100.1",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)(
                  "path",
                  {
                    fill: "currentColor",
                    className: "fill-white dark:fill-slate-800",
                    d: "M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/Modal.tsx",
                    lineNumber: 60,
                    columnNumber: 33
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/Modal.tsx",
                lineNumber: 53,
                columnNumber: 29
              },
              this
            ) }, void 0, !1, {
              fileName: "app/components/Modal.tsx",
              lineNumber: 52,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/Modal.tsx",
            lineNumber: 26,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "relative z-10 -mt-12", children: /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("span", { className: "mx-auto flex justify-center items-center w-[62px] h-[62px] rounded-full border border-slate-200 bg-slate-100 text-slate-700 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400", children: icon({
            className: "w-6 h-6"
          }) }, void 0, !1, {
            fileName: "app/components/Modal.tsx",
            lineNumber: 71,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "app/components/Modal.tsx",
            lineNumber: 69,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "p-4 sm:p-7 overflow-y-auto", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "text-center", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("h3", { className: "text-lg font-semibold text-slate-800 dark:text-slate-200", children: title }, void 0, !1, {
                fileName: "app/components/Modal.tsx",
                lineNumber: 83,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("p", { className: "text-sm text-slate-500", children: description }, void 0, !1, {
                fileName: "app/components/Modal.tsx",
                lineNumber: 86,
                columnNumber: 29
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/Modal.tsx",
              lineNumber: 82,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime19.jsxDEV)("div", { className: "mt-5", children }, void 0, !1, {
              fileName: "app/components/Modal.tsx",
              lineNumber: 90,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/Modal.tsx",
            lineNumber: 81,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/Modal.tsx",
          lineNumber: 25,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/components/Modal.tsx",
          lineNumber: 24,
          columnNumber: 13
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/Modal.tsx",
      lineNumber: 19,
      columnNumber: 9
    },
    this
  );
}

// app/routes/app/investments/new.tsx
var new_exports = {};
__export(new_exports, {
  action: () => action6,
  default: () => NewExpensePage,
  validator: () => validator3
});
var import_node12 = require("@remix-run/node"), import_with_zod3 = require("@remix-validated-form/with-zod"), import_remix_validated_form6 = require("remix-validated-form"), import_zod3 = require("zod");
var import_jsx_dev_runtime20 = require("react/jsx-dev-runtime"), validator3 = (0, import_with_zod3.withZod)(
  import_zod3.z.object({
    symbol: import_zod3.z.string().min(1, { message: "Symbol is required" }),
    amount: import_zod3.z.coerce.number().min(1, { message: "Amount is required" }),
    unitPrice: import_zod3.z.coerce.number().min(1, { message: "Price per unit is required" }),
    groupId: import_zod3.z.string().min(1, { message: "Group is required" }),
    payDate: import_zod3.z.coerce.date(),
    category: import_zod3.z.enum(Object.keys(INVESTMENT_CATEGORIES))
  })
);
async function action6({ request }) {
  let formData = await request.formData(), result = await validator3.validate(formData);
  return result.error ? (0, import_remix_validated_form6.validationError)(result.error) : await createInvestment(request, result.data) ? (0, import_node12.redirect)("/app/investments") : (0, import_node12.json)({
    error: "An error occurred while creating the investment"
  });
}
function NewExpensePage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime20.jsxDEV)(ChangeInvestment, { type: "new" }, void 0, !1, {
    fileName: "app/routes/app/investments/new.tsx",
    lineNumber: 49,
    columnNumber: 10
  }, this);
}

// app/components/pages/investments/ChangeInvestment.tsx
var import_jsx_dev_runtime21 = require("react/jsx-dev-runtime");
function ChangeInvestment({
  type = "edit"
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let actionData = (0, import_react20.useActionData)(), loaderData = (0, import_react20.useLoaderData)(), match = useMatchesData("routes/app/investments");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
    Modal,
    {
      title: type === "edit" ? "Edit investment" : "New investment",
      description: type === "edit" ? "You can edit the details of this investment here." : "You can create a new investment here.",
      onCloseUrl: "/app/investments",
      icon: import_bi4.BiTransfer,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_remix_validated_form7.ValidatedForm, { method: "post", className: "space-y-5", validator: validator3, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
            InputField_default,
            {
              label: "Symbol",
              name: "symbol",
              defaultValue: (_a = loaderData == null ? void 0 : loaderData.investment) == null ? void 0 : _a.symbol
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/investments/ChangeInvestment.tsx",
              lineNumber: 40,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
            SelectField_default,
            {
              defaultValue: (_b = loaderData == null ? void 0 : loaderData.investment) == null ? void 0 : _b.category,
              label: "Category",
              name: "category",
              options: Object.keys(INVESTMENT_CATEGORIES).map((key) => {
                let label = INVESTMENT_CATEGORIES[key];
                return {
                  label: `${label.logo} ${label.name}`,
                  value: key
                };
              })
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/investments/ChangeInvestment.tsx",
              lineNumber: 45,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/pages/investments/ChangeInvestment.tsx",
          lineNumber: 39,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
            InputField_default,
            {
              defaultValue: (_c = loaderData == null ? void 0 : loaderData.investment) == null ? void 0 : _c.amount,
              label: "Amount",
              name: "amount",
              type: "number"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/investments/ChangeInvestment.tsx",
              lineNumber: 62,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
            InputField_default,
            {
              defaultValue: (_d = loaderData == null ? void 0 : loaderData.investment) == null ? void 0 : _d.unitPrice,
              label: "Price per unit",
              name: "unitPrice",
              type: "number"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/investments/ChangeInvestment.tsx",
              lineNumber: 68,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/pages/investments/ChangeInvestment.tsx",
          lineNumber: 61,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
          SelectField_default,
          {
            label: "Group",
            name: "groupId",
            defaultValue: (_e = loaderData == null ? void 0 : loaderData.investment) != null && _e.groupId ? (_f = loaderData == null ? void 0 : loaderData.investment) == null ? void 0 : _f.groupId : "individual",
            options: [
              {
                label: "Individual",
                value: "individual"
              },
              ...match.groups.map((group) => ({
                label: `Group: ${group.title}`,
                value: group.id
              }))
            ]
          },
          void 0,
          !1,
          {
            fileName: "app/components/pages/investments/ChangeInvestment.tsx",
            lineNumber: 76,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/pages/investments/ChangeInvestment.tsx",
          lineNumber: 75,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
          InputField_default,
          {
            defaultValue: (_g = loaderData == null ? void 0 : loaderData.investment) != null && _g.payDate ? new Date((_h = loaderData == null ? void 0 : loaderData.investment) == null ? void 0 : _h.payDate).toISOString().substr(0, 16) : new Date().toISOString().substr(0, 16),
            label: "Pay date",
            name: "payDate",
            type: "datetime-local"
          },
          void 0,
          !1,
          {
            fileName: "app/components/pages/investments/ChangeInvestment.tsx",
            lineNumber: 97,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/pages/investments/ChangeInvestment.tsx",
          lineNumber: 96,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("div", { className: "mt-5 flex justify-end gap-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
            import_react20.Link,
            {
              to: "/app/investments",
              className: "inline-flex items-center justify-center gap-2 rounded-md border bg-slate-100 py-2 px-3 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(import_ai3.AiOutlineClose, { className: "h-4 w-4" }, void 0, !1, {
                  fileName: "app/components/pages/investments/ChangeInvestment.tsx",
                  lineNumber: 116,
                  columnNumber: 13
                }, this),
                "Close"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/pages/investments/ChangeInvestment.tsx",
              lineNumber: 112,
              columnNumber: 11
            },
            this
          ),
          type === "edit" && /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
            "button",
            {
              type: "submit",
              className: "inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
              name: "action",
              value: "delete",
              children: "Delete"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/investments/ChangeInvestment.tsx",
              lineNumber: 120,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(SubmitButton_default, {}, void 0, !1, {
            fileName: "app/components/pages/investments/ChangeInvestment.tsx",
            lineNumber: 129,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/pages/investments/ChangeInvestment.tsx",
          lineNumber: 111,
          columnNumber: 9
        }, this),
        (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)(
          "div",
          {
            className: "rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600",
            role: "alert",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime21.jsxDEV)("span", { className: "font-bold", children: "Error" }, void 0, !1, {
                fileName: "app/components/pages/investments/ChangeInvestment.tsx",
                lineNumber: 136,
                columnNumber: 13
              }, this),
              " ",
              actionData == null ? void 0 : actionData.error
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/pages/investments/ChangeInvestment.tsx",
            lineNumber: 132,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/pages/investments/ChangeInvestment.tsx",
        lineNumber: 38,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/pages/investments/ChangeInvestment.tsx",
      lineNumber: 28,
      columnNumber: 5
    },
    this
  );
}

// app/models/expense.server.ts
var import_server_runtime4 = require("@remix-run/server-runtime");
var getExpenses = async (request) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    throw (0, import_server_runtime4.redirect)("/login");
  let userGroups = await getUserGroups(user.id);
  return await prisma.expense.findMany({
    where: {
      OR: [
        {
          groupId: {
            in: userGroups.map((group) => group.id)
          }
        },
        {
          userId: user.id
        }
      ]
    }
  });
}, createExpense = async (request, data) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    throw (0, import_server_runtime4.redirect)("/login");
  let { groupId, ...otherData } = data;
  return data.groupId === "individual" ? await prisma.expense.create({
    data: {
      ...otherData,
      user: {
        connect: {
          id: user.id
        }
      }
    }
  }) : await prisma.expense.create({
    data: {
      ...otherData,
      Group: {
        connect: {
          id: data.groupId
        }
      }
    }
  });
}, updateExpense = async (request, data) => {
  let user = await authenticator.isAuthenticated(request);
  if (!user)
    throw (0, import_server_runtime4.redirect)("/login");
  let { groupId, ...otherData } = data;
  return data.groupId === "individual" ? await prisma.expense.update({
    where: {
      id: data.id
    },
    data: {
      ...otherData,
      user: {
        connect: {
          id: user.id
        }
      },
      Group: {
        disconnect: !0
      }
    }
  }) : await prisma.expense.update({
    where: {
      id: data.id
    },
    data: {
      ...otherData,
      Group: {
        connect: {
          id: data.groupId
        }
      }
    }
  });
}, getExpense = async (request, id) => {
  if (!await authenticator.isAuthenticated(request))
    throw (0, import_server_runtime4.redirect)("/login");
  return await prisma.expense.findUnique({
    where: {
      id
    }
  });
}, deleteExpense = async (request, id) => {
  if (!await authenticator.isAuthenticated(request))
    throw (0, import_server_runtime4.redirect)("/login");
  return await prisma.expense.delete({
    where: {
      id
    }
  });
};

// app/routes/app/investments/$investmentId.tsx
var import_jsx_dev_runtime22 = require("react/jsx-dev-runtime");
async function loader9({ request, params }) {
  (0, import_tiny_invariant3.default)(params.investmentId, "investmentId not found");
  let investment = await getInvestment(request, params.investmentId);
  return (0, import_node13.json)({
    investment
  });
}
async function action7({ request, params }) {
  (0, import_tiny_invariant3.default)(params.investmentId, "investmentId not found");
  let formData = await request.formData();
  if (formData.get("action") === "delete")
    return await deleteExpense(request, params.investmentId) ? (0, import_node13.redirect)("/app/investments") : (0, import_node13.json)({
      error: "An error occurred while deleting the investment"
    });
  let result = await validator3.validate(formData);
  return result.error ? (0, import_remix_validated_form8.validationError)(result.error) : await updateInvestment(request, {
    ...result.data,
    id: params.investmentId
  }) ? (0, import_node13.redirect)("/app/investments") : (0, import_node13.json)({
    error: "An error occurred while updating the investment"
  });
}
function NoteDetailsPage() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime22.jsxDEV)(ChangeInvestment, { type: "edit" }, void 0, !1, {
    fileName: "app/routes/app/investments/$investmentId.tsx",
    lineNumber: 71,
    columnNumber: 10
  }, this);
}

// app/routes/app/expenses.tsx
var expenses_exports = {};
__export(expenses_exports, {
  default: () => NoteIndexPage2,
  loader: () => loader10
});
var import_bi5 = require("react-icons/bi"), import_bs2 = require("react-icons/bs"), import_react21 = require("@remix-run/react"), import_server_runtime5 = require("@remix-run/server-runtime");
var import_jsx_dev_runtime23 = require("react/jsx-dev-runtime");
async function loader10({ request }) {
  let expenses = await getExpenses(request), groups = await getGroups(request);
  return (0, import_server_runtime5.json)({
    expenses,
    groups
  });
}
function NoteIndexPage2() {
  let data = (0, import_react21.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_jsx_dev_runtime23.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_react21.Outlet, {}, void 0, !1, {
      fileName: "app/routes/app/expenses.tsx",
      lineNumber: 24,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(
      Table,
      {
        title: "Expenses",
        subtitle: "All your expenses",
        individualUrl: "/app/expenses/",
        createUrl: "/app/expenses/new",
        icon: import_bi5.BiTransfer,
        label: "Expense",
        pluralLabel: "Expenses",
        data: data.expenses,
        columns: [
          {
            accessorKey: "name",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { children: row.row.original.title }, void 0, !1, {
              fileName: "app/routes/app/expenses.tsx",
              lineNumber: 38,
              columnNumber: 40
            }, this)
          },
          {
            accessorKey: "category",
            cell: (row) => {
              let category = EXPENSE_CATEGORIES[row.row.original.category];
              return /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { children: `${category.logo} ${category.name}` }, void 0, !1, {
                fileName: "app/routes/app/expenses.tsx",
                lineNumber: 46,
                columnNumber: 36
              }, this);
            }
          },
          {
            accessorKey: "payDate",
            header: "Due",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { children: new Date(row.row.original.payDate).toLocaleDateString() }, void 0, !1, {
              fileName: "app/routes/app/expenses.tsx",
              lineNumber: 54,
              columnNumber: 40
            }, this)
          },
          {
            accessorKey: "amount"
          },
          {
            accessorKey: "price",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { children: `$${row.row.original.pricePerUnit}` }, void 0, !1, {
              fileName: "app/routes/app/expenses.tsx",
              lineNumber: 63,
              columnNumber: 40
            }, this)
          },
          {
            accessorKey: "paid",
            cell: (row) => row.row.original.paid ? /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { className: "inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("svg", { className: "w-2.5 h-2.5", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" }, void 0, !1, {
                fileName: "app/routes/app/expenses.tsx",
                lineNumber: 72,
                columnNumber: 37
              }, this) }, void 0, !1, {
                fileName: "app/routes/app/expenses.tsx",
                lineNumber: 71,
                columnNumber: 33
              }, this),
              "Paid"
            ] }, void 0, !0, {
              fileName: "app/routes/app/expenses.tsx",
              lineNumber: 70,
              columnNumber: 29
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { className: "inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("svg", { className: "w-2.5 h-2.5", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16", children: /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" }, void 0, !1, {
                fileName: "app/routes/app/expenses.tsx",
                lineNumber: 78,
                columnNumber: 37
              }, this) }, void 0, !1, {
                fileName: "app/routes/app/expenses.tsx",
                lineNumber: 77,
                columnNumber: 33
              }, this),
              "Not paid"
            ] }, void 0, !0, {
              fileName: "app/routes/app/expenses.tsx",
              lineNumber: 76,
              columnNumber: 31
            }, this)
          },
          {
            accessorKey: "group",
            cell: (row) => row.row.original.groupId ? /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { className: "inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_bi5.BiGroup, { className: "w-2.5 h-2.5" }, void 0, !1, {
                fileName: "app/routes/app/expenses.tsx",
                lineNumber: 87,
                columnNumber: 33
              }, this),
              "Group"
            ] }, void 0, !0, {
              fileName: "app/routes/app/expenses.tsx",
              lineNumber: 86,
              columnNumber: 29
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)("span", { className: "inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime23.jsxDEV)(import_bs2.BsPerson, {}, void 0, !1, {
                fileName: "app/routes/app/expenses.tsx",
                lineNumber: 91,
                columnNumber: 33
              }, this),
              "Individual"
            ] }, void 0, !0, {
              fileName: "app/routes/app/expenses.tsx",
              lineNumber: 90,
              columnNumber: 31
            }, this)
          }
        ]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/app/expenses.tsx",
        lineNumber: 25,
        columnNumber: 13
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/app/expenses.tsx",
    lineNumber: 23,
    columnNumber: 9
  }, this);
}

// app/routes/app/expenses/$expenseId.tsx
var expenseId_exports = {};
__export(expenseId_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  action: () => action9,
  default: () => NoteDetailsPage2,
  loader: () => loader11
});
var import_node15 = require("@remix-run/node"), import_react23 = require("@remix-run/react"), import_remix_validated_form11 = require("remix-validated-form"), import_tiny_invariant4 = __toESM(require("tiny-invariant"));

// app/components/pages/expenses/ChangeExpense.tsx
var import_react22 = require("@remix-run/react"), import_ai4 = require("react-icons/ai"), import_bi6 = require("react-icons/bi"), import_remix_validated_form10 = require("remix-validated-form");

// app/routes/app/expenses/new.tsx
var new_exports2 = {};
__export(new_exports2, {
  action: () => action8,
  default: () => NewExpensePage2,
  validator: () => validator4
});
var import_node14 = require("@remix-run/node"), import_with_zod4 = require("@remix-validated-form/with-zod"), import_remix_validated_form9 = require("remix-validated-form"), import_zod4 = require("zod");
var import_jsx_dev_runtime24 = require("react/jsx-dev-runtime"), validator4 = (0, import_with_zod4.withZod)(
  import_zod4.z.object({
    title: import_zod4.z.string().min(1, { message: "Title is required" }),
    description: import_zod4.z.string().min(1, { message: "Description is required" }),
    amount: import_zod4.z.coerce.number().min(1, { message: "Amount is required" }),
    pricePerUnit: import_zod4.z.coerce.number().min(1, { message: "Price per unit is required" }),
    groupId: import_zod4.z.string().min(1, { message: "Group is required" }),
    ocurrence: import_zod4.z.enum(["once", "daily", "weekly", "monthly", "yearly"]),
    payDate: import_zod4.z.coerce.date(),
    category: import_zod4.z.enum(Object.keys(EXPENSE_CATEGORIES)),
    amountPaid: import_zod4.z.coerce.number().min(0, {
      message: "Amount paid must be greater than 0"
    }).optional()
  }).refine((data) => data.amountPaid <= data.amount * data.pricePerUnit, {
    message: "Amount paid must be less than or equal to the amount * price per unit",
    path: ["amountPaid"]
  })
);
async function action8({ request }) {
  let formData = await request.formData(), result = await validator4.validate(formData);
  return result.error ? (0, import_remix_validated_form9.validationError)(result.error) : await createExpense(request, result.data) ? (0, import_node14.redirect)("/app/expenses") : (0, import_node14.json)({
    error: "An error occurred while creating the expense"
  });
}
function NewExpensePage2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime24.jsxDEV)(ChangeExpense, { type: "new" }, void 0, !1, {
    fileName: "app/routes/app/expenses/new.tsx",
    lineNumber: 63,
    columnNumber: 10
  }, this);
}

// app/components/pages/expenses/ChangeExpense.tsx
var import_jsx_dev_runtime25 = require("react/jsx-dev-runtime");
function ChangeExpense({
  type = "edit"
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  let actionData = (0, import_react22.useActionData)(), loaderData = (0, import_react22.useLoaderData)(), match = useMatchesData("routes/app/expenses");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
    Modal,
    {
      title: type === "edit" ? "Edit expense" : "New expense",
      description: type === "edit" ? "You can edit the details of this expense here." : "You can create a new expense here.",
      onCloseUrl: "/app/expenses",
      icon: import_bi6.BiTransfer,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_remix_validated_form10.ValidatedForm, { method: "post", className: "space-y-5", validator: validator4, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            InputField_default,
            {
              label: "Title",
              name: "title",
              defaultValue: (_a = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _a.title
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 36,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            SelectField_default,
            {
              defaultValue: (_b = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _b.category,
              label: "Category",
              name: "category",
              options: Object.keys(EXPENSE_CATEGORIES).map((key) => {
                let label = EXPENSE_CATEGORIES[key];
                return {
                  label: `${label.logo} ${label.name}`,
                  value: key
                };
              })
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 41,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/pages/expenses/ChangeExpense.tsx",
          lineNumber: 35,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
          InputField_default,
          {
            defaultValue: (_c = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _c.description,
            label: "Description",
            name: "description"
          },
          void 0,
          !1,
          {
            fileName: "app/components/pages/expenses/ChangeExpense.tsx",
            lineNumber: 55,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            InputField_default,
            {
              defaultValue: (_d = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _d.amount,
              label: "Amount",
              name: "amount",
              type: "number"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 61,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            InputField_default,
            {
              defaultValue: (_e = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _e.pricePerUnit,
              label: "Price per unit",
              name: "pricePerUnit",
              type: "number"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 67,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/pages/expenses/ChangeExpense.tsx",
          lineNumber: 60,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            SelectField_default,
            {
              defaultValue: (_f = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _f.ocurrence,
              label: "Ocurrence",
              name: "ocurrence",
              options: [
                { label: "Once", value: "once" },
                { label: "Daily", value: "daily" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Yearly", value: "yearly" }
              ]
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 75,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            SelectField_default,
            {
              label: "Group",
              name: "groupId",
              defaultValue: (_g = loaderData == null ? void 0 : loaderData.expense) != null && _g.groupId ? (_h = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _h.groupId : "individual",
              options: [
                {
                  label: "Individual",
                  value: "individual"
                },
                ...match.groups.map((group) => ({
                  label: `Group: ${group.title}`,
                  value: group.id
                }))
              ]
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 87,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/pages/expenses/ChangeExpense.tsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            InputField_default,
            {
              defaultValue: (_i = loaderData == null ? void 0 : loaderData.expense) != null && _i.payDate ? new Date((_j = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _j.payDate).toISOString().substr(0, 16) : new Date().toISOString().substr(0, 16),
              label: "Pay date",
              name: "payDate",
              type: "datetime-local"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 104,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            InputField_default,
            {
              defaultValue: (_k = loaderData == null ? void 0 : loaderData.expense) == null ? void 0 : _k.amountPaid,
              label: "Amount paid",
              name: "amountPaid",
              type: "number"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 110,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/pages/expenses/ChangeExpense.tsx",
          lineNumber: 103,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "mt-5 flex justify-end gap-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            import_react22.Link,
            {
              to: "/app/expenses",
              className: "py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-slate-100 text-slate-700 shadow-sm align-middle hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-800 dark:hover:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white dark:focus:ring-offset-slate-800",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(import_ai4.AiOutlineClose, { className: "w-4 h-4" }, void 0, !1, {
                  fileName: "app/components/pages/expenses/ChangeExpense.tsx",
                  lineNumber: 123,
                  columnNumber: 21
                }, this),
                "Close"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 119,
              columnNumber: 17
            },
            this
          ),
          type === "edit" && /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(
            "button",
            {
              type: "submit",
              className: "inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
              name: "action",
              value: "delete",
              children: "Delete"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/expenses/ChangeExpense.tsx",
              lineNumber: 127,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)(SubmitButton_default, {}, void 0, !1, {
            fileName: "app/components/pages/expenses/ChangeExpense.tsx",
            lineNumber: 134,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/pages/expenses/ChangeExpense.tsx",
          lineNumber: 118,
          columnNumber: 13
        }, this),
        (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("div", { className: "bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4", role: "alert", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime25.jsxDEV)("span", { className: "font-bold", children: "Error" }, void 0, !1, {
            fileName: "app/components/pages/expenses/ChangeExpense.tsx",
            lineNumber: 138,
            columnNumber: 21
          }, this),
          " ",
          actionData == null ? void 0 : actionData.error
        ] }, void 0, !0, {
          fileName: "app/components/pages/expenses/ChangeExpense.tsx",
          lineNumber: 137,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/pages/expenses/ChangeExpense.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/pages/expenses/ChangeExpense.tsx",
      lineNumber: 22,
      columnNumber: 12
    },
    this
  );
}

// app/routes/app/expenses/$expenseId.tsx
var import_jsx_dev_runtime26 = require("react/jsx-dev-runtime");
async function loader11({ request, params }) {
  (0, import_tiny_invariant4.default)(params.expenseId, "expenseId not found");
  let expense = await getExpense(request, params.expenseId);
  return (0, import_node15.json)({
    expense
  });
}
async function action9({ request, params }) {
  (0, import_tiny_invariant4.default)(params.expenseId, "expenseId not found");
  let formData = await request.formData();
  if (formData.get("action") === "delete")
    return await deleteExpense(request, params.expenseId) ? (0, import_node15.redirect)("/app/expenses") : (0, import_node15.json)(
      {
        error: "An error occurred while deleting the expense"
      }
    );
  let result = await validator4.validate(
    formData
  );
  return result.error ? (0, import_remix_validated_form11.validationError)(result.error) : await updateExpense(
    request,
    {
      ...result.data,
      id: params.expenseId
    }
  ) ? (0, import_node15.redirect)("/app/expenses") : (0, import_node15.json)(
    {
      error: "An error occurred while updating the expense"
    }
  );
}
function NoteDetailsPage2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)(ChangeExpense, { type: "edit" }, void 0, !1, {
    fileName: "app/routes/app/expenses/$expenseId.tsx",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}
function ErrorBoundary({ error }) {
  return console.error(error), /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { children: [
    "An unexpected error occurred: ",
    error.message
  ] }, void 0, !0, {
    fileName: "app/routes/app/expenses/$expenseId.tsx",
    lineNumber: 96,
    columnNumber: 10
  }, this);
}
function CatchBoundary() {
  let caught = (0, import_react23.useCatch)();
  if (caught.status === 404)
    return /* @__PURE__ */ (0, import_jsx_dev_runtime26.jsxDEV)("div", { children: "Note not found" }, void 0, !1, {
      fileName: "app/routes/app/expenses/$expenseId.tsx",
      lineNumber: 103,
      columnNumber: 12
    }, this);
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

// app/routes/app/groups.tsx
var groups_exports = {};
__export(groups_exports, {
  default: () => NoteIndexPage3,
  loader: () => loader12
});
var import_bi7 = require("react-icons/bi"), import_react24 = require("@remix-run/react"), import_server_runtime6 = require("@remix-run/server-runtime");
var import_jsx_dev_runtime27 = require("react/jsx-dev-runtime");
async function loader12({ request }) {
  let groups = await getGroups(request);
  return (0, import_server_runtime6.json)({
    groups
  });
}
function NoteIndexPage3() {
  let data = (0, import_react24.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(import_jsx_dev_runtime27.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(import_react24.Outlet, {}, void 0, !1, {
      fileName: "app/routes/app/groups.tsx",
      lineNumber: 19,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)(
      Table,
      {
        title: "Groups",
        subtitle: "All your groups",
        individualUrl: "/app/groups/",
        createUrl: "/app/groups/new",
        icon: import_bi7.BiGroup,
        label: "Expense",
        pluralLabel: "Groups",
        data: data.groups,
        columns: [
          {
            accessorKey: "name",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("span", { children: row.row.original.title }, void 0, !1, {
              fileName: "app/routes/app/groups.tsx",
              lineNumber: 33,
              columnNumber: 40
            }, this)
          },
          {
            accessorKey: "investments",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("span", { children: row.row.original.investments.length }, void 0, !1, {
              fileName: "app/routes/app/groups.tsx",
              lineNumber: 40,
              columnNumber: 36
            }, this)
          },
          {
            accessorKey: "expenses",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("span", { children: row.row.original.expenses.length }, void 0, !1, {
              fileName: "app/routes/app/groups.tsx",
              lineNumber: 47,
              columnNumber: 40
            }, this)
          },
          {
            accessorKey: "members",
            cell: (row) => /* @__PURE__ */ (0, import_jsx_dev_runtime27.jsxDEV)("span", { children: row.row.original.users.length }, void 0, !1, {
              fileName: "app/routes/app/groups.tsx",
              lineNumber: 53,
              columnNumber: 40
            }, this)
          }
        ]
      },
      void 0,
      !1,
      {
        fileName: "app/routes/app/groups.tsx",
        lineNumber: 20,
        columnNumber: 13
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/app/groups.tsx",
    lineNumber: 18,
    columnNumber: 9
  }, this);
}

// app/routes/app/groups/$groupId.tsx
var groupId_exports = {};
__export(groupId_exports, {
  action: () => action11,
  default: () => NoteDetailsPage3,
  loader: () => loader13
});
var import_node17 = require("@remix-run/node"), import_remix_validated_form14 = require("remix-validated-form"), import_tiny_invariant5 = __toESM(require("tiny-invariant"));

// app/components/pages/groups/ChangeGroup.tsx
var import_react25 = require("@remix-run/react"), import_ai5 = require("react-icons/ai"), import_bi8 = require("react-icons/bi"), import_remix_validated_form13 = require("remix-validated-form");

// app/routes/app/groups/new.tsx
var new_exports3 = {};
__export(new_exports3, {
  action: () => action10,
  default: () => NewExpensePage3,
  validator: () => validator5
});
var import_node16 = require("@remix-run/node"), import_with_zod5 = require("@remix-validated-form/with-zod"), import_remix_validated_form12 = require("remix-validated-form"), import_zod5 = require("zod");
var import_jsx_dev_runtime28 = require("react/jsx-dev-runtime"), emailSchema = import_zod5.z.string().email(), validator5 = (0, import_with_zod5.withZod)(
  import_zod5.z.object({
    title: import_zod5.z.string().min(1, { message: "Title is required" }),
    description: import_zod5.z.string().min(1, { message: "Description is required" }),
    emails: import_zod5.z.string().optional()
  }).refine((data) => {
    if (data.emails) {
      let emails = data.emails.split(",").map((item) => item.trim());
      for (let email of emails)
        if (!emailSchema.safeParse(email).success)
          return !1;
    }
    return !0;
  }, { message: "Invalid email address" })
);
async function action10({ request }) {
  let formData = await request.formData(), result = await validator5.validate(
    formData
  );
  return result.error ? (0, import_remix_validated_form12.validationError)(result.error) : await createGroup(
    request,
    {
      title: result.data.title,
      description: result.data.description
    },
    result.data.emails.split(",").map((item) => item.trim())
  ) ? (0, import_node16.redirect)("/app/groups") : (0, import_node16.json)(
    {
      error: "An error occurred while creating the group"
    }
  );
}
function NewExpensePage3() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime28.jsxDEV)(ChangeGroup, { type: "new" }, void 0, !1, {
    fileName: "app/routes/app/groups/new.tsx",
    lineNumber: 69,
    columnNumber: 10
  }, this);
}

// app/components/pages/groups/ChangeGroup.tsx
var import_jsx_dev_runtime29 = require("react/jsx-dev-runtime");
function ChangeGroup({
  type = "edit"
}) {
  var _a, _b, _c, _d, _e;
  let actionData = (0, import_react25.useActionData)(), loaderData = (0, import_react25.useLoaderData)(), match = useMatchesData("routes/app/groups");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(
    Modal,
    {
      title: type === "edit" ? "Edit group" : "New group",
      description: type === "edit" ? "You can edit the details of this group here." : "You can create a new group here.",
      onCloseUrl: "/app/groups",
      icon: import_bi8.BiGroup,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(import_remix_validated_form13.ValidatedForm, { method: "post", className: "space-y-5", validator: validator5, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(
          InputField_default,
          {
            label: "Title",
            name: "title",
            defaultValue: (_a = loaderData == null ? void 0 : loaderData.group) == null ? void 0 : _a.title
          },
          void 0,
          !1,
          {
            fileName: "app/components/pages/groups/ChangeGroup.tsx",
            lineNumber: 38,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(
          InputField_default,
          {
            defaultValue: (_b = loaderData == null ? void 0 : loaderData.group) == null ? void 0 : _b.description,
            label: "Description",
            name: "description"
          },
          void 0,
          !1,
          {
            fileName: "app/components/pages/groups/ChangeGroup.tsx",
            lineNumber: 43,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(
          InputField_default,
          {
            defaultValue: (_e = (_d = (_c = loaderData == null ? void 0 : loaderData.group) == null ? void 0 : _c.users) == null ? void 0 : _d.map((user) => user.email)) == null ? void 0 : _e.join(", "),
            label: "Emails (comma separated)",
            name: "emails",
            type: "text"
          },
          void 0,
          !1,
          {
            fileName: "app/components/pages/groups/ChangeGroup.tsx",
            lineNumber: 48,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("div", { className: "mt-5 flex justify-end gap-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(
            import_react25.Link,
            {
              to: "/app/groups",
              className: "inline-flex items-center justify-center gap-2 rounded-md border bg-slate-100 py-2 px-3 align-middle text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white dark:focus:ring-offset-slate-800",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(import_ai5.AiOutlineClose, { className: "h-4 w-4" }, void 0, !1, {
                  fileName: "app/components/pages/groups/ChangeGroup.tsx",
                  lineNumber: 61,
                  columnNumber: 13
                }, this),
                "Close"
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/pages/groups/ChangeGroup.tsx",
              lineNumber: 57,
              columnNumber: 11
            },
            this
          ),
          type === "edit" && /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(
            "button",
            {
              type: "submit",
              className: "inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
              name: "action",
              value: "delete",
              children: "Delete"
            },
            void 0,
            !1,
            {
              fileName: "app/components/pages/groups/ChangeGroup.tsx",
              lineNumber: 65,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(SubmitButton_default, {}, void 0, !1, {
            fileName: "app/components/pages/groups/ChangeGroup.tsx",
            lineNumber: 74,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/pages/groups/ChangeGroup.tsx",
          lineNumber: 56,
          columnNumber: 9
        }, this),
        (actionData == null ? void 0 : actionData.error) && /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)(
          "div",
          {
            className: "rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-600",
            role: "alert",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime29.jsxDEV)("span", { className: "font-bold", children: "Error" }, void 0, !1, {
                fileName: "app/components/pages/groups/ChangeGroup.tsx",
                lineNumber: 81,
                columnNumber: 13
              }, this),
              " ",
              actionData == null ? void 0 : actionData.error
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/pages/groups/ChangeGroup.tsx",
            lineNumber: 77,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/components/pages/groups/ChangeGroup.tsx",
        lineNumber: 37,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/pages/groups/ChangeGroup.tsx",
      lineNumber: 27,
      columnNumber: 5
    },
    this
  );
}

// app/routes/app/groups/$groupId.tsx
var import_jsx_dev_runtime30 = require("react/jsx-dev-runtime");
async function loader13({ request, params }) {
  (0, import_tiny_invariant5.default)(params.groupId, "groupId not found");
  let group = await getGroup(request, params.groupId);
  return (0, import_node17.json)({
    group
  });
}
async function action11({ request, params }) {
  (0, import_tiny_invariant5.default)(params.groupId, "groupId not found");
  let formData = await request.formData();
  if (formData.get("action") === "delete")
    return await deleteGroup(request, params.groupId) ? (0, import_node17.redirect)("/app/groups") : (0, import_node17.json)({
      error: "An error occurred while deleting the group"
    });
  let result = await validator5.validate(formData);
  return result.error ? (0, import_remix_validated_form14.validationError)(result.error) : await updateGroup(
    request,
    params.groupId,
    {
      title: result.data.title,
      description: result.data.description
    },
    result.data.emails.split(",").map((item) => item.trim())
  ) ? (0, import_node17.redirect)("/app/groups") : (0, import_node17.json)({
    error: "An error occurred while updating the group"
  });
}
function NoteDetailsPage3() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime30.jsxDEV)(ChangeGroup, { type: "edit" }, void 0, !1, {
    fileName: "app/routes/app/groups/$groupId.tsx",
    lineNumber: 76,
    columnNumber: 10
  }, this);
}

// app/routes/app/index.tsx
var app_exports2 = {};
__export(app_exports2, {
  SUMMARY_CARDS: () => SUMMARY_CARDS,
  default: () => AppIndexRoute,
  links: () => links2,
  loader: () => loader14
});
var import_server_runtime7 = require("@remix-run/server-runtime"), import_bi9 = require("react-icons/bi");

// app/components/SummaryCard.tsx
var import_react26 = require("@remix-run/react"), import_clsx5 = __toESM(require("clsx")), import_jsx_dev_runtime31 = require("react/jsx-dev-runtime");
function SummaryCard({
  title,
  value,
  change,
  changeType,
  icon,
  viewMoreUrl
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "flex flex-col rounded-xl border bg-slate-100 shadow-sm dark:border-gray-800 dark:bg-slate-800", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "flex justify-between gap-x-3 p-4 md:p-5", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("p", { className: "text-xs uppercase tracking-wide text-gray-500", children: title }, void 0, !1, {
          fileName: "app/components/SummaryCard.tsx",
          lineNumber: 24,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "mt-1 flex items-center gap-x-1", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("h3", { className: "text-xl font-medium text-gray-800 dark:text-gray-200 sm:text-2xl", children: value }, void 0, !1, {
            fileName: "app/components/SummaryCard.tsx",
            lineNumber: 28,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
            "span",
            {
              className: (0, import_clsx5.default)("flex items-center", {
                "text-red-600": changeType === "down",
                "text-green-600": changeType === "up"
              }),
              children: [
                changeType === "down" ? /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
                  "svg",
                  {
                    className: "inline-block h-7 w-7 self-center",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: 16,
                    height: 16,
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/SummaryCard.tsx",
                        lineNumber: 46,
                        columnNumber: 19
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/SummaryCard.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                  },
                  this
                ) : /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
                  "svg",
                  {
                    className: "inline-block h-7 w-7 self-center",
                    xmlns: "http://www.w3.org/2000/svg",
                    width: 16,
                    height: 16,
                    fill: "currentColor",
                    viewBox: "0 0 16 16",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
                      "path",
                      {
                        fillRule: "evenodd",
                        d: "M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/SummaryCard.tsx",
                        lineNumber: 60,
                        columnNumber: 19
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/SummaryCard.tsx",
                    lineNumber: 52,
                    columnNumber: 17
                  },
                  this
                ),
                /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("span", { className: "inline-block text-lg", children: [
                  change,
                  "%"
                ] }, void 0, !0, {
                  fileName: "app/components/SummaryCard.tsx",
                  lineNumber: 66,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/SummaryCard.tsx",
              lineNumber: 31,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/components/SummaryCard.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/SummaryCard.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)("div", { className: "flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-900 dark:text-blue-200", children: icon({
        className: "h-4 w-4"
      }) }, void 0, !1, {
        fileName: "app/components/SummaryCard.tsx",
        lineNumber: 70,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/components/SummaryCard.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    viewMoreUrl && /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
      import_react26.Link,
      {
        className: "inline-flex items-center justify-between rounded-b-xl border-t border-gray-200 py-3 px-4 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-slate-800 md:px-5",
        to: viewMoreUrl,
        children: [
          "View more",
          /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
            "svg",
            {
              className: "h-2.5 w-2.5",
              width: 16,
              height: 16,
              viewBox: "0 0 16 16",
              fill: "none",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime31.jsxDEV)(
                "path",
                {
                  d: "M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  strokeLinecap: "round"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/SummaryCard.tsx",
                  lineNumber: 89,
                  columnNumber: 13
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/SummaryCard.tsx",
              lineNumber: 82,
              columnNumber: 11
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/SummaryCard.tsx",
        lineNumber: 77,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/SummaryCard.tsx",
    lineNumber: 21,
    columnNumber: 5
  }, this);
}

// app/routes/app/index.tsx
var import_react_grid_layout = require("react-grid-layout"), import_react27 = require("react");

// node_modules/react-grid-layout/css/styles.css
var styles_default = "/build/_assets/styles-U3WRP5PL.css";

// node_modules/react-resizable/css/styles.css
var styles_default2 = "/build/_assets/styles-MYFYY2M7.css";

// app/routes/app/index.tsx
var import_LineChart = __toESM(require_LineChart()), import_BarChart = __toESM(require_BarChart()), import_GroupChart = __toESM(require_GroupChart()), import_PieChart = __toESM(require_PieChart()), import_jsx_dev_runtime32 = require("react/jsx-dev-runtime");
function links2() {
  return [
    {
      rel: "stylesheet",
      href: styles_default2
    },
    {
      rel: "stylesheet",
      href: styles_default
    }
  ];
}
var ResponsiveGridLayout = (0, import_react_grid_layout.WidthProvider)(import_react_grid_layout.Responsive), SUMMARY_CARDS = [
  {
    title: "Expenses",
    value: 1e3,
    icon: import_bi9.BiTransfer,
    change: 10,
    changeType: "up",
    viewMoreUrl: "/app/expenses"
  },
  {
    title: "Investments",
    value: 1e3,
    icon: import_bi9.BiTransfer,
    change: 10,
    changeType: "up",
    viewMoreUrl: "/app/investments"
  }
];
async function loader14({ request }) {
  let expenses = await getExpenses(request), investments = await getInvestments(request), groups = await getGroups(request);
  return (0, import_server_runtime7.json)({
    expenses,
    investments,
    groups
  });
}
function AppIndexRoute() {
  let [layouts, setLayouts] = (0, import_react27.useState)({
    lg: [
      {
        i: "Investments",
        x: 0,
        y: 0,
        w: 2,
        h: 1
      },
      {
        i: "Expenses",
        x: 2,
        y: 0,
        w: 2,
        h: 1
      },
      {
        i: "Chart",
        x: 4,
        y: 0,
        w: 2,
        h: 1
      },
      {
        i: "2Chart",
        x: 6,
        y: 0,
        w: 2,
        h: 1
      }
    ]
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_jsx_dev_runtime32.Fragment, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { className: "mt-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
    ResponsiveGridLayout,
    {
      className: "layout",
      layouts,
      isDraggable: !0,
      isResizable: !0,
      breakpoints: { lg: 1280, md: 992, sm: 767, xs: 480, xxs: 0 },
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      children: [
        SUMMARY_CARDS.map((card) => /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
          SummaryCard,
          {
            title: card.title,
            value: card.value,
            icon: card.icon,
            change: card.change,
            changeType: card.changeType,
            viewMoreUrl: card.viewMoreUrl
          },
          card.title,
          !1,
          {
            fileName: "app/routes/app/index.tsx",
            lineNumber: 111,
            columnNumber: 15
          },
          this
        ) }, card.title, !1, {
          fileName: "app/routes/app/index.tsx",
          lineNumber: 110,
          columnNumber: 13
        }, this)),
        /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_react27.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { children: "Loading..." }, void 0, !1, {
          fileName: "app/routes/app/index.tsx",
          lineNumber: 123,
          columnNumber: 33
        }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_LineChart.default, {}, void 0, !1, {
          fileName: "app/routes/app/index.tsx",
          lineNumber: 124,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/routes/app/index.tsx",
          lineNumber: 123,
          columnNumber: 13
        }, this) }, "Chart", !1, {
          fileName: "app/routes/app/index.tsx",
          lineNumber: 122,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
          "div",
          {
            className: "",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_react27.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { children: "Loading..." }, void 0, !1, {
              fileName: "app/routes/app/index.tsx",
              lineNumber: 129,
              columnNumber: 33
            }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_GroupChart.default, { Chart: import_BarChart.default }, void 0, !1, {
              fileName: "app/routes/app/index.tsx",
              lineNumber: 130,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "app/routes/app/index.tsx",
              lineNumber: 129,
              columnNumber: 13
            }, this)
          },
          "2Chart",
          !1,
          {
            fileName: "app/routes/app/index.tsx",
            lineNumber: 127,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(
          "div",
          {
            className: "",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_react27.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)("div", { children: "Loading..." }, void 0, !1, {
              fileName: "app/routes/app/index.tsx",
              lineNumber: 135,
              columnNumber: 33
            }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime32.jsxDEV)(import_GroupChart.default, { Chart: import_PieChart.default }, void 0, !1, {
              fileName: "app/routes/app/index.tsx",
              lineNumber: 136,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "app/routes/app/index.tsx",
              lineNumber: 135,
              columnNumber: 13
            }, this)
          },
          "3Chart",
          !1,
          {
            fileName: "app/routes/app/index.tsx",
            lineNumber: 133,
            columnNumber: 11
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/routes/app/index.tsx",
      lineNumber: 98,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "app/routes/app/index.tsx",
    lineNumber: 97,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/app/index.tsx",
    lineNumber: 96,
    columnNumber: 5
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "f6c8dbcf", entry: { module: "/build/entry.client-7OED5SKA.js", imports: ["/build/_shared/chunk-4VHGEEME.js", "/build/_shared/chunk-U53J7DNI.js", "/build/_shared/chunk-4IYZMDEG.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-WWYUBN4V.js", imports: ["/build/_shared/chunk-4RTYW432.js", "/build/_shared/chunk-BRVGR7AF.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/action/enable-analytics": { id: "routes/action/enable-analytics", parentId: "root", path: "action/enable-analytics", index: void 0, caseSensitive: void 0, module: "/build/routes/action/enable-analytics-RXBNHWXA.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/action/set-theme": { id: "routes/action/set-theme", parentId: "root", path: "action/set-theme", index: void 0, caseSensitive: void 0, module: "/build/routes/action/set-theme-BKNWSNHK.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app": { id: "routes/app", parentId: "root", path: "app", index: void 0, caseSensitive: void 0, module: "/build/routes/app-T7FNM6AG.js", imports: ["/build/_shared/chunk-5MNE4EW5.js", "/build/_shared/chunk-BXFTOLMJ.js", "/build/_shared/chunk-QJU5LTUJ.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/expenses": { id: "routes/app/expenses", parentId: "routes/app", path: "expenses", index: void 0, caseSensitive: void 0, module: "/build/routes/app/expenses-OBVEINBI.js", imports: ["/build/_shared/chunk-4YPHBX4Y.js", "/build/_shared/chunk-OSMIZZ5H.js", "/build/_shared/chunk-5VHVQIOT.js", "/build/_shared/chunk-BRVGR7AF.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/expenses/$expenseId": { id: "routes/app/expenses/$expenseId", parentId: "routes/app/expenses", path: ":expenseId", index: void 0, caseSensitive: void 0, module: "/build/routes/app/expenses/$expenseId-SIS22LOQ.js", imports: ["/build/_shared/chunk-GUJVYOES.js", "/build/_shared/chunk-H6EXVK5O.js", "/build/_shared/chunk-E66OKMIN.js", "/build/_shared/chunk-5MNE4EW5.js", "/build/_shared/chunk-BXFTOLMJ.js", "/build/_shared/chunk-QJU5LTUJ.js", "/build/_shared/chunk-SNIONXXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !0, hasErrorBoundary: !0 }, "routes/app/expenses/new": { id: "routes/app/expenses/new", parentId: "routes/app/expenses", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/app/expenses/new-6VSM5YXP.js", imports: ["/build/_shared/chunk-GUJVYOES.js", "/build/_shared/chunk-H6EXVK5O.js", "/build/_shared/chunk-E66OKMIN.js", "/build/_shared/chunk-5MNE4EW5.js", "/build/_shared/chunk-BXFTOLMJ.js", "/build/_shared/chunk-QJU5LTUJ.js", "/build/_shared/chunk-SNIONXXY.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/groups": { id: "routes/app/groups", parentId: "routes/app", path: "groups", index: void 0, caseSensitive: void 0, module: "/build/routes/app/groups-Y76NA5OV.js", imports: ["/build/_shared/chunk-OSMIZZ5H.js", "/build/_shared/chunk-BRVGR7AF.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/groups/$groupId": { id: "routes/app/groups/$groupId", parentId: "routes/app/groups", path: ":groupId", index: void 0, caseSensitive: void 0, module: "/build/routes/app/groups/$groupId-SWAXCW3R.js", imports: ["/build/_shared/chunk-Q5JYTQT5.js", "/build/_shared/chunk-E66OKMIN.js", "/build/_shared/chunk-5MNE4EW5.js", "/build/_shared/chunk-BXFTOLMJ.js", "/build/_shared/chunk-QJU5LTUJ.js", "/build/_shared/chunk-SNIONXXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/groups/new": { id: "routes/app/groups/new", parentId: "routes/app/groups", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/app/groups/new-SNHZ2JZX.js", imports: ["/build/_shared/chunk-Q5JYTQT5.js", "/build/_shared/chunk-E66OKMIN.js", "/build/_shared/chunk-5MNE4EW5.js", "/build/_shared/chunk-BXFTOLMJ.js", "/build/_shared/chunk-QJU5LTUJ.js", "/build/_shared/chunk-SNIONXXY.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/index": { id: "routes/app/index", parentId: "routes/app", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/app/index-MSKTN4JI.js", imports: ["/build/_shared/chunk-BRVGR7AF.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/investments": { id: "routes/app/investments", parentId: "routes/app", path: "investments", index: void 0, caseSensitive: void 0, module: "/build/routes/app/investments-W4QRKP2A.js", imports: ["/build/_shared/chunk-4YPHBX4Y.js", "/build/_shared/chunk-OSMIZZ5H.js", "/build/_shared/chunk-5VHVQIOT.js", "/build/_shared/chunk-BRVGR7AF.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/investments/$investmentId": { id: "routes/app/investments/$investmentId", parentId: "routes/app/investments", path: ":investmentId", index: void 0, caseSensitive: void 0, module: "/build/routes/app/investments/$investmentId-7G67TFSM.js", imports: ["/build/_shared/chunk-POGFLOML.js", "/build/_shared/chunk-H6EXVK5O.js", "/build/_shared/chunk-E66OKMIN.js", "/build/_shared/chunk-5MNE4EW5.js", "/build/_shared/chunk-BXFTOLMJ.js", "/build/_shared/chunk-QJU5LTUJ.js", "/build/_shared/chunk-SNIONXXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/app/investments/new": { id: "routes/app/investments/new", parentId: "routes/app/investments", path: "new", index: void 0, caseSensitive: void 0, module: "/build/routes/app/investments/new-45S3MNW2.js", imports: ["/build/_shared/chunk-POGFLOML.js", "/build/_shared/chunk-H6EXVK5O.js", "/build/_shared/chunk-E66OKMIN.js", "/build/_shared/chunk-5MNE4EW5.js", "/build/_shared/chunk-BXFTOLMJ.js", "/build/_shared/chunk-QJU5LTUJ.js", "/build/_shared/chunk-SNIONXXY.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/healthcheck": { id: "routes/healthcheck", parentId: "root", path: "healthcheck", index: void 0, caseSensitive: void 0, module: "/build/routes/healthcheck-FO75TDAZ.js", imports: void 0, hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/index-4265O7FS.js", imports: ["/build/_shared/chunk-QJU5LTUJ.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/build/routes/join-GP74JHYL.js", imports: ["/build/_shared/chunk-SNIONXXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-UWFFHCBZ.js", imports: ["/build/_shared/chunk-SNIONXXY.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-TLBEXFRQ.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-F6C8DBCF.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { unstable_cssModules: !1, unstable_cssSideEffectImports: !1, unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, unstable_vanillaExtract: !1, v2_errorBoundary: !1, v2_meta: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/action/enable-analytics": {
    id: "routes/action/enable-analytics",
    parentId: "root",
    path: "action/enable-analytics",
    index: void 0,
    caseSensitive: void 0,
    module: enable_analytics_exports
  },
  "routes/action/set-theme": {
    id: "routes/action/set-theme",
    parentId: "root",
    path: "action/set-theme",
    index: void 0,
    caseSensitive: void 0,
    module: set_theme_exports
  },
  "routes/healthcheck": {
    id: "routes/healthcheck",
    parentId: "root",
    path: "healthcheck",
    index: void 0,
    caseSensitive: void 0,
    module: healthcheck_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  },
  "routes/app/investments": {
    id: "routes/app/investments",
    parentId: "routes/app",
    path: "investments",
    index: void 0,
    caseSensitive: void 0,
    module: investments_exports
  },
  "routes/app/investments/$investmentId": {
    id: "routes/app/investments/$investmentId",
    parentId: "routes/app/investments",
    path: ":investmentId",
    index: void 0,
    caseSensitive: void 0,
    module: investmentId_exports
  },
  "routes/app/investments/new": {
    id: "routes/app/investments/new",
    parentId: "routes/app/investments",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/app/expenses": {
    id: "routes/app/expenses",
    parentId: "routes/app",
    path: "expenses",
    index: void 0,
    caseSensitive: void 0,
    module: expenses_exports
  },
  "routes/app/expenses/$expenseId": {
    id: "routes/app/expenses/$expenseId",
    parentId: "routes/app/expenses",
    path: ":expenseId",
    index: void 0,
    caseSensitive: void 0,
    module: expenseId_exports
  },
  "routes/app/expenses/new": {
    id: "routes/app/expenses/new",
    parentId: "routes/app/expenses",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports2
  },
  "routes/app/groups": {
    id: "routes/app/groups",
    parentId: "routes/app",
    path: "groups",
    index: void 0,
    caseSensitive: void 0,
    module: groups_exports
  },
  "routes/app/groups/$groupId": {
    id: "routes/app/groups/$groupId",
    parentId: "routes/app/groups",
    path: ":groupId",
    index: void 0,
    caseSensitive: void 0,
    module: groupId_exports
  },
  "routes/app/groups/new": {
    id: "routes/app/groups/new",
    parentId: "routes/app/groups",
    path: "new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports3
  },
  "routes/app/index": {
    id: "routes/app/index",
    parentId: "routes/app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_exports2
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
