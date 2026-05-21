import type { AnchorHTMLAttributes, ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import rehypeSlug from "rehype-slug";
import { ClaudeReplyDemo, ClaudeReplySource } from "./claude-html-demo";
import { ImagineSpecSource } from "./imagine-spec-source";
import { Reference, References } from "./references";

function MDXAnchor({
  children,
  href,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = typeof href === "string" && /^https?:\/\//.test(href);
  return (
    <a
      href={href ?? "#"}
      className="quiet-link"
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}

function Lead({ children }: { children: ReactNode }) {
  return <span className="small-caps">{children}</span>;
}

const components = {
  a: MDXAnchor,
  Lead,
  ClaudeReplyDemo,
  ClaudeReplySource,
  ImagineSpecSource,
  References,
  Reference,
};

type MDXContentProps = {
  source: string;
};

export async function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkSmartypants],
          rehypePlugins: [rehypeSlug],
        },
      }}
    />
  );
}
