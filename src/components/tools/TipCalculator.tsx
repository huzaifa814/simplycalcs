'use client';

import { useState } from 'react';

export function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(2);

  const tip = bill * (tipPct / 100);
  const total = bill + tip;
  const perPerson = total / people;
  const fmt = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Bill Amount</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input type="number" step="0.01" value={bill} onChange={(e) => setBill(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
        </label>
        <div>
          <span className="block text-sm font-medium mb-2">Tip %</span>
          <div className="grid grid-cols-4 gap-1">
            {[15, 18, 20, 25].map((p) => (
              <button key={p} onClick={() => setTipPct(p)} className={`py-2.5 rounded-lg text-sm font-medium transition ${tipPct === p ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>{p}%</button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Split between</span>
          <input type="number" min={1} value={people} onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Per person</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{fmt(perPerson)}</p>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div><span className="text-gray-500">Tip ({tipPct}%):</span> <strong className="block text-lg">{fmt(tip)}</strong></div>
          <div><span className="text-gray-500">Total:</span> <strong className="block text-lg">{fmt(total)}</strong></div>
          <div><span className="text-gray-500">Splitting:</span> <strong className="block text-lg">{people} {people === 1 ? 'person' : 'people'}</strong></div>
        </div>
      </div>
    </div>
  );
}
