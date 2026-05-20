import type { ComponentProps, ReactNode } from "react";
import { MotionLink } from "./motion-link";

type QuietLinkProps = Omit<ComponentProps<typeof MotionLink>, "children"> & {
  children: ReactNode;
};

export function QuietLink({ children, className, ...rest }: QuietLinkProps) {
  return (
    <MotionLink {...rest} className={`quiet-link ${className ?? ""}`.trim()}>
      {children}
    </MotionLink>
  );
}
