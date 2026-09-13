import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Load eagerly with high priority — use only on the homepage's hero,
   * the actual LCP element, not on every page's hero. */
  priority?: boolean;
};

/** Full-bleed banner photo above the constrained article column. */
export default function HeroBanner({ src, alt, width, height, priority }: Props) {
  return (
    <div className="bg-black/5">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="mx-auto h-[220px] w-full max-w-6xl object-cover sm:h-[320px]"
      />
    </div>
  );
}
