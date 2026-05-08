'use client';

import { useState } from 'react';

// Simplified 2025 federal tax brackets (single filer, standard deduction)
const FED_BRACKETS_SINGLE = [
  { rate: 0.10, upTo: 11600 },
  { rate: 0.12, upTo: 47150 },
  { rate: 0.22, upTo: 100525 },
  { rate: 0.24, upTo: 191950 },
  { rate: 0.32, upTo: 243725 },
  { rate: 0.35, upTo: 609350 },
  { rate: 0.37, upTo: Infinity },
];
const FED_BRACKETS_MARRIED = [
  { rate: 0.10, upTo: 23200 },
  { rate: 0.12, upTo: 94300 },
  { rate: 0.22, upTo: 201050 },
  { rate: 0.24, upTo: 383900 },
  { rate: 0.32, upTo: 487450 },
  { rate: 0.35, upTo: 731200 },
  { rate: 0.37, upTo: Infinity },
];
const STD_DED = { single: 14600, married: 29200 };

function calcFedTax(taxable: number, brackets: typeof FED_BRACKETS_SINGLE) {
  let tax = 0;
  let prev = 0;
  for (const b of brackets) {
    if (taxable <= prev) break;
    const slice = Math.min(taxable, b.upTo) - prev;
    tax += slice * b.rate;
    prev = b.upTo;
  }
  return tax;
}

export function PaycheckCalculator() {
  const [salary, setSalary] = useState(75000);
  const [filing, setFiling] = useState<'single' | 'married'>('single');
  const [stateRate, setStateRate] = useState(5);
  const [retirement401k, setRetirement401k] = useState(6);

  const k401 = salary * (retirement401k / 100);
  const fedTaxable = Math.max(0, salary - k401 - STD_DED[filing]);
  const fedTax = calcFedTax(fedTaxable, filing === 'single' ? FED_BRACKETS_SINGLE : FED_BRACKETS_MARRIED);
  const ssWageBase = Math.min(salary - k401, 168600);
  const socialSec = ssWageBase * 0.062;
  const medicare = (salary - k401) * 0.0145;
  const stateTax = (salary - k401) * (stateRate / 100);
  const totalDeductions = k401 + fedTax + socialSec + medicare + stateTax;
  const annualNet = salary - totalDeductions;
  const fmt = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Annual Salary</span>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span><input type="number" value={salary} onChange={(e) => setSalary(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></div>
        </label>
        <div>
          <span className="block text-sm font-medium mb-2">Filing Status</span>
          <div className="flex gap-2">
            <button onClick={() => setFiling('single')} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${filing === 'single' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>Single</button>
            <button onClick={() => setFiling('married')} className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${filing === 'married' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>Married Joint</button>
          </div>
        </div>
        <label className="block">
          <span className="block text-sm font-medium mb-2">State Tax Rate (estimated)</span>
          <div className="relative"><input type="number" step="0.1" value={stateRate} onChange={(e) => setStateRate(Number(e.target.value) || 0)} className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span></div>
          <p className="text-xs text-gray-500 mt-1">~5% national avg. CA ~9%, TX/FL 0%</p>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">401(k) Contribution</span>
          <div className="relative"><input type="number" step="0.5" value={retirement401k} onChange={(e) => setRetirement401k(Number(e.target.value) || 0)} className="w-full pl-3 pr-8 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span></div>
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Take-home (annual)</p>
        <p className="text-5xl font-bold mb-2" style={{ color: '#3b82f6' }}>{fmt(annualNet)}</p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{fmt(annualNet / 26)} per biweekly paycheck · {fmt(annualNet / 12)}/mo</p>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm">
          <div><span className="text-gray-500">Federal tax:</span> <strong className="block text-lg">{fmt(fedTax)}</strong></div>
          <div><span className="text-gray-500">State tax:</span> <strong className="block text-lg">{fmt(stateTax)}</strong></div>
          <div><span className="text-gray-500">Social Security:</span> <strong className="block text-lg">{fmt(socialSec)}</strong></div>
          <div><span className="text-gray-500">Medicare:</span> <strong className="block text-lg">{fmt(medicare)}</strong></div>
          <div><span className="text-gray-500">401(k):</span> <strong className="block text-lg">{fmt(k401)}</strong></div>
          <div><span className="text-gray-500">Total deductions:</span> <strong className="block text-lg">{fmt(totalDeductions)}</strong></div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 text-sm text-gray-600 dark:text-gray-400">
        <strong className="text-gray-900 dark:text-white">Note:</strong> Estimates only. Uses 2025 federal brackets, standard deduction, simplified state rate. Doesn&apos;t include health insurance, HSA/FSA, or other pre-tax deductions.
      </div>
    </div>
  );
}
