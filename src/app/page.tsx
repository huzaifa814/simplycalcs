import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { siteConfig } from '@/config/site';
import { tools } from '@/config/tools';

export default function HomePage() {
  const featured = tools.slice(0, 6);
  return (
    <>
      <Header />
      <main>
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium mb-6">
            ⚡ Free · No Signup · Instant Answers
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight">
            Simple <span style={{ color: siteConfig.brandColor }}>Calculators</span> — Built to Just Work
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
            Mortgage, loan, BMI, paycheck, retirement, percentage — clean calculators with no upsells, no signup walls, and no popups in your face.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition" style={{ background: siteConfig.brandColor }}>Browse Calculators →</Link>
            <Link href="/tools/mortgage-calculator" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-slate-700 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition">Try Mortgage Calculator</Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              { icon: '🎯', title: 'Just the Numbers', body: 'Get the answer fast. No 10 paragraphs of SEO content above the calculator. Calculator first, explanations after.' },
              { icon: '📱', title: 'Works Anywhere', body: 'Phone, tablet, laptop, work computer. Loads in seconds. No app to install. Bookmark and you\'re set.' },
              { icon: '🔓', title: 'No Signup', body: 'No email collection, no account, no "sign up to see your results." Just calculate, get the answer, leave.' },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Calculators</h2>
            <Link href="/tools" className="text-sm font-medium hover:underline" style={{ color: siteConfig.brandColor }}>View all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {featured.map((tool) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500 hover:shadow-md transition">
                <div className="text-2xl mb-2">{tool.icon}</div>
                <h3 className="font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{tool.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{tool.description}</p>
                {!tool.available && <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-xs text-gray-600 dark:text-gray-400">Coming soon</span>}
              </Link>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 text-center">
          <div className="p-10 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a quick mortgage estimate?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">Plug in your numbers, see your monthly payment in seconds.</p>
            <Link href="/tools/mortgage-calculator" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition" style={{ background: siteConfig.brandColor }}>Open Mortgage Calculator →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
