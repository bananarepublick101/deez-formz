import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    title: "Conversational Forms",
    description:
      "One question at a time keeps respondents focused and engaged, leading to higher completion rates.",
    color: "text-primary",
  },
  {
    title: "Beautiful by Default",
    description:
      "Every form looks stunning out of the box. No design skills needed — just add your questions and go.",
    color: "text-secondary",
  },
  {
    title: "Powerful Analytics",
    description:
      "See responses in real time, track completion rates, and export your data whenever you need it.",
    color: "text-accent",
  },
];

export function Features() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to collect great data
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card">
              <CardHeader>
                <CardTitle className={feature.color}>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
