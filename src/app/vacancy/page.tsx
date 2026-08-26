'use client';

import { useState, useEffect } from 'react';

interface VacantUnit {
  property: string;
  unit: string;
  area: string;
  daysVacant: number;
  pendingLease: string;
  type: string;
  dateFrom: string;
}

function parseCSV(text: string): VacantUnit[] {
  const lines = text.trim().split('\n');
  const results: VacantUnit[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].match(/(".*?"|[^,]+)(?=,|$)/g) || [];
    const clean = (s: string | undefined) => s?.replace(/^"|"$/g, '').trim() || '';

    const property = clean(cols[0]).replace(/^p\d+ - /, '');
    const unit = clean(cols[1]);
    const area = clean(cols[2]);
    const daysVacant = parseInt(clean(cols[3])) || 0;
    const pendingLease = clean(cols[5]);
    const type = clean(cols[6]);
    const dateFrom = clean(cols[7]);

    if (property) {
      results.push({ property, unit, area, daysVacant, pendingLease, type, dateFrom });
    }
  }

  return results;
}

function getDaysColor(days: number) {
  if (days > 10000) return 'text-gray-400'; // likely a placeholder
  if (days > 365) return 'text-red-600 font-bold';
  if (days > 180) return 'text-orange-500 font-semibold';
  if (days > 90) return 'text-yellow-600';
  return 'text-green-600';
}

export default function VacancyPage() {
  const [units, setUnits] = useState<VacantUnit[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'daysVacant' | 'property' | 'area'>('daysVacant');
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    fetch('/vacancy.csv')
      .then(r => r.text())
      .then(text => {
        setUnits(parseCSV(text));
        setLastUpdated(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
      });
  }, []);

  const filtered = units
    .filter(u => u.property.toLowerCase().includes(search.toLowerCase()) || u.unit.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'daysVacant') return b.daysVacant - a.daysVacant;
      if (sortBy === 'area') return parseInt(b.area.replace(/,/g, '')) - parseInt(a.area.replace(/,/g, ''));
      return a.property.localeCompare(b.property);
    });

  const totalSF = units.reduce((sum, u) => sum + parseInt(u.area.replace(/,/g, '') || '0'), 0);
  const withPending = units.filter(u => u.pendingLease).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Unit Vacancy Report</h1>
              <p className="text-gray-300 text-sm">Internal use only · Last updated: {lastUpdated}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-300">To update: upload a new <code className="bg-navy text-gold px-1 rounded">vacancy.csv</code> to GitHub /public/</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gold">{units.length}</div>
              <div className="text-gray-300 text-sm mt-1">Vacant Units</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gold">{totalSF.toLocaleString()}</div>
              <div className="text-gray-300 text-sm mt-1">Total Vacant SF</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gold">{withPending}</div>
              <div className="text-gray-300 text-sm mt-1">Pending Leases</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Search by property or unit..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-sm"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              {(['daysVacant', 'property', 'area'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${sortBy === s ? 'bg-gold text-navy' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {s === 'daysVacant' ? 'Days Vacant' : s === 'area' ? 'Size' : 'Property'}
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-500">{filtered.length} units</span>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Property</th>
                  <th className="px-4 py-3 text-left">Unit</th>
                  <th className="px-4 py-3 text-right">Size (SF)</th>
                  <th className="px-4 py-3 text-right">Days Vacant</th>
                  <th className="px-4 py-3 text-left">Pending Lease</th>
                  <th className="px-4 py-3 text-left">Available</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, idx) => (
                  <tr key={idx} className={`border-t border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}>
                    <td className="px-4 py-3 font-medium text-navy">{u.property}</td>
                    <td className="px-4 py-3 text-gray-600">{u.unit}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{parseInt(u.area.replace(/,/g, '')).toLocaleString() || '—'}</td>
                    <td className={`px-4 py-3 text-right ${getDaysColor(u.daysVacant)}`}>
                      {u.daysVacant > 10000 ? '—' : u.daysVacant.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {u.pendingLease ? (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          {u.pendingLease}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u.dateFrom || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-4 flex gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="text-green-600 font-bold">■</span> &lt; 90 days</span>
            <span className="flex items-center gap-1"><span className="text-yellow-600 font-bold">■</span> 90-180 days</span>
            <span className="flex items-center gap-1"><span className="text-orange-500 font-bold">■</span> 180-365 days</span>
            <span className="flex items-center gap-1"><span className="text-red-600 font-bold">■</span> 365+ days</span>
          </div>
        </div>
      </section>
    </div>
  );
}
