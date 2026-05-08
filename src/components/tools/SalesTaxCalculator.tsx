'use client';

import { useState } from 'react';

const STATE_RATES: { code: string; name: string; rate: number }[] = [
  { code: 'AL', name: 'Alabama', rate: 4.0 }, { code: 'AK', name: 'Alaska', rate: 0.0 },
  { code: 'AZ', name: 'Arizona', rate: 5.6 }, { code: 'AR', name: 'Arkansas', rate: 6.5 },
  { code: 'CA', name: 'California', rate: 7.25 }, { code: 'CO', name: 'Colorado', rate: 2.9 },
  { code: 'CT', name: 'Connecticut', rate: 6.35 }, { code: 'DE', name: 'Delaware', rate: 0.0 },
  { code: 'FL', name: 'Florida', rate: 6.0 }, { code: 'GA', name: 'Georgia', rate: 4.0 },
  { code: 'HI', name: 'Hawaii', rate: 4.0 }, { code: 'ID', name: 'Idaho', rate: 6.0 },
  { code: 'IL', name: 'Illinois', rate: 6.25 }, { code: 'IN', name: 'Indiana', rate: 7.0 },
  { code: 'IA', name: 'Iowa', rate: 6.0 }, { code: 'KS', name: 'Kansas', rate: 6.5 },
  { code: 'KY', name: 'Kentucky', rate: 6.0 }, { code: 'LA', name: 'Louisiana', rate: 4.45 },
  { code: 'ME', name: 'Maine', rate: 5.5 }, { code: 'MD', name: 'Maryland', rate: 6.0 },
  { code: 'MA', name: 'Massachusetts', rate: 6.25 }, { code: 'MI', name: 'Michigan', rate: 6.0 },
  { code: 'MN', name: 'Minnesota', rate: 6.875 }, { code: 'MS', name: 'Mississippi', rate: 7.0 },
  { code: 'MO', name: 'Missouri', rate: 4.225 }, { code: 'MT', name: 'Montana', rate: 0.0 },
  { code: 'NE', name: 'Nebraska', rate: 5.5 }, { code: 'NV', name: 'Nevada', rate: 6.85 },
  { code: 'NH', name: 'New Hampshire', rate: 0.0 }, { code: 'NJ', name: 'New Jersey', rate: 6.625 },
  { code: 'NM', name: 'New Mexico', rate: 4.875 }, { code: 'NY', name: 'New York', rate: 4.0 },
  { code: 'NC', name: 'North Carolina', rate: 4.75 }, { code: 'ND', name: 'North Dakota', rate: 5.0 },
  { code: 'OH', name: 'Ohio', rate: 5.75 }, { code: 'OK', name: 'Oklahoma', rate: 4.5 },
  { code: 'OR', name: 'Oregon', rate: 0.0 }, { code: 'PA', name: 'Pennsylvania', rate: 6.0 },
  { code: 'RI', name: 'Rhode Island', rate: 7.0 }, { code: 'SC', name: 'South Carolina', rate: 6.0 },
  { code: 'SD', name: 'South Dakota', rate: 4.2 }, { code: 'TN', name: 'Tennessee', rate: 7.0 },
  { code: 'TX', name: 'Texas', rate: 6.25 }, { code: 'UT', name: 'Utah', rate: 6.1 },
  { code: 'VT', name: 'Vermont', rate: 6.0 }, { code: 'VA', name: 'Virginia', rate: 5.3 },
  { code: 'WA', name: 'Washington', rate: 6.5 }, { code: 'WV', name: 'West Virginia', rate: 6.0 },
  { code: 'WI', name: 'Wisconsin', rate: 5.0 }, { code: 'WY', name: 'Wyoming', rate: 4.0 },
  { code: 'DC', name: 'District of Columbia', rate: 6.0 },
];

export function SalesTaxCalculator() {
  const [amount, setAmount] = useState(100);
  const [stateCode, setStateCode] = useState('CA');
  const [localRate, setLocalRate] = useState(2.5);

  const state = STATE_RATES.find(s => s.code === stateCode) || STATE_RATES[0];
  const totalRate = state.rate + localRate;
  const tax = amount * (totalRate / 100);
  const total = amount + tax;
  const fmt = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Pre-tax Amount</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </div>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">State</span>
          <select value={stateCode} onChange={(e) => setStateCode(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            {STATE_RATES.map(s => <option key={s.code} value={s.code}>{s.name} ({s.rate.toFixed(2)}%)</option>)}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Local Tax (%)</span>
          <input type="number" step="0.01" value={localRate} onChange={(e) => setLocalRate(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          <p className="text-xs text-gray-500 mt-1">County + city. Avg 1-3% in most states.</p>
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total with tax</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{fmt(total)}</p>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div><span className="text-gray-500">Sales tax:</span> <strong className="block text-lg">{fmt(tax)}</strong></div>
          <div><span className="text-gray-500">Combined rate:</span> <strong className="block text-lg">{totalRate.toFixed(3)}%</strong></div>
          <div><span className="text-gray-500">State only:</span> <strong className="block text-lg">{state.rate.toFixed(2)}%</strong></div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-gray-200 dark:border-slate-800 text-sm text-gray-600 dark:text-gray-400">
        <p><strong className="text-gray-900 dark:text-white">Note:</strong> Rates above are state-level base rates as of 2026. Local rates vary by zip code — enter your local rate to get the exact total. Some states (AK, DE, MT, NH, OR) have no statewide sales tax.</p>
      </div>
    </div>
  );
}
