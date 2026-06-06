// MDX component map for next-mdx-remote/rsc. Passed to <MDXRemote
// components={mdxComponents} />. Includes element-level overrides
// (a → Next.js Link for internal hrefs) and named custom components
// (TryItCTA, Callout) used inside article MDX.

import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { TryItCTA } from "@/components/blog/TryItCTA";
import { Callout } from "@/components/blog/Callout";

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    if (isInternal && href) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
  TryItCTA,
  Callout,
};
