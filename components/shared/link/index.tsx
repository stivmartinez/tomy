"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode;
  clasName?: string;
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
  const pathname = usePathname();
  const localePattern = /^\/(en|es)\//;

  const hrefWithLocale = localePattern.test(pathname)
    ? `/${pathname.split("/")[1]}${href}`
    : href;

  return (
    <NextLink href={hrefWithLocale} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
