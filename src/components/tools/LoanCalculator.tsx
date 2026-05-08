'use client';

import { useState } from 'react';

export function LoanCalculator() {
  const [amount, setAmount] = useState(20000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(5);

  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  const monthly = monthlyRate === 0 ? amount / n : amount * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
  const total = monthly * n;
  const interest = total - amount;
  const fmt = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Loan Amount</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Interest Rate (APR)</span>
          <div className="relative">
            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Term (years)</span>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 1)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly payment</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{fmt(monthly)}</p>
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          <div><span className="text-gray-500">Total interest:</span> <strong className="block text-lg">{fmt(interest)}</strong></div>
          <div><span className="text-gray-500">Total cost:</span> <strong className="block text-lg">{fmt(total)}</strong></div>
        </div>
      </div>
    </div>
  );
}
