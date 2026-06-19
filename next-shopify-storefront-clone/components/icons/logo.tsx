import clsx from "clsx";

// Universal "shopping bag" mark — framework-neutral so this works as a generic
// Codrafts store starter (swap it for your own brand mark in components/icons).
export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`${process.env.SITE_NAME} logo`}
      viewBox="0 0 24 24"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
      className={clsx("h-4 w-4 fill-foreground", props.className)}
    >
      <path d="M8 7a4 4 0 1 1 8 0h2.2a2 2 0 0 1 1.99 1.8l1.2 11A2 2 0 0 1 19.4 22H4.6a2 2 0 0 1-1.99-2.2l1.2-11A2 2 0 0 1 5.8 7H8zm2 0h4a2 2 0 1 0-4 0zm-2 3a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm6 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
    </svg>
  );
}
