'use client';

import { useState } from 'react';

interface Course { name: string; grade: string; credits: number }

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0,
};

export function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: 'Course 1', grade: 'A', credits: 3 },
    { name: 'Course 2', grade: 'B+', credits: 4 },
    { name: 'Course 3', grade: 'A-', credits: 3 },
  ]);

  const totalPoints = courses.reduce((sum, c) => sum + (GRADE_POINTS[c.grade] || 0) * c.credits, 0);
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  const upd = (i: number, k: keyof Course, v: any) => setCourses(courses.map((c, idx) => idx === i ? { ...c, [k]: v } : c));
  const add = () => setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: 'A', credits: 3 }]);
  const del = (i: number) => setCourses(courses.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Your Courses</h3>
          <button onClick={add} className="px-4 py-1.5 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600">+ Add Course</button>
        </div>
        <div className="space-y-2">
          {courses.map((c, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-center">
              <input value={c.name} onChange={(e) => upd(i, 'name', e.target.value)} className="col-span-5 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
              <select value={c.grade} onChange={(e) => upd(i, 'grade', e.target.value)} className="col-span-3 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm">
                {Object.keys(GRADE_POINTS).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <input type="number" value={c.credits} onChange={(e) => upd(i, 'credits', Number(e.target.value) || 0)} placeholder="Credits" className="col-span-3 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
              <button onClick={() => del(i)} className="col-span-1 text-red-500 hover:text-red-600 text-sm">×</button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your GPA</p>
        <p className="text-6xl font-bold mb-4" style={{ color: '#3b82f6' }}>{gpa.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{totalCredits} credits · {courses.length} courses</p>
      </div>
    </div>
  );
}
