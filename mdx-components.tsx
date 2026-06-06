// Global MDX component overrides + named imports for articles.
// Every .mdx file under src/content/ gets these by default.
// Articles can override/add via their own import statements at the top.

import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { TryItCTA } from "@/components/blog/TryItCTA";
import { Callout } from "@/components/blog/Callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Default elements styled for our editorial prose.
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
    // Custom MDX components — articles use these by name.
    TryItCTA,
    Callout,
    // Spread anything the caller provides last so they can override.
    ...components,
  };
}
