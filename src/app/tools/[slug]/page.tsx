import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { tools, getTool } from '@/config/tools';
import { siteConfig } from '@/config/site';
import { MortgageCalculator } from '@/components/tools/MortgageCalculator';
import { LoanCalculator } from '@/components/tools/LoanCalculator';
import { BMICalculator } from '@/components/tools/BMICalculator';
import { TipCalculator } from '@/components/tools/TipCalculator';
import { PercentageCalculator } from '@/components/tools/PercentageCalculator';
import { AutoLoanCalculator } from '@/components/tools/AutoLoanCalculator';
import { PaycheckCalculator } from '@/components/tools/PaycheckCalculator';
import { CalorieCalculator } from '@/components/tools/CalorieCalculator';
import { CompoundInterestCalculator } from '@/components/tools/CompoundInterestCalculator';
import { GPACalculator } from '@/components/tools/GPACalculator';
import { RetirementCalculator } from '@/components/tools/RetirementCalculator';
import { SavingsCalculator } from '@/components/tools/SavingsCalculator';
import { PaceCalculator } from '@/components/tools/PaceCalculator';
import { PregnancyCalculator } from '@/components/tools/PregnancyCalculator';
import { FractionCalculator } from '@/components/tools/FractionCalculator';
import { TimeCalculator } from '@/components/tools/TimeCalculator';
import { TimeCardCalculator } from '@/components/tools/TimeCardCalculator';
import { DateCalculator } from '@/components/tools/DateCalculator';
import { SalesTaxCalculator } from '@/components/tools/SalesTaxCalculator';
import { ComingSoon } from '@/components/tools/ComingSoon';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `${siteConfig.url}/tools/${slug}` },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${siteConfig.url}/tools` },
      { '@type': 'ListItem', position: 3, name: tool.title, item: `${siteConfig.url}/tools/${slug}` },
    ],
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link> ·{' '}
          <Link href="/tools" className="hover:text-gray-900 dark:hover:text-white">Calculators</Link> ·{' '}
          <span className="text-gray-900 dark:text-white">{tool.title}</span>
        </nav>
        <header className="mb-8">
          <div className="text-4xl mb-3">{tool.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{tool.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{tool.description}</p>
        </header>

        {slug === 'mortgage-calculator' && <MortgageCalculator />}
        {slug === 'loan-calculator' && <LoanCalculator />}
        {slug === 'bmi-calculator' && <BMICalculator />}
        {slug === 'tip-calculator' && <TipCalculator />}
        {slug === 'percentage-calculator' && <PercentageCalculator />}
        {slug === 'auto-loan-calculator' && <AutoLoanCalculator />}
        {slug === 'paycheck-calculator' && <PaycheckCalculator />}
        {slug === 'calorie-calculator' && <CalorieCalculator />}
        {slug === 'compound-interest-calculator' && <CompoundInterestCalculator />}
        {slug === 'gpa-calculator' && <GPACalculator />}
        {slug === 'retirement-calculator' && <RetirementCalculator />}
        {slug === 'savings-calculator' && <SavingsCalculator />}
        {slug === 'pace-calculator' && <PaceCalculator />}
        {slug === 'pregnancy-calculator' && <PregnancyCalculator />}
        {slug === 'fraction-calculator' && <FractionCalculator />}
        {slug === 'time-calculator' && <TimeCalculator />}
        {slug === 'time-card-calculator' && <TimeCardCalculator />}
        {slug === 'date-calculator' && <DateCalculator />}
        {slug === 'sales-tax-calculator' && <SalesTaxCalculator />}
        {!tool.available && <ComingSoon toolTitle={tool.title} />}
      </main>
      <Footer />
    </>
  );
}
