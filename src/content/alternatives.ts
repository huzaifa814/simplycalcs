export interface Alternative {
  slug: string;
  competitor: string;
  title: string;
  metaDescription: string;
  intro: string;
  pros: string[];
  cons: string[];
  ourAdvantages: string[];
  whenToUseThem: string;
  whenToUseUs: string;
  publishedAt: string;
}

export const alternatives: Alternative[] = [
  {
    slug: 'nerdwallet',
    competitor: 'NerdWallet',
    title: 'SimplyCalcs vs NerdWallet — Which Calculator Should You Use?',
    metaDescription: 'NerdWallet has great calculators but layers them with affiliate offers. SimplyCalcs is the same math without the upsell — free, ad-light.',
    intro: 'NerdWallet is a personal finance content empire that monetizes via affiliate offers — every calculator surrounds the math with credit card and loan recommendations. The calculators themselves are solid, but the experience is busy. SimplyCalcs aims at people who just want the answer.',
    pros: [
      'Comprehensive — covers nearly every personal finance calculation',
      'Educational content alongside the math',
      'Trusted brand, well-known editorial team',
    ],
    cons: [
      'Heavy affiliate placements — partner banks and lenders pay for top spots',
      'Page weight is significant; calculators slow on mobile',
      'Constant prompts to compare credit cards or refi loans',
    ],
    ourAdvantages: [
      'No affiliate offers, no comparison tables — just the calculator',
      'Loads in under a second; works on the worst hotel WiFi',
      'No signup, no email capture, no exit-intent popups',
    ],
    whenToUseThem: 'You want education along with the math, or you genuinely want to shop for credit cards and loans.',
    whenToUseUs: 'You know what you need to calculate. You want the answer, not the editorial.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'bankrate',
    competitor: 'Bankrate',
    title: 'SimplyCalcs vs Bankrate — Calculator Comparison',
    metaDescription: 'Bankrate is the original online financial calculator hub. SimplyCalcs offers the same calculators with a faster, cleaner interface.',
    intro: 'Bankrate has been online since 1996 and helped invent the financial-calculator-as-content category. The site monetizes through rate tables that compete for placement. The math is good; the experience is dated and rate-table-heavy.',
    pros: [
      'Authoritative source, often cited by financial press',
      'Wide range of calculators including obscure ones',
      'Lender rate comparison features',
    ],
    cons: [
      'Heavy ads, including auto-playing video on some pages',
      'Mobile experience is cramped',
      'Rate tables pushed into every calculator result page',
    ],
    ourAdvantages: [
      'Visually clean — calculator first, no ads above the fold',
      'Mobile-first responsive design',
      'No rate-shopping pressure when you just want a quick number',
    ],
    whenToUseThem: 'You\'re actively comparing mortgage or savings rates and want their lender table.',
    whenToUseUs: 'You want a fast standalone calculator on any device.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'calculator-net',
    competitor: 'Calculator.net',
    title: 'SimplyCalcs vs Calculator.net',
    metaDescription: 'Calculator.net has hundreds of calculators with a 1990s-style interface. SimplyCalcs covers the essentials with modern design.',
    intro: 'Calculator.net is the Wikipedia of online calculators — comprehensive, functional, and visually stuck in the early 2000s. If you need a calculator for a niche use case (statistical, scientific, conversion), they probably have it. For mainstream finance/health/everyday calculations, SimplyCalcs is faster and better-designed.',
    pros: [
      'Largest single library of online calculators (~500+)',
      'No login required, free to use',
      'Detailed math explanations alongside many calculators',
    ],
    cons: [
      'UI feels like 2008 — dense forms, small buttons, low contrast',
      'Mobile usability is poor — designed primarily for desktop',
      'No clear navigation between related calculators',
    ],
    ourAdvantages: [
      'Modern responsive UI, designed for phones first',
      'Clean visual hierarchy — input → result is one glance',
      'Curated to the most common 18 calculators (no decision paralysis)',
    ],
    whenToUseThem: 'You need a niche calculator (probability, statistics, geometry) we don\'t cover.',
    whenToUseUs: 'You need a mainstream finance, health, math, or everyday calculation done quickly.',
    publishedAt: '2026-05-08',
  },
  {
    slug: 'zillow-affordability',
    competitor: 'Zillow Affordability Calculator',
    title: 'SimplyCalcs vs Zillow Affordability Calculator',
    metaDescription: 'Zillow estimates how much house you can afford but pushes you toward listings. SimplyCalcs gives the math without the listing distractions.',
    intro: 'Zillow\'s mortgage and affordability calculators are tightly integrated with their listing search — the affordability number flows into recommended homes. That\'s great if you\'re ready to shop. If you\'re not, SimplyCalcs gives you the math first without the dopamine hit of browsing $700k bungalows.',
    pros: [
      'Direct integration with home listings on Zillow',
      'Pre-qualification flow if you\'re ready to apply for a mortgage',
      'Familiar to anyone who\'s house-shopped online',
    ],
    cons: [
      'Pushes you toward listings before you\'ve thought through the budget',
      'Mortgage rate quotes funnel into Zillow Home Loans (their lender)',
      'Less control over assumptions — limited tax/insurance customization',
    ],
    ourAdvantages: [
      'Affordability + mortgage payment isolated from listings',
      'Lender-neutral — no incentive to push any particular loan product',
      'Full control over rate, term, taxes, insurance, HOA assumptions',
    ],
    whenToUseThem: 'You\'re actively ready to shop and want listings tied to your budget.',
    whenToUseUs: 'You\'re still doing the math, exploring scenarios, or deciding whether to shop at all.',
    publishedAt: '2026-05-08',
  },
];

export const getAlternative = (slug: string) => alternatives.find(a => a.slug === slug);
