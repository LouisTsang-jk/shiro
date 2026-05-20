type SealProps = {
  size?: number;
};

export function Seal({ size = 6 }: SealProps) {
  return (
    <div style={{ textAlign: "center" }} aria-hidden="true">
      <span
        className="seal-dot"
        style={{
          display: "inline-block",
          width: size,
          height: size,
          background: "var(--ink)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
