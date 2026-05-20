import type { ReactNode } from "react";

type FrameProps = {
  children: ReactNode;
  dense?: boolean;
};

export function Frame({ children, dense = false }: FrameProps) {
  const px = dense ? 64 : 112;
  const py = dense ? 48 : 80;

  return (
    <div className="page">
      <div
        className="frame mx-auto"
        style={{
          padding: `${py}px ${px}px`,
          maxWidth: 1280,
        }}
      >
        {children}
      </div>
    </div>
  );
}
