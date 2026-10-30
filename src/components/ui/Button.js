import Link from "next/link";

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";

  const variants = {
    primary: "bg-lime-400 text-black hover:bg-lime-300",
    secondary:
      "border border-white/20 text-white hover:border-lime-400 hover:text-lime-400",
    dark: "bg-neutral-900 text-white hover:bg-neutral-700",
  };

  const styles = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
