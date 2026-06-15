import { ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";

// The two reassurance bars Wokiee shows above the footer.
export function FeatureBars() {
  const features = [
    {
      icon: TruckIcon,
      title: "Free Shipping on Orders Over $50",
      body: "Enjoy free standard shipping when you spend $50 or more. No hidden fees — just one flat, honest price at checkout.",
    },
    {
      icon: ShieldCheckIcon,
      title: "Payment Security",
      body: "Your security is our priority. All payments are encrypted and processed securely — we never store your payment details.",
    },
  ];

  return (
    <div className="mx-auto grid max-w-(--breakpoint-2xl) gap-6 px-4 py-10 sm:grid-cols-2">
      {features.map((f) => (
        <div
          key={f.title}
          className="flex items-start gap-4 rounded-lg border border-border bg-card p-5"
        >
          <f.icon className="h-9 w-9 flex-none text-primary" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
