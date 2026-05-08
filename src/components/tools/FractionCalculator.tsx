'use client';

import { useState } from 'react';

type Op = '+' | '-' | '×' | '÷';

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(n: number, d: number): { n: number; d: number; whole?: number } {
  if (d === 0) return { n: NaN, d: 1 };
  const sign = (n < 0) !== (d < 0) ? -1 : 1;
  n = Math.abs(n); d = Math.abs(d);
  const g = gcd(n, d) || 1;
  n = n / g; d = d / g;
  const whole = Math.floor(n / d);
  return { n: sign * (n - whole * d), d, whole: sign * whole };
}

export function FractionCalculator() {
  const [n1, setN1] = useState(1);
  const [d1, setD1] = useState(2);
  const [op, setOp] = useState<Op>('+');
  const [n2, setN2] = useState(1);
  const [d2, setD2] = useState(3);

  let rn = 0, rd = 1;
  if (op === '+') { rn = n1 * d2 + n2 * d1; rd = d1 * d2; }
  else if (op === '-') { rn = n1 * d2 - n2 * d1; rd = d1 * d2; }
  else if (op === '×') { rn = n1 * n2; rd = d1 * d2; }
  else if (op === '÷') { rn = n1 * d2; rd = d1 * n2; }

  const result = simplify(rn, rd);
  const decimal = rd !== 0 ? rn / rd : NaN;
  const valid = d1 !== 0 && d2 !== 0 && rd !== 0 && !isNaN(decimal);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex flex-col items-center">
            <input type="number" value={n1} onChange={(e) => setN1(Number(e.target.value) || 0)} className="w-20 px-2 py-2 text-center text-lg rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            <div className="w-20 h-px bg-gray-400 my-1" />
            <input type="number" value={d1} onChange={(e) => setD1(Number(e.target.value) || 0)} className="w-20 px-2 py-2 text-center text-lg rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
          <select value={op} onChange={(e) => setOp(e.target.value as Op)} className="px-3 py-3 text-2xl rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="×">×</option>
            <option value="÷">÷</option>
          </select>
          <div className="flex flex-col items-center">
            <input type="number" value={n2} onChange={(e) => setN2(Number(e.target.value) || 0)} className="w-20 px-2 py-2 text-center text-lg rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            <div className="w-20 h-px bg-gray-400 my-1" />
            <input type="number" value={d2} onChange={(e) => setD2(Number(e.target.value) || 0)} className="w-20 px-2 py-2 text-center text-lg rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
          <span className="text-2xl">=</span>
          <div className="text-3xl font-bold" style={{ color: '#3b82f6' }}>
            {valid ? (
              result.whole !== 0 && result.n !== 0 ? (
                <span>{result.whole} <span className="inline-flex flex-col items-center align-middle text-xl"><span>{Math.abs(result.n)}</span><span className="border-t border-current w-full" /><span>{result.d}</span></span></span>
              ) : result.whole !== 0 ? (
                <span>{result.whole}</span>
              ) : result.n === 0 ? (
                <span>0</span>
              ) : (
                <span className="inline-flex flex-col items-center text-xl"><span>{result.n}</span><span className="border-t border-current w-full" /><span>{result.d}</span></span>
              )
            ) : <span className="text-red-500 text-xl">undefined</span>}
          </div>
        </div>
      </div>

      {valid && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
          <div className="grid gap-3 md:grid-cols-3 text-sm">
            <div><span className="text-gray-500">Improper:</span> <strong className="block text-lg">{rn}/{rd}</strong></div>
            <div><span className="text-gray-500">Decimal:</span> <strong className="block text-lg">{decimal.toFixed(6).replace(/\.?0+$/, '')}</strong></div>
            <div><span className="text-gray-500">Percent:</span> <strong className="block text-lg">{(decimal * 100).toFixed(2)}%</strong></div>
          </div>
        </div>
      )}
    </div>
  );
}
