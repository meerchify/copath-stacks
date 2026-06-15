import { StarIcon } from "@heroicons/react/24/solid";
import { SectionHeading } from "components/section-heading";

const reviews = [
  {
    name: "Sarah M.",
    title: "Exceptional support and care",
    body: "From the moment I placed my order to delivery, the experience was seamless. It arrived in perfect condition and a day early. Highly recommend!",
  },
  {
    name: "James T.",
    title: "Beautiful design and finish",
    body: "Premium feel and quality that far exceeded what I expected at this price point. Will be ordering again.",
  },
  {
    name: "Elena R.",
    title: "A truly great experience",
    body: "Fast shipping, great communication, and exactly as described. Easily one of my favorite shops to buy from.",
  },
];

// Static social-proof block for the product page. Swap for a real review widget
// (Judge.me, Loox, Okendo, …) when you're ready. Fully token-based.
export function Reviews() {
  return (
    <section>
      <SectionHeading title="Reviews" subtitle="What customers are saying." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.name}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4" />
              ))}
            </div>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {review.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {review.body}
            </p>
            <p className="mt-4 text-xs font-medium text-foreground">
              {review.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
