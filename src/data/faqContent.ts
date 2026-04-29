export type FaqEntry = { question: string; answer: string };

export const FAQ_ITEMS: FaqEntry[] = [
  {
    question: "How much does permanent roofline lighting cost?",
    answer:
      "Most residential projects we see land roughly between $1,750 and $7,500+ depending on how much roofline we light (front only vs. sides vs. full wrap) and how complex the roof is. Use the ballpark calculator on this page for a starting range. After a quick visit we can give you a firm, written quote.",
  },
  {
    question: "How does the ballpark calculator work?",
    answer:
      "It asks whether your project is residential or commercial, then a few questions about your home or business. Residential answers map to typical ranges we see in Central Texas. Commercial work isn’t priced from the form—we use your address and preferred callback time to schedule an on-site visit so we can measure access, roof height, and electrical scope safely.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Many homes are completed in about a day once materials are on site. Larger wraps or trickier roof access can run longer. We’ll give you a realistic schedule with your quote.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We install permanent lighting across Central Texas, including Austin, Round Rock, Pflugerville, Cedar Park, Leander, and surrounding communities. See our service areas page for the full list.",
  },
  {
    question: "What is included in a typical install?",
    answer:
      "A custom layout for your roofline, professional installation with clean, low-profile channels, app-based color and scheduling, and a walkthrough so you know how to run scenes and holidays. Exact inclusions are spelled out in your proposal.",
  },
  {
    question: "Do I need HOA approval?",
    answer:
      "Many neighborhoods require approval for exterior changes. We can provide photos and product details to support your application. Check with your HOA—we’re happy to help with paperwork they request.",
  },
  {
    question: "How do I control colors and schedules?",
    answer:
      "Systems are app-controlled: presets, colors, brightness, and timers from your phone. During install we connect everything and show you how to get started.",
  },
  {
    question: "Do you offer warranties?",
    answer:
      "We stand behind our workmanship and will review warranty coverage with you on the estimate so expectations are clear before you commit.",
  },
];

export function faqPageSchema(entries: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
