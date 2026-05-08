'use client';

import { useState } from 'react';

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [contribution, setContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(7);
  const [freq, setFreq] = useState(12); // monthly compounding

  const r = rate / 100;
  const n = freq;
  const t = years;
  const FV_principal = principal * Math.pow(1 + r / n, n * t);
  // Future value of contributions (made each compounding period)
  const periodicContribution = contribution * (12 / freq);
  const FV_contributions = freq === 0 ? 0 : periodicContribution * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
  const totalFV = FV_principal + FV_contributions;
  const totalContributed = principal + contribution * 12 * years;
  const interestEarned = totalFV - totalContributed;
  const fmt = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Initial Investment</span>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Monthly Contribution</span>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" value={contribution} onChange={(e) => setContribution(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Annual Return Rate</span>
          <div className="relative"><input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span></div>
          <p className="text-xs text-gray-500 mt-1">S&amp;P 500 historical avg ~10%, conservative ~7%</p>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Years</span>
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block md:col-span-2">
          <span className="block text-sm font-medium mb-2">Compounding</span>
          <select value={freq} onChange={(e) => setFreq(Number(e.target.value))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            <option value={1}>Annually</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
            <option value={365}>Daily</option>
          </select>
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Future value</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{fmt(totalFV)}</p>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div><span className="text-gray-500">You contribute:</span> <strong className="block text-lg">{fmt(totalContributed)}</strong></div>
          <div><span className="text-gray-500">Interest earned:</span> <strong className="block text-lg text-green-600">{fmt(interestEarned)}</strong></div>
          <div><span className="text-gray-500">Multiplier:</span> <strong className="block text-lg">{(totalFV / totalContributed).toFixed(2)}×</strong></div>
        </div>
      </div>
    </div>
  );
}
