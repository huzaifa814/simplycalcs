'use client';

import { useMemo, useState } from 'react';

function diff(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    const prev = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalMs = to.getTime() - from.getTime();
  const totalDays = Math.floor(totalMs / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = Math.floor(totalMs / 3600000);
  const totalMinutes = Math.floor(totalMs / 60000);
  return { years, months, days, totalDays, totalWeeks, totalMonths, totalHours, totalMinutes };
}

function nextBirthday(birth: Date, today: Date) {
  const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (next.getTime() < today.getTime()) next.setFullYear(today.getFullYear() + 1);
  const days = Math.ceil((next.getTime() - today.getTime()) / 86400000);
  return { date: next, days };
}

export function AgeCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [birth, setBirth] = useState('1995-06-15');
  const [as, setAs] = useState(today);

  const result = useMemo(() => {
    const b = new Date(birth + 'T00:00:00');
    const a = new Date(as + 'T00:00:00');
    if (isNaN(b.getTime()) || isNaN(a.getTime()) || a < b) return null;
    return { age: diff(b, a), bday: nextBirthday(b, a) };
  }, [birth, as]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">Date of birth</span>
          <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Age at this date</span>
          <input type="date" value={as} onChange={(e) => setAs(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
      </div>

      {result ? (
        <>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Age</p>
            <p className="text-5xl font-bold mb-2" style={{ color: '#3b82f6' }}>
              {result.age.years} <span className="text-2xl font-normal text-gray-500">years</span> {result.age.months} <span className="text-2xl font-normal text-gray-500">months</span> {result.age.days} <span className="text-2xl font-normal text-gray-500">days</span>
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-5 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
            <div><span className="text-gray-500 block">Total months</span><strong className="text-lg">{result.age.totalMonths.toLocaleString()}</strong></div>
            <div><span className="text-gray-500 block">Total weeks</span><strong className="text-lg">{result.age.totalWeeks.toLocaleString()}</strong></div>
            <div><span className="text-gray-500 block">Total days</span><strong className="text-lg">{result.age.totalDays.toLocaleString()}</strong></div>
            <div><span className="text-gray-500 block">Total hours</span><strong className="text-lg">{result.age.totalHours.toLocaleString()}</strong></div>
            <div><span className="text-gray-500 block">Total minutes</span><strong className="text-lg">{result.age.totalMinutes.toLocaleString()}</strong></div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Next birthday</p>
            <p className="text-xl font-semibold">{result.bday.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="text-sm text-gray-500 mt-1">In {result.bday.days} day{result.bday.days === 1 ? '' : 's'}</p>
          </div>
        </>
      ) : (
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-500">Enter a valid date of birth on or before the comparison date.</div>
      )}
    </div>
  );
}
