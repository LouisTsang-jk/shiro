export const site = {
  name: "Louis Tsang",
  tagline: "",
  description: "Writing by Louis Tsang.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.louis-tsang.com",
  locale: "en",
  author: {
    name: "Louis Tsang",
    email: "louistsangjk@gmail.com",
    github: "https://github.com/LouisTsang-jk",
  },
  heroWord: "Loop",
} as const;

export const navItems = [
  { label: "Essays", href: "/", match: ["/", "/archive", "/essays"] },
  { label: "Notes", href: "/notes", match: ["/notes"] },
] as const;
