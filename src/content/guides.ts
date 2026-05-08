export interface GuideStep { title: string; body: string }
export interface GuideFAQ { q: string; a: string }
export interface Guide {
  slug: string;
  title: string;
  query: string;
  metaDescription: string;
  intro: string;
  steps: GuideStep[];
  tips: string[];
  faq: GuideFAQ[];
  relatedTool: string;
  keywords: string[];
  publishedAt: string;
}

export const guides: Guide[] = [
  {
    slug: 'how-much-house-can-i-afford',
    title: 'How Much House Can I Afford? (2026 Calculator + Rules of Thumb)',
    query: 'how much house can i afford',
    metaDescription: 'Use the 28/36 rule and current 2026 mortgage rates to calculate how much house you can actually afford. Free calculator, no signup.',
    intro: 'The honest answer is "less than your bank will lend you." Banks pre-approve based on debt-to-income ratios that assume you can stomach max payments forever. Real life — kids, car repairs, a slow quarter at work — needs slack. This guide walks through the 28/36 rule, current 2026 rates, and how to use the free calculator to land on a payment you can keep paying when life gets weird.',
    steps: [
      { title: 'Calculate your monthly gross income', body: 'Take your annual salary and divide by 12. If you have variable income (commission, freelance), use the 12-month average. Both spouses combined if buying together.' },
      { title: 'Apply the 28% rule', body: 'Your housing cost (principal + interest + taxes + insurance + HOA) should not exceed 28% of gross monthly income. On $100k/yr ($8,333/mo), that\'s $2,333/mo max housing.' },
      { title: 'Apply the 36% total debt rule', body: 'All debt payments combined (housing + cars + credit cards + student loans) should stay under 36% of gross. This is what lenders look at as the back-end ratio.' },
      { title: 'Plug into the mortgage calculator', body: 'Use our Mortgage Calculator with your max housing payment minus ~$300-600/mo for property tax + insurance. The remainder is your principal + interest budget.' },
      { title: 'Work backward to home price', body: 'At today\'s ~7% rates over 30 years, every $1,000/mo of P&I supports about $150,000 of loan. Add your down payment to get max home price.' },
    ],
    tips: [
      'A 20% down payment avoids PMI (private mortgage insurance) — typically 0.5-1.5% of the loan annually. Skip it if you can.',
      'Property taxes vary 5-10x between states. Add 1.2% of home value per year as a rough national average; check your county for actual numbers.',
      'Closing costs run 2-5% of the home price. Budget for them on top of the down payment.',
      'Lenders often approve more than the 28/36 rule allows. They will not stop you from buying too much house.',
    ],
    faq: [
      { q: 'Should I buy at the top of my approval?', a: 'No. Banks underwrite for ability to pay, not financial breathing room. Buying at 80-90% of approval gives you margin for repairs, raises that don\'t come, and life events.' },
      { q: 'What if I have student loans?', a: 'They count in the 36% back-end ratio. If your monthly student loan payment is $400 on $100k income, you have only $2,600/mo left for housing + other debts.' },
      { q: 'Are the rules different for first-time buyers?', a: 'Same math, but FHA loans allow as little as 3.5% down (with PMI) and slightly higher debt ratios. Use them if you need to, but the smaller payment from 20% down is hard to beat.' },
    ],
    relatedTool: 'mortgage-calculator',
    keywords: ['how much house can i afford', '28/36 rule', 'mortgage affordability', 'first time home buyer'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'mortgage-calculator-with-taxes-and-insurance',
    title: 'Mortgage Calculator with Taxes and Insurance (Full PITI)',
    query: 'mortgage calculator with taxes and insurance',
    metaDescription: 'Calculate full PITI: principal + interest + taxes + insurance. See your true monthly mortgage payment, not just P&I.',
    intro: 'Most online calculators show only principal and interest (P&I). But your actual mortgage payment is PITI — Principal, Interest, Taxes, Insurance. Skipping T+I undercounts your real cost by $300-800/month for typical homes. Here\'s how to estimate full PITI with our calculator plus a few quick lookups.',
    steps: [
      { title: 'Get your P&I from the calculator', body: 'Use the Mortgage Calculator with home price, down payment, rate, and term. The result is principal + interest only.' },
      { title: 'Look up property tax rate', body: 'Search "[your county] property tax rate." Most US counties charge 0.5-2.5% of assessed value per year. Multiply home price × tax rate ÷ 12 = monthly tax.' },
      { title: 'Estimate homeowners insurance', body: 'Average US is $1,400-2,000/year for a $400k home. Higher in FL/CA/TX (hurricanes, wildfires, hail). Divide annual quote by 12.' },
      { title: 'Add PMI if down payment < 20%', body: 'PMI runs 0.5-1.5% of the loan annually. On a $320k loan, that\'s $1,600-4,800/yr or $133-400/mo until you reach 20% equity.' },
      { title: 'Add HOA if applicable', body: 'Condos and many planned communities charge $100-500/mo HOA fees. Add directly to the monthly total.' },
    ],
    tips: [
      'Lenders escrow taxes and insurance — they collect 1/12 of the annual amount with each mortgage payment, then pay the bills for you.',
      'Property tax is reassessed when you buy. Your tax may differ from the seller\'s old bill if the home value has changed.',
      'Shop home insurance every 2-3 years — same company, same coverage, premiums creep up. Switching saves $200-600/yr typically.',
    ],
    faq: [
      { q: 'Why is my actual mortgage payment higher than the calculator?', a: 'The calculator shows P&I only. Your servicer is collecting T+I escrow on top, which is what makes the total higher.' },
      { q: 'Can I pay taxes and insurance separately?', a: 'Some lenders allow it if you have 20%+ equity. Most loans below that require escrow. Even if optional, escrow protects you from forgetting a $4,000 tax bill in November.' },
      { q: 'Does PMI ever go away?', a: 'Yes. Federal law requires lenders to drop PMI automatically once your loan balance hits 78% of original value, or earlier on request at 80%.' },
    ],
    relatedTool: 'mortgage-calculator',
    keywords: ['mortgage calculator with taxes', 'PITI calculator', 'full mortgage payment', 'homeowners insurance estimate'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'retirement-calculator-with-employer-match',
    title: 'Retirement Calculator with 401(k) Employer Match',
    query: 'retirement calculator 401k match',
    metaDescription: 'See how employer 401(k) match boosts retirement savings. Calculate growth, match contributions, and total nest egg over time.',
    intro: 'Employer 401(k) match is the closest thing to free money in personal finance. A typical 50% match on the first 6% of salary is a 50% instant return on contributions you would have made anyway. This guide shows how to factor match into a long-term retirement projection.',
    steps: [
      { title: 'Find your match formula', body: 'Common: 50% of first 6% (Microsoft, many F500), 100% of first 3% then 50% of next 2% (Google), or dollar-for-dollar up to a cap. Your HR portal lists exact terms.' },
      { title: 'Calculate combined contribution', body: 'On $100k salary with 50%-of-first-6% match: you contribute $6,000 (6%), employer adds $3,000. Total annual contribution = $9,000 even though you only put in $6k.' },
      { title: 'Use the Retirement Calculator', body: 'Enter your real combined monthly contribution ($750/mo in the example above). Set return at 7% (S&P 500 long-run after inflation).' },
      { title: 'Project to retirement age', body: 'A 30-year-old contributing $750/mo with match at 7% return reaches ~$915k by age 65. Without match, ~$610k. The match alone funds 15+ years of retirement.' },
      { title: 'Always contribute at least up to the match', body: 'If you contribute less than the match cap, you\'re leaving money on the table. Even if cash is tight, hit the match line first before any other savings goal.' },
    ],
    tips: [
      'Match has vesting schedules — you might forfeit unvested employer match if you leave too early. Check the cliff (3-year typical) before quitting.',
      'After hitting match cap, decide between traditional 401(k), Roth 401(k), or IRA. Roth wins if you expect higher tax bracket in retirement.',
      'IRS limits: $23,000/yr employee 401(k) contribution in 2026 ($30,500 if 50+). Match doesn\'t count toward your limit.',
    ],
    faq: [
      { q: 'Should I lower my 401(k) to pay off debt?', a: 'Almost never below the match. The match return (50-100%) beats any reasonable debt interest rate. Above the match, paying off 7%+ debt may beat investing.' },
      { q: 'What if my employer match is a "true-up"?', a: 'True-up means employer reconciles match annually so you get full match even if you front-loaded contributions. Most modern plans do this.' },
      { q: 'How does match affect Roth vs traditional?', a: 'Match goes in pre-tax (traditional) regardless of your contribution type. So a Roth 401(k) account is "split" — your contributions are Roth, employer match is traditional.' },
    ],
    relatedTool: 'retirement-calculator',
    keywords: ['401k match calculator', 'employer match', 'retirement calculator', 'retirement projection'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'how-much-to-save-for-down-payment',
    title: 'How Much to Save for a Down Payment (And How Long It Takes)',
    query: 'how long to save for down payment',
    metaDescription: 'Calculate how many months until you reach your down payment goal. Factors interest, monthly savings, and target home price.',
    intro: 'Saving a 20% down payment on a $400k home is $80,000. That\'s daunting until you do the math at 4-5% APY in a high-yield savings account. This guide turns "I should save more" into a specific timeline.',
    steps: [
      { title: 'Decide your target home price', body: 'Use the affordability rules first. If you can afford a $400k home, your 20% target is $80k (or $14k for 3.5% FHA, or $40k for 10%).' },
      { title: 'Choose your down payment percentage', body: '20% avoids PMI but takes longer. 10% with PMI gets you in faster — extra ~$200/mo carrying cost is often less than waiting through rising prices.' },
      { title: 'Open the Savings Calculator', body: 'Set your goal, current savings, monthly deposit, and APY (use 4.5% for HYSA in 2026). The result tells you the exact months/years to your goal.' },
      { title: 'Adjust monthly deposit to hit target date', body: 'Want it in 3 years instead of 5? The calculator shows what monthly deposit gets you there.' },
      { title: 'Park savings in a HYSA, not a checking account', body: 'High-yield savings accounts (Marcus, Ally, SoFi) pay 4-5% in 2026. A traditional bank pays 0.01%. On a $80k goal, that delta is $3,000+/yr in free interest.' },
    ],
    tips: [
      'Don\'t invest down-payment savings in stocks if you need it within 3 years — too much risk of being underwater when you need it.',
      'First-time buyer programs (FHA, USDA, VA) accept 0-3.5% down. Useful if waiting longer means missing the market.',
      'Closing costs are separate. Add 2-5% of home price to your savings target.',
    ],
    faq: [
      { q: 'Is 20% down still expected?', a: 'Not legally required, but it avoids PMI and often lower rates. Median first-time buyer puts down 8% in 2026.' },
      { q: 'Should I borrow from my 401(k)?', a: 'Generally no. You lose growth on borrowed funds and owe it back if you change jobs. Penalty + tax on early withdrawal makes the math worse.' },
      { q: 'What if rates drop while I\'m saving?', a: 'You can refinance after closing if rates drop materially. Typical break-even is 1.5-2% lower.' },
    ],
    relatedTool: 'savings-calculator',
    keywords: ['down payment calculator', 'how to save for house', 'savings goal calculator', 'first time buyer'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'compound-interest-explained',
    title: 'Compound Interest Explained (With Real Numbers)',
    query: 'compound interest calculator explained',
    metaDescription: 'How compound interest actually works. Real examples showing $10k turning into $76k over 30 years at 7%, plus calculator.',
    intro: 'Einstein supposedly called compound interest the eighth wonder of the world. Whether or not he said it, the math is wondrous: $10,000 at 7% becomes $76,123 in 30 years without adding a single dollar. Here\'s why, and how to use it.',
    steps: [
      { title: 'Understand the formula', body: 'Future Value = Principal × (1 + rate)^years. The exponent is what makes it "compound" — interest earns interest.' },
      { title: 'Compare simple vs compound', body: '$10k at 7% simple interest for 30 years = $31k ($10k principal + $21k interest). Same money compound = $76k. The $45k difference is interest earning interest.' },
      { title: 'Add monthly contributions', body: 'Use the Compound Interest Calculator. $10k start + $500/mo for 30 years at 7% = $683k. The contributions added are $190k. The other $493k is pure compounding.' },
      { title: 'Visualize the curve', body: 'Compound growth is exponential — slow at first, then steep. Year 10 of $500/mo at 7% = $87k. Year 20 = $260k. Year 30 = $683k. Each decade triples roughly.' },
      { title: 'Apply it everywhere', body: 'Same math powers retirement savings (good), credit card balances (bad), and inflation (bad). 3% inflation halves purchasing power in 24 years.' },
    ],
    tips: [
      'Time matters more than rate. $200/mo for 40 years at 7% beats $400/mo for 20 years at 9%.',
      'Reinvest dividends and interest. Stopping reinvestment cuts long-run gains by 30-50%.',
      'Tax-advantaged accounts (401k, Roth IRA) protect compound growth from yearly tax drag.',
    ],
    faq: [
      { q: 'What rate should I use?', a: 'For long-term stock investing, 7% real (10% nominal minus 3% inflation) is the historical S&P 500 average. For HYSA, 4-5% in 2026.' },
      { q: 'Does it compound monthly or annually?', a: 'Most investments compound continuously or daily; the calculator approximates with monthly compounding which is close enough.' },
      { q: 'Can I rely on past returns?', a: 'No guarantee. But over 30+ year windows, the S&P 500 has never returned negative. Diversification and long horizons smooth out year-to-year noise.' },
    ],
    relatedTool: 'compound-interest-calculator',
    keywords: ['compound interest calculator', 'compound vs simple interest', 'time value of money', 'long-term investing'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'paycheck-calculator-take-home-pay',
    title: 'Paycheck Calculator: What Your Salary Actually Pays You',
    query: 'paycheck calculator take home',
    metaDescription: 'Calculate take-home pay after federal tax, state tax, FICA, and 401(k). See your real biweekly paycheck.',
    intro: 'A $100,000 salary doesn\'t mean $100,000 in your bank account. After federal, state, FICA, and pre-tax deductions, the typical US worker takes home 70-78%. Here\'s how to use the Paycheck Calculator to forecast exact net pay.',
    steps: [
      { title: 'Enter gross annual or per-paycheck pay', body: 'The calculator accepts either. If you\'re paid biweekly, divide annual by 26. Monthly: divide by 12.' },
      { title: 'Pick your filing status', body: 'Single, married filing jointly, head of household. Filing status changes the federal tax brackets you fall into.' },
      { title: 'Add your state', body: 'No state tax: AK, FL, NV, NH, SD, TN, TX, WA, WY. High tax: CA, HI, NY, NJ, OR. The calculator applies state-specific brackets.' },
      { title: 'Enter pre-tax deductions', body: '401(k), HSA, FSA, health insurance — all reduce taxable income. Increasing 401(k) by $200/mo only reduces take-home by ~$140-150 because of tax savings.' },
      { title: 'Read the result', body: 'Calculator shows federal tax, state tax, FICA (Social Security 6.2% + Medicare 1.45%), pre-tax deductions, and final net per paycheck.' },
    ],
    tips: [
      'Adjust W-4 withholding if you\'re consistently getting big refunds — that\'s your money sitting interest-free with the IRS for a year.',
      'FICA caps Social Security at $168,600 income (2026). Income above that doesn\'t pay the 6.2%, only the 1.45% Medicare.',
      'High earners pay an extra 0.9% Medicare surtax above $200k single / $250k joint.',
    ],
    faq: [
      { q: 'Why does my actual paycheck differ from the calculator?', a: 'Most common: pre-tax deductions you forgot to include, garnishments, or additional voluntary withholding. Compare line by line with your pay stub.' },
      { q: 'Does this include city taxes?', a: 'Not by default. NYC, Philly, San Francisco, and a few others charge city tax. Add manually as additional state-style withholding.' },
      { q: 'How accurate is FICA?', a: 'Very. FICA is 7.65% flat (6.2 SS + 1.45 Medicare) up to the SS cap. It\'s the most predictable part of the paycheck.' },
    ],
    relatedTool: 'paycheck-calculator',
    keywords: ['take home pay calculator', 'paycheck calculator', 'net pay', 'after tax salary'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'auto-loan-with-trade-in-calculator',
    title: 'Auto Loan Calculator with Trade-In and Sales Tax',
    query: 'car loan calculator with trade in',
    metaDescription: 'Calculate true monthly car payment with trade-in value, down payment, and state sales tax. Avoid dealer math tricks.',
    intro: 'Dealers love confusing the four numbers — price, trade-in, down payment, and monthly payment. This guide breaks them apart so you can see what you\'re actually paying for the car versus the financing.',
    steps: [
      { title: 'Negotiate price first, in isolation', body: 'Agree on the out-the-door price of the car before mentioning trade-in or financing. Mixing them lets the dealer hide adjustments.' },
      { title: 'Apply trade-in to taxable amount', body: 'In most states, trade-in reduces the price you pay sales tax on. Selling separately on Carvana/Carmax often nets more, but you pay tax on the full new-car price.' },
      { title: 'Calculate sales tax', body: 'State + local typically 5-9.5%. The Auto Loan Calculator factors this in. On a $35k car at 8% tax, that\'s $2,800 added to the loan unless you pay it cash.' },
      { title: 'Set down payment', body: '20% down is the classic rule. Less is fine for cars under warranty; avoid 0% down on used cars where you might owe more than the car is worth.' },
      { title: 'Choose loan term realistically', body: '60 months is standard. 72-84 months reduces monthly payment but means you owe more than the car is worth for years. Avoid >60 months unless cash flow is critical.' },
    ],
    tips: [
      'Get pre-approved through your credit union before shopping. Dealer financing often marks up the rate 1-3% as profit.',
      'Trade-in offers below 80% of KBB private-party value are usually too low. Compare with Carvana / CarMax instant offers.',
      'Add taxes, fees, and any negative equity from a previous loan into your loan calculator inputs to see the real picture.',
    ],
    faq: [
      { q: 'Should I roll negative equity into a new loan?', a: 'Strongly avoid. You start the new loan already underwater. Pay it off separately or wait to trade until equity recovers.' },
      { q: 'Is gap insurance worth it?', a: 'Yes if you put little down or financed >60 months. It pays the difference if the car is totaled while you owe more than it\'s worth.' },
      { q: 'How does APR differ from interest rate?', a: 'APR includes fees (origination, doc fees) on top of the rate. Always compare APR, not the rate, when shopping lenders.' },
    ],
    relatedTool: 'auto-loan-calculator',
    keywords: ['auto loan calculator', 'car loan with trade in', 'sales tax car', 'monthly car payment'],
    publishedAt: '2026-05-08',
  },
  {
    slug: 'tip-calculator-restaurant-bill-split',
    title: 'Tip Calculator for Restaurants and Group Dinners',
    query: 'tip calculator bill split',
    metaDescription: 'Calculate tip and split the bill evenly for groups. Standard tip percentages and US tipping etiquette.',
    intro: 'Math at a restaurant is harder than it should be: 4 people, one tipsy person paying with a different card, a service-charge surprise. The Tip Calculator handles the percentages; this guide handles the etiquette.',
    steps: [
      { title: 'Tip on pre-tax or post-tax?', body: 'Pre-tax is the original "20% of the meal" convention. Post-tax adds maybe $1-2 more on a typical bill. Either is acceptable; consistency matters more.' },
      { title: 'Standard percentages', body: '15% poor service, 18% adequate, 20% good, 22-25% great. Below 15% sends a message you may not intend; above 25% is generous, not required.' },
      { title: 'Split evenly with the calculator', body: 'Enter the bill, tip percentage, and number of people. The Tip Calculator returns per-person total — easiest when everyone shared similar dishes.' },
      { title: 'Itemize when ordering varies wildly', body: 'If one person had soup and one had steak + cocktails, even split feels unfair. Use a separate split-by-item app, or have each person pay their items + their share of tax/tip.' },
      { title: 'Watch for already-included service charge', body: 'Many restaurants auto-add 18-20% gratuity for parties of 6+. Read the bill — adding tip on top is double-tipping.' },
    ],
    tips: [
      'Tipping in cash on a card check is fine and usually preferred by servers (some restaurants take a cut of card tips).',
      'For takeout, 10% is generous; 0-5% is normal. The labor is dramatically less than table service.',
      'Buffet servers (drink refills, clearing plates) deserve 10% — less than table service but not zero.',
    ],
    faq: [
      { q: 'Do I tip on the alcohol portion?', a: 'Yes. Bartenders and servers split tip pools, and pouring a $14 cocktail is real work.' },
      { q: 'What about international tipping?', a: 'Varies wildly. Japan: no tip ever (insulting). Europe: 5-10% if not included. Australia: optional. Stick to local norms; US 20% defaults can offend.' },
      { q: 'Tip on delivery?', a: '10-15% or $3-5 minimum. Drivers bear gas, vehicle wear, and weather. Bad tippers get bad service over time.' },
    ],
    relatedTool: 'tip-calculator',
    keywords: ['tip calculator', 'bill split calculator', 'restaurant tip', 'how much to tip'],
    publishedAt: '2026-05-08',
  },
];

export const getGuide = (slug: string) => guides.find(g => g.slug === slug);
