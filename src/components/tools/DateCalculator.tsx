'use client';

import { useState } from 'react';

export function DateCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [mode, setMode] = useState<'between' | 'add'>('between');
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);
  const [days, setDays] = useState(30);
  const [op, setOp] = useState<'+' | '-'>('+');

  const startDate = new Date(start + 'T00:00:00');
  const endDate = new Date(end + 'T00:00:00');
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffDays = Math.round(diffMs / 86400000);
  const diffWeeks = diffDays / 7;
  const diffMonths = diffDays / 30.4375;
  const diffYears = diffDays / 365.25;

  const resultDate = new Date(startDate.getTime() + (op === '+' ? days : -days) * 86400000);
  const fmt = (d: Date) => isNaN(d.getTime()) ? '—' : d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-gray-100 dark:bg-slate-800">
          <button onClick={() => setMode('between')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'between' ? 'bg-blue-500 text-white' : ''}`}>Days between dates</button>
          <button onClick={() => setMode('add')} className={`px-4 py-2 rounded-md text-sm font-medium ${mode === 'add' ? 'bg-blue-500 text-white' : ''}`}>Add/subtract days</button>
        </div>
      </div>

      {mode === 'between' ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <label className="block"><span className="block text-sm font-medium mb-2">Start date</span><input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
            <label className="block"><span className="block text-sm font-medium mb-2">End date</span><input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Difference</p>
            <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{Math.abs(diffDays).toLocaleString()} days</p>
            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div><span className="text-gray-500">Weeks:</span> <strong className="block text-lg">{Math.abs(diffWeeks).toFixed(2)}</strong></div>
              <div><span className="text-gray-500">Months:</span> <strong className="block text-lg">{Math.abs(diffMonths).toFixed(2)}</strong></div>
              <div><span className="text-gray-500">Years:</span> <strong className="block text-lg">{Math.abs(diffYears).toFixed(3)}</strong></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <label className="block"><span className="block text-sm font-medium mb-2">Start date</span><input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
            <div>
              <span className="block text-sm font-medium mb-2">Operation</span>
              <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-gray-100 dark:bg-slate-800">
                <button onClick={() => setOp('+')} className={`px-4 py-2 rounded-md ${op === '+' ? 'bg-blue-500 text-white' : ''}`}>Add</button>
                <button onClick={() => setOp('-')} className={`px-4 py-2 rounded-md ${op === '-' ? 'bg-blue-500 text-white' : ''}`}>Subtract</button>
              </div>
            </div>
            <label className="block"><span className="block text-sm font-medium mb-2">Days</span><input type="number" value={days} onChange={(e) => setDays(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
          </div>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result date</p>
            <p className="text-3xl md:text-4xl font-bold" style={{ color: '#3b82f6' }}>{fmt(resultDate)}</p>
          </div>
        </>
      )}
    </div>
  );
}
