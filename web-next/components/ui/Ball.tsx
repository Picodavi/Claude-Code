import type { CSSProperties } from "react";

// Esfera 3D glossy (CSS). Se posiciona con className (absolute + top/left...).
export function Ball({
  size,
  color,
  className = "",
  style,
}: {
  size: number;
  color: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`ball ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
        ["--ball-color" as string]: color,
      } as CSSProperties}
    />
  );
}
