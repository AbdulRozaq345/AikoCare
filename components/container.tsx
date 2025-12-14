"use client";

import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Container({
  children,
  className = "",
  ...rest
}: ContainerProps) {
  return (
    <div className={`container p-8 mx-auto xl:px-0 ${className}`} {...rest}>
      {children}
    </div>
  );
}