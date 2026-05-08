import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { alternatives } from '@/content/alternatives';
import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SimplyCalcs Alternatives & Comparisons',
  description: 'Compare SimplyCalcs with NerdWallet, Bankrate, Calculator.net, and Zillow. Picking the right calculator for the job.',
  alternates: { canonical: `${siteConfig.url}/alternatives` },
};

export default function AlternativesIndex() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">SimplyCalcs vs Alternatives</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Honest comparisons with the other major free-calculator sites. Pick the right tool for your job.</p>
        </header>
        <div className="grid gap-5 md:grid-cols-2">
          {alternatives.map((a) => (
            <Link key={a.slug} href={`/alternatives/${a.slug}`} className="group p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-md transition">
              <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">vs {a.competitor}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{a.intro}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
