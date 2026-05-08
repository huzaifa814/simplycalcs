'use client';

import { useState } from 'react';

export function PercentageCalculator() {
  const [mode, setMode] = useState<'of' | 'change' | 'is'>('of');
  const [a, setA] = useState(20);
  const [b, setB] = useState(150);

  let result = '';
  let label = '';
  if (mode === 'of') { result = ((a / 100) * b).toLocaleString('en-US', { maximumFractionDigits: 4 }); label = `${a}% of ${b} =`; }
  if (mode === 'change') { const pct = ((b - a) / a) * 100; result = pct.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%'; label = `Change from ${a} to ${b} =`; }
  if (mode === 'is') { const pct = (a / b) * 100; result = pct.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '%'; label = `${a} is what % of ${b}?`; }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {([['of', 'X% of Y'], ['change', '% Change'], ['is', 'X is what % of Y']] as const).map(([k, label]) => (
          <button key={k} onClick={() => setMode(k)} className={`px-4 py-2 rounded-lg font-medium text-sm transition ${mode === k ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>{label}</button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">{mode === 'of' ? 'Percent (X)' : mode === 'change' ? 'Original (X)' : 'Value (X)'}</span>
          <input type="number" value={a} onChange={(e) => setA(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">{mode === 'of' ? 'Of (Y)' : mode === 'change' ? 'New (Y)' : 'Total (Y)'}</span>
          <input type="number" value={b} onChange={(e) => setB(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{label}</p>
        <p className="text-5xl font-bold" style={{ color: '#3b82f6' }}>{result}</p>
      </div>
    </div>
  );
}
