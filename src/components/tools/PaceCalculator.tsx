'use client';

import { useState } from 'react';

export function PaceCalculator() {
  const [distance, setDistance] = useState(5);
  const [unit, setUnit] = useState<'km' | 'mi'>('km');
  const [hh, setHh] = useState(0);
  const [mm, setMm] = useState(28);
  const [ss, setSs] = useState(0);

  const totalSec = hh * 3600 + mm * 60 + ss;
  const paceSec = distance > 0 ? totalSec / distance : 0;
  const paceMin = Math.floor(paceSec / 60);
  const paceS = Math.round(paceSec % 60);
  const speed = totalSec > 0 ? distance / (totalSec / 3600) : 0;
  const pad = (n: number) => String(n).padStart(2, '0');

  const presets = unit === 'km'
    ? [{ name: '5K', d: 5 }, { name: '10K', d: 10 }, { name: 'Half', d: 21.0975 }, { name: 'Marathon', d: 42.195 }]
    : [{ name: '5K', d: 3.10686 }, { name: '10K', d: 6.21371 }, { name: 'Half', d: 13.1094 }, { name: 'Marathon', d: 26.2188 }];

  const projections = presets.map(p => {
    const sec = p.d * paceSec;
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = Math.round(sec % 60);
    return { name: p.name, time: h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}` };
  });

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block md:col-span-2">
            <span className="block text-sm font-medium mb-2">Distance</span>
            <input type="number" step="0.01" value={distance} onChange={(e) => setDistance(Number(e.target.value) || 0)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-2">Unit</span>
            <select value={unit} onChange={(e) => setUnit(e.target.value as 'km' | 'mi')} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900">
              <option value="km">Kilometers</option>
              <option value="mi">Miles</option>
            </select>
          </label>
        </div>
        <div>
          <span className="block text-sm font-medium mb-2">Time</span>
          <div className="grid grid-cols-3 gap-3">
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Hours</span><input type="number" min={0} value={hh} onChange={(e) => setHh(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Minutes</span><input type="number" min={0} max={59} value={mm} onChange={(e) => setMm(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
            <label className="block"><span className="block text-xs text-gray-500 mb-1">Seconds</span><input type="number" min={0} max={59} value={ss} onChange={(e) => setSs(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" /></label>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your pace</p>
        <p className="text-5xl font-bold mb-6" style={{ color: '#3b82f6' }}>{paceMin}:{pad(paceS)} <span className="text-2xl text-gray-500">/{unit}</span></p>
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          <div><span className="text-gray-500">Speed:</span> <strong className="block text-lg">{speed.toFixed(2)} {unit === 'km' ? 'km/h' : 'mph'}</strong></div>
          <div><span className="text-gray-500">Total time:</span> <strong className="block text-lg">{hh}:{pad(mm)}:{pad(ss)}</strong></div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <h3 className="font-semibold mb-3">Race time projections at this pace</h3>
        <div className="grid gap-3 md:grid-cols-4">
          {projections.map(p => (
            <div key={p.name} className="p-4 rounded-lg bg-gray-50 dark:bg-slate-800">
              <p className="text-xs text-gray-500 mb-1">{p.name}</p>
              <p className="text-xl font-bold">{p.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
