'use client';

import { useState } from 'react';

const ACTIVITY: Record<string, { mult: number; label: string }> = {
  sedentary: { mult: 1.2, label: 'Sedentary (little/no exercise)' },
  light: { mult: 1.375, label: 'Light (1-3 days/week)' },
  moderate: { mult: 1.55, label: 'Moderate (3-5 days/week)' },
  active: { mult: 1.725, label: 'Active (6-7 days/week)' },
  very: { mult: 1.9, label: 'Very Active (intense daily)' },
};

export function CalorieCalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(30);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [pounds, setPounds] = useState(170);
  const [cm, setCm] = useState(178);
  const [kg, setKg] = useState(77);
  const [activity, setActivity] = useState<keyof typeof ACTIVITY>('moderate');

  const heightCm = unit === 'imperial' ? (feet * 12 + inches) * 2.54 : cm;
  const weightKg = unit === 'imperial' ? pounds * 0.453592 : kg;
  // Mifflin-St Jeor BMR
  const bmr = sex === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const tdee = bmr * ACTIVITY[activity].mult;
  const round = (n: number) => Math.round(n).toLocaleString();

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['imperial', 'metric'] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg font-medium transition ${unit === u ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>{u === 'imperial' ? 'Imperial' : 'Metric'}</button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div>
          <span className="block text-sm font-medium mb-2">Sex</span>
          <div className="flex gap-2">
            <button onClick={() => setSex('male')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${sex === 'male' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800'}`}>Male</button>
            <button onClick={() => setSex('female')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${sex === 'female' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800'}`}>Female</button>
          </div>
        </div>
        <label className="block">
          <span className="block text-sm font-medium mb-2">Age</span>
          <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        </label>
        {unit === 'imperial' ? (
          <>
            <div>
              <span className="block text-sm font-medium mb-2">Height</span>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="ft" value={feet} onChange={(e) => setFeet(Number(e.target.value) || 0)} className="px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
                <input type="number" placeholder="in" value={inches} onChange={(e) => setInches(Number(e.target.value) || 0)} className="px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
              </div>
            </div>
            <label className="block">
              <span className="block text-sm font-medium mb-2">Weight (lbs)</span>
              <input type="number" value={pounds} onChange={(e) => setPounds(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            </label>
          </>
        ) : (
          <>
            <label className="block">
              <span className="block text-sm font-medium mb-2">Height (cm)</span>
              <input type="number" value={cm} onChange={(e) => setCm(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            </label>
            <label className="block">
              <span className="block text-sm font-medium mb-2">Weight (kg)</span>
              <input type="number" value={kg} onChange={(e) => setKg(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
            </label>
          </>
        )}
        <label className="block md:col-span-2">
          <span className="block text-sm font-medium mb-2">Activity Level</span>
          <select value={activity} onChange={(e) => setActivity(e.target.value as keyof typeof ACTIVITY)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
            {Object.entries(ACTIVITY).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </label>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Daily calorie needs</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{round(tdee)} kcal</p>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div><span className="text-gray-500">BMR (rest):</span> <strong className="block text-lg">{round(bmr)}</strong></div>
          <div><span className="text-gray-500">Lose 1 lb/wk:</span> <strong className="block text-lg">{round(tdee - 500)}</strong></div>
          <div><span className="text-gray-500">Gain 1 lb/wk:</span> <strong className="block text-lg">{round(tdee + 500)}</strong></div>
        </div>
      </div>
    </div>
  );
}
