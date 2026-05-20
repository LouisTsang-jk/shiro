import type { ReactNode } from "react";

type FirstParagraphProps = {
  text: string;
};

export function FirstParagraph({ text }: FirstParagraphProps): ReactNode {
  // Set the opening 1–3 words in small caps as a low‑volume drop‑cap substitute.
  const match = text.match(/^([\w'’]+(?:\s[\w'’]+){0,2})(.*)$/);
  if (!match) return text;
  return (
    <>
      <span className="small-caps">{match[1]}</span>
      {match[2]}
    </>
  );
}
