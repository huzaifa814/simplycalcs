'use client';

import { useState } from 'react';

export function PregnancyCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [lmp, setLmp] = useState(today);

  const lmpDate = new Date(lmp + 'T00:00:00');
  const dueDate = new Date(lmpDate.getTime() + 280 * 86400000);
  const conception = new Date(lmpDate.getTime() + 14 * 86400000);
  const now = new Date();
  const daysSinceLmp = Math.floor((now.getTime() - lmpDate.getTime()) / 86400000);
  const weeks = Math.floor(daysSinceLmp / 7);
  const days = daysSinceLmp % 7;
  const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;
  const daysToDue = Math.ceil((dueDate.getTime() - now.getTime()) / 86400000);
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const valid = !isNaN(lmpDate.getTime()) && daysSinceLmp >= 0 && daysSinceLmp <= 300;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <label className="block">
          <span className="block text-sm font-medium mb-2">First day of last menstrual period (LMP)</span>
          <input type="date" value={lmp} onChange={(e) => setLmp(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
          <p className="text-xs text-gray-500 mt-2">Standard 28-day cycle. Most accurate for first trimester. Consult your provider for individual estimates.</p>
        </label>
      </div>

      {valid ? (
        <>
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Estimated due date</p>
            <p className="text-4xl font-bold mb-2" style={{ color: '#3b82f6' }}>{fmt(dueDate)}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{daysToDue > 0 ? `${daysToDue} days to go` : daysToDue === 0 ? 'Due today!' : `${-daysToDue} days past due date`}</p>
            <div className="grid gap-3 md:grid-cols-3 text-sm">
              <div><span className="text-gray-500">Currently:</span> <strong className="block text-lg">{weeks}w {days}d</strong></div>
              <div><span className="text-gray-500">Trimester:</span> <strong className="block text-lg">{trimester}</strong></div>
              <div><span className="text-gray-500">Estimated conception:</span> <strong className="block text-lg">{conception.toLocaleDateString()}</strong></div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <h3 className="font-semibold mb-3">Trimester milestones</h3>
            <div className="space-y-2 text-sm">
              <div className={`p-3 rounded-lg ${trimester === 1 ? 'bg-blue-50 dark:bg-blue-950/30' : 'bg-gray-50 dark:bg-slate-800'}`}><strong>1st trimester (0-12w):</strong> Heart begins beating ~6w. First ultrasound 8-10w. Risk of morning sickness peaks.</div>
              <div className={`p-3 rounded-lg ${trimester === 2 ? 'bg-blue-50 dark:bg-blue-950/30' : 'bg-gray-50 dark:bg-slate-800'}`}><strong>2nd trimester (13-26w):</strong> Anatomy scan ~20w. Often feel first kicks 18-22w. Glucose screening 24-28w.</div>
              <div className={`p-3 rounded-lg ${trimester === 3 ? 'bg-blue-50 dark:bg-blue-950/30' : 'bg-gray-50 dark:bg-slate-800'}`}><strong>3rd trimester (27-40w):</strong> Group B strep test 36w. Weekly visits start ~36w. Full-term at 39w.</div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 text-sm">Pick a date within the last 300 days.</div>
      )}
    </div>
  );
}
