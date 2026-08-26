'use client';

import { useState } from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  required: boolean;
  options?: string[];
}

interface SubItem {
  id: string;
  label: string;
  status: 'pending' | 'working' | 'done' | 'na';
  notes: string;
  date: string;
}

const checklistItems: ChecklistItem[] = [
  // Admin
  { id: 'notify_office', label: 'Notify Office', category: 'Admin', required: true },
  { id: 'lease_dropbox', label: 'Lease on Dropbox', category: 'Admin', required: true },
  { id: 'lease_folder', label: 'Lease in Folder', category: 'Admin', required: true },
  { id: 'contact_sheet', label: 'Contact Sheet', category: 'Admin', required: true },
  { id: 'coi', label: 'COI (Certificate of Insurance)', category: 'Admin', required: true },
  { id: 'llpm_fee', label: 'LLPM Fee Charged', category: 'Admin', required: true },
  // Yardi
  { id: 'yardi_setup', label: 'Yardi Setup', category: 'Yardi & Portal', required: true },
  { id: 'rentcafe_intro', label: 'Rent Cafe Intro to Tenant', category: 'Yardi & Portal', required: true },
  { id: 'rentcafe_verify', label: 'Verify Rent Cafe Connection', category: 'Yardi & Portal', required: true },
  { id: 'portal_user', label: 'Portal User?', category: 'Yardi & Portal', required: true, options: ['Yes', 'No - ACH', 'TBD'] },
  // Financial
  { id: 'security_deposit', label: 'Security Deposit', category: 'Financial', required: true, options: ['Paid', 'Not Posted', 'Pending', 'N/A'] },
  { id: 'first_month', label: '1st Month Rent', category: 'Financial', required: true, options: ['Paid', 'Not Posted', 'Pending'] },
  // Communications
  { id: 'welcome_letter', label: 'Welcome Letter Sent', category: 'Communications', required: true },
  // Utilities
  { id: 'utility_info', label: 'Utility Info Sent to Tenant', category: 'Utilities', required: true },
  { id: 'spectrum', label: 'Spectrum (if applicable)', category: 'Utilities', required: false },
  { id: 'electric_tsf', label: 'Electric Transfer', category: 'Utilities', required: true, options: ['Done', 'Not Applicable', 'Pending'] },
  { id: 'water_tsf', label: 'Water Transfer', category: 'Utilities', required: true, options: ['Done', 'Not Applicable', 'Pending'] },
  // Move-In
  { id: 'keys', label: 'Tenant Has Keys', category: 'Move-In Day', required: true, options: ['Done', 'Scheduled', 'Pending'] },
  { id: 'update_website', label: 'Update Website / Remove from Available', category: 'Move-In Day', required: true },
];

const categories = [...new Set(checklistItems.map(i => i.category))];

type StatusValue = 'pending' | 'done' | 'na' | string;

export default function MoveInPage() {
  const [tenantName, setTenantName] = useState('');
  const [property, setProperty] = useState('');
  const [suite, setSuite] = useState('');
  const [lessor, setLessor] = useState('');
  const [leaseDate, setLeaseDate] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [statuses, setStatuses] = useState<Record<string, StatusValue>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [newSubItem, setNewSubItem] = useState('');
  const [saved, setSaved] = useState(false);

  const setStatus = (id: string, value: StatusValue) => {
    setStatuses(prev => ({ ...prev, [id]: value }));
  };

  const setNote = (id: string, value: string) => {
    setNotes(prev => ({ ...prev, [id]: value }));
  };

  const addSubItem = () => {
    if (!newSubItem.trim()) return;
    setSubItems(prev => [...prev, {
      id: Date.now().toString(),
      label: newSubItem.trim(),
      status: 'pending',
      notes: '',
      date: '',
    }]);
    setNewSubItem('');
  };

  const updateSubItem = (id: string, field: keyof SubItem, value: string) => {
    setSubItems(prev => prev.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const completedCount = checklistItems.filter(i => statuses[i.id] === 'done' || statuses[i.id] === 'na' || (i.options && statuses[i.id] && statuses[i.id] !== 'pending')).length;
  const progress = Math.round((completedCount / checklistItems.length) * 100);

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-10 print:py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-1">New Tenant Move-In Checklist</h1>
              <p className="text-gray-300 text-sm">Life Long Property Management · Internal Use Only</p>
            </div>
            <button
              onClick={handlePrint}
              className="bg-gold text-navy px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition print:hidden"
            >
              🖨 Print / Save PDF
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Tenant Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-bold text-navy mb-4">Tenant Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Tenant Name *</label>
              <input type="text" value={tenantName} onChange={e => setTenantName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold"
                placeholder="e.g. British Airways" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Property</label>
              <input type="text" value={property} onChange={e => setProperty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold"
                placeholder="e.g. 5615 FM 973" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Suite / Unit</label>
              <input type="text" value={suite} onChange={e => setSuite(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold"
                placeholder="e.g. Ste 600" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Lessor Entity</label>
              <input type="text" value={lessor} onChange={e => setLessor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold"
                placeholder="e.g. HOH / HFP" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Lease Signed Date</label>
              <input type="date" value={leaseDate} onChange={e => setLeaseDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Move-In Date</label>
              <input type="date" value={moveInDate} onChange={e => setMoveInDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-navy">Overall Progress</span>
            <span className="text-sm font-bold text-navy">{progress}% ({completedCount}/{checklistItems.length})</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gold h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist by Category */}
        {categories.map(category => (
          <div key={category} className="bg-white rounded-lg shadow mb-4 overflow-hidden">
            <div className="bg-navy px-6 py-3">
              <h2 className="text-white font-bold">{category}</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {checklistItems.filter(i => i.category === category).map(item => (
                <div key={item.id} className="px-6 py-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-navy">
                        {item.label}
                        {item.required && <span className="text-rust-orange ml-1">*</span>}
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.options ? (
                        <select
                          value={statuses[item.id] || ''}
                          onChange={e => setStatus(item.id, e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold"
                        >
                          <option value="">Select...</option>
                          {item.options.map(o => <option key={o} value={o}>{o}</option>)}
                          <option value="na">N/A</option>
                        </select>
                      ) : (
                        <div className="flex gap-2">
                          {['pending', 'done', 'na'].map(s => (
                            <button
                              key={s}
                              onClick={() => setStatus(item.id, s)}
                              className={`px-3 py-1 rounded text-xs font-medium transition ${
                                statuses[item.id] === s
                                  ? s === 'done' ? 'bg-green-500 text-white'
                                    : s === 'na' ? 'bg-gray-400 text-white'
                                    : 'bg-yellow-400 text-navy'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {s === 'pending' ? 'Pending' : s === 'done' ? '✓ Done' : 'N/A'}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={notes[item.id] || ''}
                    onChange={e => setNote(item.id, e.target.value)}
                    placeholder="Notes..."
                    className="mt-2 w-full px-3 py-1 border border-gray-200 rounded text-xs text-gray-600 focus:ring-1 focus:ring-gold"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sub-Items / Special Tasks */}
        <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
          <div className="bg-rust-orange px-6 py-3">
            <h2 className="text-white font-bold">Special Tasks / Sub-Items</h2>
            <p className="text-orange-100 text-xs mt-0.5">Brokerage commissions, TI work, warranty items, etc.</p>
          </div>
          <div className="p-6">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSubItem}
                onChange={e => setNewSubItem(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSubItem()}
                placeholder="Add task (e.g. LL Broker Commission, HVAC Install)..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold"
              />
              <button onClick={addSubItem}
                className="bg-gold text-navy px-4 py-2 rounded font-semibold text-sm hover:bg-opacity-90 transition">
                Add
              </button>
            </div>

            {subItems.length > 0 && (
              <div className="divide-y divide-gray-100">
                {subItems.map(item => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <div className="flex-1 text-sm text-navy font-medium">{item.label}</div>
                    <select
                      value={item.status}
                      onChange={e => updateSubItem(item.id, 'status', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-gold"
                    >
                      <option value="pending">Pending</option>
                      <option value="working">Working on it</option>
                      <option value="done">Done</option>
                      <option value="na">N/A</option>
                    </select>
                    <input
                      type="date"
                      value={item.date}
                      onChange={e => updateSubItem(item.id, 'date', e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-gold"
                    />
                    <input
                      type="text"
                      value={item.notes}
                      onChange={e => updateSubItem(item.id, 'notes', e.target.value)}
                      placeholder="Notes..."
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-gold"
                    />
                    <button
                      onClick={() => setSubItems(prev => prev.filter(i => i.id !== item.id))}
                      className="text-gray-400 hover:text-red-500 text-lg leading-none"
                    >×</button>
                  </div>
                ))}
              </div>
            )}

            {subItems.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-4">No special tasks added yet</p>
            )}
          </div>
        </div>

        {/* Save / Print */}
        <div className="flex gap-4 justify-end print:hidden">
          <button
            onClick={handlePrint}
            className="bg-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-rust-orange transition"
          >
            🖨 Print / Save PDF
          </button>
        </div>

      </div>
    </div>
  );
}
