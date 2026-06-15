import Link from "next/link";

// Shared homepage section heading: a tight title with a muted one-line subtitle,
// and an optional quiet "View all →" link aligned to the right. All colors come
// from design tokens so theme presets restyle it.
export function SectionHeading({
  title,
  subtitle,
  href,
  viewAllLabel = "View all",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  viewAllLabel?: string;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          prefetch={true}
          className="group flex-none text-sm font-medium text-primary"
        >
          {viewAllLabel}
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}
