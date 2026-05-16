'use client';

import { useEffect, useMemo, useState } from 'react';

type DayRow = { start: string; end: string; breakMin: number };

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const STORAGE_KEY = 'simplycalcs.timeCard.v1';

const blankWeek = (): DayRow[] => DAYS.map(() => ({ start: '', end: '', breakMin: 0 }));
const sampleWeek = (): DayRow[] => [
  { start: '09:00', end: '17:30', breakMin: 30 },
  { start: '08:30', end: '17:00', breakMin: 30 },
  { start: '09:00', end: '17:00', breakMin: 30 },
  { start: '09:00', end: '18:00', breakMin: 45 },
  { start: '08:00', end: '14:00', breakMin: 0 },
  { start: '', end: '', breakMin: 0 },
  { start: '', end: '', breakMin: 0 },
];

/** Returns hours worked for a row, or null if invalid/empty. End past midnight is supported when end<start. */
function rowHours(row: DayRow): number | null {
  if (!row.start || !row.end) return null;
  const [sh, sm] = row.start.split(':').map(Number);
  const [eh, em] = row.end.split(':').map(Number);
  if (Number.isNaN(sh) || Number.isNaN(sm) || Number.isNaN(eh) || Number.isNaN(em)) return null;
  let mins = (eh * 60 + em) - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60; // overnight shift
  mins -= Math.max(0, row.breakMin || 0);
  if (mins <= 0) return 0;
  return mins / 60;
}

function fmtHours(h: number) {
  if (h === 0) return '0:00';
  const sign = h < 0 ? '-' : '';
  const abs = Math.abs(h);
  const whole = Math.floor(abs);
  const min = Math.round((abs - whole) * 60);
  return `${sign}${whole}:${String(min).padStart(2, '0')}`;
}

export function TimeCardCalculator() {
  const [rows, setRows] = useState<DayRow[]>(sampleWeek);
  const [loaded, setLoaded] = useState(false);
  const [rate, setRate] = useState<string>('25');
  const [otEnabled, setOtEnabled] = useState(true);
  const [otThreshold, setOtThreshold] = useState<string>('40');
  const [otMultiplier, setOtMultiplier] = useState<string>('1.5');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.rows) setRows(saved.rows);
        if (saved.rate !== undefined) setRate(String(saved.rate));
        if (saved.otEnabled !== undefined) setOtEnabled(saved.otEnabled);
        if (saved.otThreshold !== undefined) setOtThreshold(String(saved.otThreshold));
        if (saved.otMultiplier !== undefined) setOtMultiplier(String(saved.otMultiplier));
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const id = setTimeout(() => {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ rows, rate, otEnabled, otThreshold, otMultiplier })); } catch { /* quota */ }
    }, 400);
    return () => clearTimeout(id);
  }, [rows, rate, otEnabled, otThreshold, otMultiplier, loaded]);

  const updateRow = (i: number, patch: Partial<DayRow>) =>
    setRows((rs) => rs.map((r, ri) => ri === i ? { ...r, ...patch } : r));

  const dayHours = useMemo(() => rows.map(rowHours), [rows]);

  const totalHours = useMemo(() => dayHours.reduce<number>((s, h) => s + (h || 0), 0), [dayHours]);

  const ot = useMemo(() => {
    const threshold = Number(otThreshold) || 40;
    const mult = Number(otMultiplier) || 1.5;
    if (!otEnabled) return { regular: totalHours, overtime: 0, mult };
    if (totalHours <= threshold) return { regular: totalHours, overtime: 0, mult };
    return { regular: threshold, overtime: totalHours - threshold, mult };
  }, [otEnabled, otThreshold, otMultiplier, totalHours]);

  const numRate = Number(rate) || 0;
  const regularPay = ot.regular * numRate;
  const otPay = ot.overtime * numRate * ot.mult;
  const totalPay = regularPay + otPay;

  return (
    <div className="space-y-6">
      {/* Week grid */}
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">This week</h2>
          <div className="flex gap-2 text-sm">
            <button onClick={() => setRows(sampleWeek())} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">Sample week</button>
            <button onClick={() => setRows(blankWeek())} className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800">Clear all</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-slate-800">
              <tr>
                <th className="py-2 pr-2 font-medium">Day</th>
                <th className="py-2 px-2 font-medium">Start</th>
                <th className="py-2 px-2 font-medium">End</th>
                <th className="py-2 px-2 font-medium">Break (min)</th>
                <th className="py-2 pl-2 text-right font-medium">Hours</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const h = dayHours[i];
                return (
                  <tr key={i} className="border-b border-gray-100 dark:border-slate-800/60 last:border-b-0">
                    <td className="py-2 pr-2 font-medium">{DAYS[i]}</td>
                    <td className="py-2 px-2">
                      <input type="time" value={row.start} onChange={(e) => updateRow(i, { start: e.target.value })}
                        className="px-2 py-1.5 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 w-full max-w-[120px]" />
                    </td>
                    <td className="py-2 px-2">
                      <input type="time" value={row.end} onChange={(e) => updateRow(i, { end: e.target.value })}
                        className="px-2 py-1.5 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 w-full max-w-[120px]" />
                    </td>
                    <td className="py-2 px-2">
                      <input type="number" min={0} step={5} value={row.breakMin || ''} placeholder="0"
                        onChange={(e) => updateRow(i, { breakMin: Number(e.target.value) || 0 })}
                        className="px-2 py-1.5 rounded border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 w-full max-w-[90px]" />
                    </td>
                    <td className="py-2 pl-2 text-right tabular-nums">
                      {h === null ? <span className="text-gray-400">—</span> : <span className="font-medium">{fmtHours(h)}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 dark:border-slate-700">
                <td colSpan={4} className="py-3 pr-2 font-semibold text-right">Weekly total</td>
                <td className="py-3 pl-2 text-right font-bold text-lg tabular-nums" style={{ color: '#3b82f6' }}>{fmtHours(totalHours)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Overnight shifts (end time before start time) are calculated as the next day. Break minutes are subtracted from total.</p>
      </div>

      {/* Pay + overtime settings */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <h2 className="font-semibold">Pay</h2>
          <label className="block">
            <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hourly rate ($)</span>
            <input type="number" min={0} step={0.25} value={rate} onChange={(e) => setRate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          </label>
        </div>
        <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Overtime</h2>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={otEnabled} onChange={(e) => setOtEnabled(e.target.checked)} />
              Apply
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">After (hours/week)</span>
              <input type="number" min={0} value={otThreshold} disabled={!otEnabled} onChange={(e) => setOtThreshold(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-50" />
            </label>
            <label className="block">
              <span className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Multiplier</span>
              <input type="number" min={1} step={0.25} value={otMultiplier} disabled={!otEnabled} onChange={(e) => setOtMultiplier(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 disabled:opacity-50" />
            </label>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Weekly summary</p>
        <p className="text-5xl font-bold mb-6 tabular-nums" style={{ color: '#3b82f6' }}>{fmtHours(totalHours)}</p>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Regular hours</span>
            <strong className="block text-lg tabular-nums">{fmtHours(ot.regular)}</strong>
            <span className="text-xs text-gray-500">{numRate > 0 && `$${regularPay.toFixed(2)}`}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Overtime ({ot.mult}×)</span>
            <strong className="block text-lg tabular-nums">{fmtHours(ot.overtime)}</strong>
            <span className="text-xs text-gray-500">{numRate > 0 && `$${otPay.toFixed(2)}`}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Total pay</span>
            <strong className="block text-lg tabular-nums" style={{ color: numRate > 0 ? '#3b82f6' : 'inherit' }}>{numRate > 0 ? `$${totalPay.toFixed(2)}` : '—'}</strong>
            <span className="text-xs text-gray-500">{numRate > 0 ? `at $${numRate.toFixed(2)}/hr` : 'enter rate'}</span>
          </div>
        </div>
        <button onClick={() => window.print()} className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-white/40 dark:hover:bg-slate-800 text-sm">
          🖨️  Print timesheet
        </button>
      </div>

      {/* Notes */}
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 prose prose-sm dark:prose-invert max-w-none">
        <h3 className="text-base font-semibold">How it works</h3>
        <ul className="text-sm">
          <li>Enter start and end times for each day. Use the break-minutes column for unpaid breaks.</li>
          <li>Overnight shifts: if your end time is before your start time, the calculator treats end as the next day.</li>
          <li>Overtime defaults to U.S. standard (more than 40 hours/week at 1.5×). Change the threshold or multiplier if your rules differ — California, for example, has daily overtime at 8+ hours.</li>
          <li>Your inputs autosave to this browser. Close the tab and come back — your timesheet is still there.</li>
        </ul>
      </div>
    </div>
  );
}
