'use client';

import { useMemo, useState } from 'react';

type Debt = { id: string; name: string; balance: number; apr: number; minPayment: number };

const seed: Debt[] = [
  { id: '1', name: 'Credit Card', balance: 5000, apr: 22, minPayment: 100 },
  { id: '2', name: 'Auto Loan', balance: 12000, apr: 7.5, minPayment: 280 },
  { id: '3', name: 'Personal Loan', balance: 8000, apr: 11, minPayment: 200 },
];

function uid() { return Math.random().toString(36).slice(2, 9); }

function simulate(debts: Debt[], extra: number, strategy: 'snowball' | 'avalanche') {
  const list = debts.map((d) => ({ ...d })).filter((d) => d.balance > 0);
  if (list.length === 0) return { months: 0, totalInterest: 0, schedule: [] as { name: string; payoffMonth: number }[] };

  let month = 0;
  let totalInterest = 0;
  const schedule: { name: string; payoffMonth: number }[] = [];
  const maxMonths = 12 * 60;

  while (list.some((d) => d.balance > 0.005) && month < maxMonths) {
    month++;
    for (const d of list) {
      if (d.balance <= 0) continue;
      const interest = d.balance * (d.apr / 100 / 12);
      d.balance += interest;
      totalInterest += interest;
    }
    const sorted = [...list].filter((d) => d.balance > 0);
    sorted.sort((a, b) => strategy === 'snowball' ? a.balance - b.balance : b.apr - a.apr);

    let budget = list.reduce((s, d) => s + (d.balance > 0 ? d.minPayment : 0), 0) + extra;
    for (const d of sorted) {
      if (budget <= 0 || d.balance <= 0) continue;
      const pay = Math.min(d.balance, d === sorted[0] ? budget : d.minPayment);
      d.balance -= pay;
      budget -= pay;
    }
    if (budget > 0) {
      for (const d of sorted) {
        if (budget <= 0 || d.balance <= 0) continue;
        const pay = Math.min(d.balance, budget);
        d.balance -= pay;
        budget -= pay;
      }
    }
    for (const d of list) {
      if (d.balance > 0 && d.balance < 0.005) d.balance = 0;
      if (d.balance === 0 && !schedule.some((s) => s.name === d.name)) {
        schedule.push({ name: d.name, payoffMonth: month });
      }
    }
  }

  return { months: month, totalInterest, schedule };
}

const money = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

export function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<Debt[]>(seed);
  const [extra, setExtra] = useState(100);
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('avalanche');

  const result = useMemo(() => simulate(debts, extra, strategy), [debts, extra, strategy]);
  const compare = useMemo(() => simulate(debts, extra, strategy === 'snowball' ? 'avalanche' : 'snowball'), [debts, extra, strategy]);

  const totalBalance = debts.reduce((s, d) => s + (d.balance > 0 ? d.balance : 0), 0);
  const totalMin = debts.reduce((s, d) => s + (d.balance > 0 ? d.minPayment : 0), 0);

  const update = (id: string, key: keyof Debt, value: string | number) => {
    setDebts(debts.map((d) => d.id === id ? { ...d, [key]: typeof value === 'string' && key !== 'name' ? Number(value) || 0 : value } : d));
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Your debts</h3>
          <button onClick={() => setDebts([...debts, { id: uid(), name: `Debt ${debts.length + 1}`, balance: 0, apr: 0, minPayment: 0 }])} className="text-sm text-blue-600 hover:underline">+ Add debt</button>
        </div>
        <div className="space-y-2">
          {debts.map((d) => (
            <div key={d.id} className="grid grid-cols-12 gap-2 items-center">
              <input value={d.name} onChange={(e) => update(d.id, 'name', e.target.value)} className="col-span-4 px-2 py-2 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Name" />
              <input type="number" value={d.balance} onChange={(e) => update(d.id, 'balance', e.target.value)} className="col-span-3 px-2 py-2 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Balance" />
              <input type="number" step="0.1" value={d.apr} onChange={(e) => update(d.id, 'apr', e.target.value)} className="col-span-2 px-2 py-2 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="APR %" />
              <input type="number" value={d.minPayment} onChange={(e) => update(d.id, 'minPayment', e.target.value)} className="col-span-2 px-2 py-2 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" placeholder="Min/mo" />
              <button onClick={() => setDebts(debts.filter((x) => x.id !== d.id))} className="col-span-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded py-2">×</button>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 mt-3 text-xs text-gray-500 px-2">
          <span>Name</span><span>Balance</span><span>APR %</span><span>Min/mo</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Extra monthly payment</span>
          <input type="number" value={extra} onChange={(e) => setExtra(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          <span className="block text-xs text-gray-500 mt-1">On top of {money(totalMin)}/mo minimums</span>
        </label>
        <div>
          <span className="block text-sm font-medium mb-2">Strategy</span>
          <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-gray-100 dark:bg-slate-800">
            <button onClick={() => setStrategy('avalanche')} className={`px-3 py-2 rounded-md text-sm font-medium ${strategy === 'avalanche' ? 'bg-blue-500 text-white' : ''}`}>Avalanche (highest APR first)</button>
            <button onClick={() => setStrategy('snowball')} className={`px-3 py-2 rounded-md text-sm font-medium ${strategy === 'snowball' ? 'bg-blue-500 text-white' : ''}`}>Snowball (smallest balance first)</button>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Debt-free in</p>
            <p className="text-4xl font-bold" style={{ color: '#3b82f6' }}>{Math.floor(result.months / 12)}y {result.months % 12}m</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total interest</p>
            <p className="text-4xl font-bold" style={{ color: '#3b82f6' }}>{money(result.totalInterest)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total paid</p>
            <p className="text-4xl font-bold" style={{ color: '#3b82f6' }}>{money(totalBalance + result.totalInterest)}</p>
          </div>
        </div>
        {compare.months > 0 && (
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Other strategy ({strategy === 'snowball' ? 'avalanche' : 'snowball'}): {Math.floor(compare.months / 12)}y {compare.months % 12}m, {money(compare.totalInterest)} interest
            {compare.totalInterest < result.totalInterest && ` — saves ${money(result.totalInterest - compare.totalInterest)}`}
          </p>
        )}
      </div>

      {result.schedule.length > 0 && (
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h3 className="font-semibold mb-3">Payoff order</h3>
          <ol className="space-y-2">
            {result.schedule.map((s, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span><strong>{i + 1}.</strong> {s.name}</span>
                <span className="text-gray-500">Month {s.payoffMonth} ({Math.floor(s.payoffMonth / 12)}y {s.payoffMonth % 12}m)</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
