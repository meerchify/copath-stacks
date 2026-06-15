"use client";

import { useState } from "react";
import { toast } from "sonner";

// Presentational newsletter signup — captures the email locally and shows a
// confirmation. Wire it to your ESP (Klaviyo, Mailchimp, …) when you're ready.
export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        toast.success("Thanks for subscribing!");
        setEmail("");
      }}
      className="flex w-full max-w-sm overflow-hidden rounded-md border border-border bg-card"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        aria-label="Email address"
        className="w-full bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-hidden"
      />
      <button
        type="submit"
        className="flex-none bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  );
}
