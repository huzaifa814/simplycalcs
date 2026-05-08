'use client';

import { useState } from 'react';

export function TimeCalculator() {
  const [h1, setH1] = useState(2);
  const [m1, setM1] = useState(30);
  const [s1, setS1] = useState(0);
  const [op, setOp] = useState<'+' | '-'>('+');
  const [h2, setH2] = useState(1);
  const [m2, setM2] = useState(45);
  const [s2, setS2] = useState(15);

  const t1 = h1 * 3600 + m1 * 60 + s1;
  const t2 = h2 * 3600 + m2 * 60 + s2;
  const sum = op === '+' ? t1 + t2 : t1 - t2;
  const sign = sum < 0 ? '-' : '';
  const abs = Math.abs(sum);
  const rh = Math.floor(abs / 3600);
  const rm = Math.floor((abs % 3600) / 60);
  const rs = abs % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div>
          <span className="block text-sm font-medium mb-2">Time 1</span>
          <div className="grid grid-cols-3 gap-3">
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Hours</span><input type="number" value={h1} onChange={(e) => setH1(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Minutes</span><input type="number" value={m1} onChange={(e) => setM1(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Seconds</span><input type="number" value={s1} onChange={(e) => setS1(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-gray-100 dark:bg-slate-800">
            <button onClick={() => setOp('+')} className={`px-6 py-2 rounded-md text-lg font-medium ${op === '+' ? 'bg-blue-500 text-white' : ''}`}>+</button>
            <button onClick={() => setOp('-')} className={`px-6 py-2 rounded-md text-lg font-medium ${op === '-' ? 'bg-blue-500 text-white' : ''}`}>−</button>
          </div>
        </div>
        <div>
          <span className="block text-sm font-medium mb-2">Time 2</span>
          <div className="grid grid-cols-3 gap-3">
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Hours</span><input type="number" value={h2} onChange={(e) => setH2(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Minutes</span><input type="number" value={m2} onChange={(e) => setM2(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Seconds</span><input type="number" value={s2} onChange={(e) => setS2(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{sign}{rh}:{pad(rm)}:{pad(rs)}</p>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div><span className="text-gray-500">Total seconds:</span> <strong className="block text-lg">{sum.toLocaleString()}</strong></div>
          <div><span className="text-gray-500">Total minutes:</span> <strong className="block text-lg">{(sum / 60).toFixed(2)}</strong></div>
          <div><span className="text-gray-500">Total hours:</span> <strong className="block text-lg">{(sum / 3600).toFixed(4)}</strong></div>
        </div>
      </div>
    </div>
  );
}
