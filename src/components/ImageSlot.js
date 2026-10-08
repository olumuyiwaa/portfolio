import Image from "next/image";

// Renders the image when `src` is set. Without one it renders `fallback`
// (a designed stand-in) inside the same shape, or nothing at all when
// `hideWhenEmpty` is set, so layouts never show a blank box.
export default function ImageSlot({
  src,
  alt = "",
  ratio = "aspect-[4/3]",
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  fallback = null,
  hideWhenEmpty = false,
}) {
  if (!src && hideWhenEmpty) return null;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-sage-100 to-sage-200 ${ratio} ${className}`}
      aria-hidden={src ? undefined : true}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        fallback
      )}
    </div>
  );
}
