export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}) {
  const alignment = align === "left" ? "text-left" : "text-center";

  const titleColor = light ? "text-white" : "text-neutral-950";
  const descriptionColor = light ? "text-neutral-300" : "text-neutral-600";

  return (
    <div className={`mx-auto max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-lime-500">
          {eyebrow}
        </p>
      )}

      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${titleColor}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg ${descriptionColor}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
