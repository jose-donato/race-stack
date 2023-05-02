import {
  createCookie,
  createCookieSessionStorage,
} from "@remix-run/cloudflare";

export const gdprConsent = createCookie("gdpr-consent", {
  maxAge: 31536000, // One Year
});

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_auth_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["replace_me"], // replace this with an actual secret
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  },
});

export const flashSession = createCookieSessionStorage({
  cookie: {
    name: "PP_flash_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["secretttokdoakdw"], // replace this with an actual secret
    secure: true, // enable this in prod only
    maxAge: 60 * 60 * 24 * 30,
  },
});
