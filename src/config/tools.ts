export interface Tool {
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: 'finance' | 'health' | 'math' | 'everyday';
  available: boolean;
}

export const tools: Tool[] = [
  { slug: 'mortgage-calculator', title: 'Mortgage Calculator', description: 'Calculate monthly mortgage payments, total interest, and amortization schedule.', icon: '🏠', category: 'finance', available: true },
  { slug: 'loan-calculator', title: 'Loan Calculator', description: 'Personal loan, auto loan, or any fixed-payment loan. See total cost.', icon: '💰', category: 'finance', available: true },
  { slug: 'auto-loan-calculator', title: 'Auto Loan Calculator', description: 'Car loan with trade-in, down payment, and sales tax options.', icon: '🚗', category: 'finance', available: true },
  { slug: 'paycheck-calculator', title: 'Paycheck Calculator', description: 'Take-home pay after federal, state, and FICA taxes.', icon: '💵', category: 'finance', available: true },
  { slug: 'compound-interest-calculator', title: 'Compound Interest', description: 'See how compound interest grows savings over time.', icon: '📈', category: 'finance', available: true },
  { slug: 'retirement-calculator', title: 'Retirement Calculator', description: 'Project savings growth and retirement income with custom contributions.', icon: '🌅', category: 'finance', available: true },
  { slug: 'savings-calculator', title: 'Savings Calculator', description: 'How long until you reach your savings goal?', icon: '🐷', category: 'finance', available: true },
  { slug: 'bmi-calculator', title: 'BMI Calculator', description: 'Body Mass Index from height and weight. Imperial or metric.', icon: '⚖️', category: 'health', available: true },
  { slug: 'calorie-calculator', title: 'Calorie Calculator', description: 'Daily calorie needs based on age, activity, and goals.', icon: '🍎', category: 'health', available: true },
  { slug: 'pace-calculator', title: 'Pace Calculator', description: 'Running pace, distance, and time. For 5K through marathon.', icon: '🏃', category: 'health', available: true },
  { slug: 'pregnancy-calculator', title: 'Due Date Calculator', description: 'Pregnancy due date and weekly milestones.', icon: '👶', category: 'health', available: true },
  { slug: 'percentage-calculator', title: 'Percentage Calculator', description: 'X% of Y, percentage change, percentage difference. All in one.', icon: '%', category: 'math', available: true },
  { slug: 'fraction-calculator', title: 'Fraction Calculator', description: 'Add, subtract, multiply, divide fractions with simplified result.', icon: '½', category: 'math', available: true },
  { slug: 'gpa-calculator', title: 'GPA Calculator', description: 'Calculate GPA from grades. 4.0 scale with weighted options.', icon: '🎓', category: 'math', available: true },
  { slug: 'tip-calculator', title: 'Tip Calculator', description: 'Quick tip + bill split for restaurants, taxis, and group bills.', icon: '🍽️', category: 'everyday', available: true },
  { slug: 'time-calculator', title: 'Time Calculator', description: 'Add or subtract hours, minutes, seconds. Time differences.', icon: '⏰', category: 'everyday', available: true },
  { slug: 'time-card-calculator', title: 'Time Card Calculator', description: 'Weekly timesheet: enter start/end times and breaks, get daily + weekly hours and pay. Overtime included.', icon: '⏱️', category: 'everyday', available: true },
  { slug: 'date-calculator', title: 'Date Calculator', description: 'Days between dates, add days to a date, age in days.', icon: '📅', category: 'everyday', available: true },
  { slug: 'sales-tax-calculator', title: 'Sales Tax Calculator', description: 'Sales tax for any US state and zip code.', icon: '🧾', category: 'everyday', available: true },
];

export const getTool = (slug: string) => tools.find(t => t.slug === slug);
export const getAvailableTools = () => tools.filter(t => t.available);
