'use client';

import { useState } from 'react';

export function SavingsCalculator() {
  const [goal, setGoal] = useState(20000);
  const [current, setCurrent] = useState(2000);
  const [monthly, setMonthly] = useState(400);
  const [rate, setRate] = useState(4);

  const r = rate / 100 / 12;
  const remaining = Math.max(0, goal - current);
  let months: number;
  if (remaining === 0) {
    months = 0;
  } else if (r === 0) {
    months = monthly > 0 ? remaining / monthly : Infinity;
  } else {
    const num = Math.log((monthly + r * goal) / (monthly + r * current));
    const den = Math.log(1 + r);
    months = num / den;
  }
  const reachable = isFinite(months) && months >= 0;
  const years = Math.floor(months / 12);
  const remMonths = Math.round(months - years * 12);
  const totalDeposited = current + monthly * months;
  const totalInterest = goal - totalDeposited;
  const fmt = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Savings Goal</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Already Saved</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input type="number" value={current} onChange={(e) => setCurrent(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Monthly Deposit</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">APY (%)</span>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          <p className="text-xs text-gray-500 mt-1">High-yield savings ~4-5% in 2026.</p>
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Time to reach your goal</p>
        {reachable ? (
          <>
            <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>
              {years > 0 ? `${years} yr${years === 1 ? '' : 's'} ` : ''}{remMonths} mo
            </p>
            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div><span className="text-gray-500">Total deposits:</span> <strong className="block text-lg">{fmt(totalDeposited)}</strong></div>
              <div><span className="text-gray-500">Interest earned:</span> <strong className="block text-lg">{fmt(Math.max(0, totalInterest))}</strong></div>
              <div><span className="text-gray-500">Months total:</span> <strong className="block text-lg">{Math.round(months)}</strong></div>
            </div>
          </>
        ) : (
          <p className="text-2xl font-semibold text-red-600 dark:text-red-400">Increase monthly deposit — at $0/month with 0% APY you&apos;ll never reach the goal.</p>
        )}
      </div>
    </div>
  );
}
