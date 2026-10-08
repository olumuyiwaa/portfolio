import Image from "next/image";

// Renders the image when `src` is set, otherwise a blank placeholder with
// the same shape, so layouts hold together before the real images exist.
export default function ImageSlot({
  src,
  alt = "",
  ratio = "aspect-[4/3]",
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-sage-100 to-sage-200 ${ratio} ${className}`}
      aria-hidden={src ? undefined : true}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : null}
    </div>
  );
}
