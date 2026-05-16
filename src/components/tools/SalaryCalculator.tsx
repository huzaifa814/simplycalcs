'use client';

import { useMemo, useState } from 'react';

type Field = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual';

const money = (n: number) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });

export function SalaryCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [holidays, setHolidays] = useState(0);
  const [vacation, setVacation] = useState(0);
  const [from, setFrom] = useState<Field>('annual');
  const [value, setValue] = useState(60000);

  const result = useMemo(() => {
    const workWeeks = Math.max(0, weeksPerYear - (holidays + vacation) / 5);
    const workHours = workWeeks * hoursPerWeek;
    let annual = 0;
    switch (from) {
      case 'hourly': annual = value * workHours; break;
      case 'daily': annual = value * (workWeeks * 5); break;
      case 'weekly': annual = value * workWeeks; break;
      case 'biweekly': annual = value * (workWeeks / 2); break;
      case 'monthly': annual = value * 12; break;
      case 'annual': annual = value; break;
    }
    return {
      hourly: workHours > 0 ? annual / workHours : 0,
      daily: workWeeks > 0 ? annual / (workWeeks * 5) : 0,
      weekly: workWeeks > 0 ? annual / workWeeks : 0,
      biweekly: workWeeks > 0 ? annual / (workWeeks / 2) : 0,
      monthly: annual / 12,
      annual,
    };
  }, [from, value, hoursPerWeek, weeksPerYear, holidays, vacation]);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <span className="block text-sm font-medium mb-2">Convert from</span>
            <select value={from} onChange={(e) => setFrom(e.target.value as Field)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <label className="block">
            <span className="block text-sm font-medium mb-2">Amount</span>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input type="number" step="0.01" value={value} onChange={(e) => setValue(Number(e.target.value) || 0)} className="w-full pl-7 pr-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            </div>
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-4 mt-4">
          <label className="block"><span className="block text-xs text-gray-500 mb-1">Hours / week</span><input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" /></label>
          <label className="block"><span className="block text-xs text-gray-500 mb-1">Weeks / year</span><input type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" /></label>
          <label className="block"><span className="block text-xs text-gray-500 mb-1">Holidays (days)</span><input type="number" value={holidays} onChange={(e) => setHolidays(Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" /></label>
          <label className="block"><span className="block text-xs text-gray-500 mb-1">Vacation (days)</span><input type="number" value={vacation} onChange={(e) => setVacation(Number(e.target.value) || 0)} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" /></label>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Annual salary</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{money(result.annual)}</p>
        <div className="grid gap-3 md:grid-cols-5 text-sm">
          <div><span className="text-gray-500">Hourly:</span> <strong className="block text-lg">{money(result.hourly)}</strong></div>
          <div><span className="text-gray-500">Daily:</span> <strong className="block text-lg">{money(result.daily)}</strong></div>
          <div><span className="text-gray-500">Weekly:</span> <strong className="block text-lg">{money(result.weekly)}</strong></div>
          <div><span className="text-gray-500">Biweekly:</span> <strong className="block text-lg">{money(result.biweekly)}</strong></div>
          <div><span className="text-gray-500">Monthly:</span> <strong className="block text-lg">{money(result.monthly)}</strong></div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-gray-600 dark:text-gray-400">
        <p><strong>Gross pay only.</strong> For take-home pay after federal, state, and FICA taxes, use the <a href="/tools/paycheck-calculator" className="text-blue-600 hover:underline">Paycheck Calculator</a>.</p>
      </div>
    </div>
  );
}
