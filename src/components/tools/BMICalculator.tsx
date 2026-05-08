'use client';

import { useState } from 'react';

export function BMICalculator() {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [pounds, setPounds] = useState(170);
  const [cm, setCm] = useState(178);
  const [kg, setKg] = useState(77);

  const heightM = unit === 'imperial' ? (feet * 12 + inches) * 0.0254 : cm / 100;
  const weightKg = unit === 'imperial' ? pounds * 0.453592 : kg;
  const bmi = heightM > 0 ? weightKg / (heightM * heightM) : 0;
  const category = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
  const color = bmi < 18.5 ? '#3b82f6' : bmi < 25 ? '#22c55e' : bmi < 30 ? '#f59e0b' : '#ef4444';

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['imperial', 'metric'] as const).map((u) => (
          <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2 rounded-lg font-medium transition ${unit === u ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'}`}>
            {u === 'imperial' ? 'Imperial (lbs/ft)' : 'Metric (kg/cm)'}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        {unit === 'imperial' ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="block text-sm font-medium mb-2">Height (ft)</span>
                <input type="number" value={feet} onChange={(e) => setFeet(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
              </label>
              <label className="block">
                <span className="block text-sm font-medium mb-2">Height (in)</span>
                <input type="number" value={inches} onChange={(e) => setInches(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
              </label>
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
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your BMI</p>
        <p className="text-6xl font-bold mb-2" style={{ color }}>{bmi.toFixed(1)}</p>
        <p className="text-xl font-semibold" style={{ color }}>{category}</p>
        <div className="grid grid-cols-4 gap-2 mt-6 text-xs">
          <div className="p-2 rounded bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300">Under<br/>&lt;18.5</div>
          <div className="p-2 rounded bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300">Normal<br/>18.5-24.9</div>
          <div className="p-2 rounded bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300">Over<br/>25-29.9</div>
          <div className="p-2 rounded bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300">Obese<br/>&ge;30</div>
        </div>
      </div>
    </div>
  );
}
