import { Link, useMatches } from "@remix-run/react";

export default function Index() {
  const match = useMatches().find((d) => d.id === "routes/app");
  return (
    <>
      <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
        <div className="relative sm:pb-16 sm:pt-8">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/jose-donato/race-stack"
                  className="absolute z-20 top-4 right-4 text-white text-sm font-medium bg-orange-500 rounded-md px-3 py-1 hover:bg-orange-600"
                >
                  Check on GitHub
                </a>
                <div
                  style={{
                    backgroundImage:
                      'url("https://user-images.githubusercontent.com/43375532/235504302-59de9ece-72b4-4a83-a9a5-edeb61353d8f.png")',
                  }}
                  className="h-full w-full bg-cover blur backdrop-filter"
                />
                <div className="absolute inset-0 bg-[color:rgba(255, 125, 28, 0.5)] mix-blend-multiply" />
              </div>
              <div className="relative px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
                <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                  <span className="block uppercase text-orange-500 drop-shadow-md">
                    Race Stack
                  </span>
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                  Check the README.md file for instructions on how to get this
                  project deployed.
                </p>
                <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                  {match?.data?.user ? (
                    <Link
                      to="/app"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-orange-700 shadow-sm hover:bg-orange-50 sm:px-8"
                    >
                      View dashboard
                    </Link>
                  ) : (
                    <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                      <Link
                        to="/register"
                        className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-orange-700 shadow-sm hover:bg-orange-50 sm:px-8"
                      >
                        Sign up
                      </Link>
                      <Link
                        to="/login"
                        className="flex items-center justify-center rounded-md bg-orange-500 px-4 py-3 font-medium text-white hover:bg-orange-600"
                      >
                        Log In
                      </Link>
                    </div>
                  )}
                </div>
                <a href="https://remix.run">
                  <img
                    src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                    alt="Remix"
                    className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <div className="mt-6 flex flex-wrap justify-center gap-8">
              {[
                {
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Cloudflare_Logo.svg/1200px-Cloudflare_Logo.svg.png",
                  alt: "Cloudflare",
                  href: "https://cloudflare.com",
                },
                {
                  src: "https://user-images.githubusercontent.com/1500684/157764395-137ec949-382c-43bd-a3c0-0cb8cb22e22d.svg",
                  alt: "SQLite",
                  href: "https://sqlite.org",
                },
                {
                  src: "https://avatars.githubusercontent.com/u/108468352?s=200&v=4",
                  alt: "Drizzle",
                  href: "https://github.com/drizzle-team/drizzle-orm",
                },
                {
                  src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
                  alt: "Tailwind",
                  href: "https://tailwindcss.com",
                },
                {
                  src: "https://ui.shadcn.com/android-chrome-512x512.png",
                  alt: "Shadcn UI",
                  href: "https://ui.shadcn.com",
                },
                {
                  src: "https://avatars.githubusercontent.com/u/75042455?s=200&v=4",
                  alt: "Radix UI",
                  href: "https://radix-ui.com",
                },
                {
                  src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                  alt: "Prettier",
                  href: "https://prettier.io",
                },
                {
                  src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                  alt: "ESLint",
                  href: "https://eslint.org",
                },
                {
                  src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                  alt: "TypeScript",
                  href: "https://typescriptlang.org",
                },
                {
                  src: "https://user-images.githubusercontent.com/43375532/235520280-34d3fa64-f9d2-4b5d-a4f6-81481308e28e.svg",
                  alt: "Posthog",
                  href: "https://posthog.com",
                },
              ].map((img) => (
                <a
                  key={img.href}
                  href={img.href}
                  className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
                >
                  <img alt={img.alt} src={img.src} className="object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
