'use client';

import { useState } from 'react';

export function AutoLoanCalculator() {
  const [price, setPrice] = useState(35000);
  const [down, setDown] = useState(5000);
  const [tradeIn, setTradeIn] = useState(0);
  const [salesTaxPct, setSalesTaxPct] = useState(7.25);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(5);

  const taxableAmount = price - tradeIn;
  const salesTax = taxableAmount * (salesTaxPct / 100);
  const principal = price + salesTax - down - tradeIn;
  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  const monthly = monthlyRate === 0 ? principal / n : principal * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
  const total = monthly * n;
  const interest = total - principal;
  const fmt = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Vehicle Price</span>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Down Payment</span>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" value={down} onChange={(e) => setDown(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Trade-in Value</span>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" value={tradeIn} onChange={(e) => setTradeIn(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Sales Tax %</span>
          <div className="relative"><input type="number" step="0.01" value={salesTaxPct} onChange={(e) => setSalesTaxPct(Number(e.target.value) || 0)} className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span></div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Interest Rate (APR)</span>
          <div className="relative"><input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span></div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Loan Term</span>
          <select value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            {[3, 4, 5, 6, 7].map(y => <option key={y} value={y}>{y} years</option>)}
          </select>
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly payment</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{fmt(monthly)}</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm">
          <div><span className="text-gray-500">Loan amount:</span> <strong className="block text-lg">{fmt(principal)}</strong></div>
          <div><span className="text-gray-500">Sales tax:</span> <strong className="block text-lg">{fmt(salesTax)}</strong></div>
          <div><span className="text-gray-500">Total interest:</span> <strong className="block text-lg">{fmt(interest)}</strong></div>
          <div><span className="text-gray-500">Total cost:</span> <strong className="block text-lg">{fmt(total + down + tradeIn)}</strong></div>
        </div>
      </div>
    </div>
  );
}
