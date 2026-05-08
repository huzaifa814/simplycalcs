'use client';

import { useState } from 'react';

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retireAge, setRetireAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [monthly, setMonthly] = useState(500);
  const [returnPct, setReturnPct] = useState(7);

  const years = Math.max(0, retireAge - currentAge);
  const r = returnPct / 100 / 12;
  const n = years * 12;
  const fvCurrent = currentSavings * Math.pow(1 + r, n);
  const fvContrib = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r);
  const total = fvCurrent + fvContrib;
  const totalContrib = currentSavings + monthly * n;
  const totalGrowth = total - totalContrib;
  const fmt = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Current Age</span>
          <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Retirement Age</span>
          <input type="number" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Current Savings</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Monthly Contribution</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
        </label>
        <label className="block md:col-span-2">
          <span className="block text-sm font-medium mb-2">Expected Annual Return (%)</span>
          <input type="number" step="0.1" value={returnPct} onChange={(e) => setReturnPct(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          <p className="text-xs text-gray-500 mt-1">S&P 500 long-term average is ~10% nominal, ~7% inflation-adjusted.</p>
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Projected nest egg at age {retireAge}</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{fmt(total)}</p>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div><span className="text-gray-500">You contribute:</span> <strong className="block text-lg">{fmt(totalContrib)}</strong></div>
          <div><span className="text-gray-500">Investment growth:</span> <strong className="block text-lg">{fmt(totalGrowth)}</strong></div>
          <div><span className="text-gray-500">Years investing:</span> <strong className="block text-lg">{years}</strong></div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-gray-200 dark:border-slate-800 text-sm text-gray-600 dark:text-gray-400">
        <p><strong className="text-gray-900 dark:text-white">Note:</strong> Assumes monthly contributions and compound monthly. Inflation, taxes, and fees not included. Use 7% return for inflation-adjusted projection.</p>
      </div>
    </div>
  );
}
