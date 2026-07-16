import Image, { type StaticImageData } from "next/image";

// Marco de navegador alrededor de una captura de web (estilo "product shot").
export function DeviceFrame({
  src,
  alt,
  url,
  href,
  priority,
}: {
  src: string | StaticImageData;
  alt: string;
  url: string;
  href?: string;
  priority?: boolean;
}) {
  const inner = (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.5)] ring-1 ring-black/5">
      <div className="flex items-center gap-2 bg-[#efeae0] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-gold" />
        <span className="h-3 w-3 rounded-full bg-pine" />
        <span className="h-3 w-3 rounded-full bg-[#c9c2b5]" />
        <span className="ml-3 flex h-6 flex-1 items-center rounded-full bg-white px-3 font-mono text-[11px] text-muted">
          {url}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1400}
        height={875}
        className="h-auto w-full"
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 60vw"
      />
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener" className="block">
      {inner}
    </a>
  ) : (
    inner
  );
}
