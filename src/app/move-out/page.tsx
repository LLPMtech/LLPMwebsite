'use client';

import { useState } from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  category: string;
  required: boolean;
  options?: string[];
  note?: string;
}

const checklistItems: ChecklistItem[] = [
  // Notice
  { id: 'notice_received', label: 'Notice Received from Tenant', category: 'Notice & Admin', required: true },
  { id: 'notice_date', label: 'Notice Date Logged', category: 'Notice & Admin', required: true },
  { id: 'move_out_date_confirmed', label: 'Move-Out Date Confirmed per Lease', category: 'Notice & Admin', required: true },
  { id: 'forwarding_address', label: 'Forwarding Address Collected from Tenant', category: 'Notice & Admin', required: true, note: 'Required if security deposit is being returned' },

  // HVAC
  { id: 'hvac_inspection_requested', label: 'HVAC Inspection Requested from Tenant', category: 'HVAC', required: true, note: 'Per lease — tenant is responsible for HVAC inspection' },
  { id: 'hvac_report_received', label: 'HVAC Inspection Report Received', category: 'HVAC', required: true },
  { id: 'hvac_report_reviewed', label: 'HVAC Report Reviewed', category: 'HVAC', required: true },

  // Walk-Through
  { id: 'walkthrough_scheduled', label: 'Final Walk-Through Scheduled', category: 'Final Walk-Through', required: true },
  { id: 'walkthrough_completed', label: 'Final Walk-Through Completed', category: 'Final Walk-Through', required: true },
  { id: 'walkthrough_notes', label: 'Walk-Through Notes / Damages Documented', category: 'Final Walk-Through', required: true, options: ['None — Clean', 'Minor Issues Noted', 'Damages Noted'] },
  { id: 'keys_returned', label: 'Keys / Access Cards Returned', category: 'Final Walk-Through', required: true },

  // Security Deposit
  { id: 'deposit_decision', label: 'Security Deposit Decision', category: 'Security Deposit', required: true, options: ['Full Return', 'Partial Return — Deductions Applied', 'No Return — Applied to Damages', 'N/A'] },
  { id: 'deposit_forwarding', label: 'Forwarding Address Verified for Deposit Return', category: 'Security Deposit', required: false },
  { id: 'deposit_processed', label: 'Security Deposit Processed', category: 'Security Deposit', required: true, options: ['Done', 'Pending', 'N/A'] },

  // File & Records
  { id: 'folder_pulled', label: 'Tenant Folder Pulled from Filing Cabinet', category: 'File & Records', required: true },
  { id: 'papers_paperclipped', label: 'All Papers Removed & Paperclipped', category: 'File & Records', required: true },
  { id: 'checklist_on_top', label: 'Move-Out Checklist Placed on Top of File', category: 'File & Records', required: true },
  { id: 'given_to_trey', label: 'File Given to Trey for Yardi Move-Out', category: 'File & Records', required: true },

  // Yardi
  { id: 'yardi_moveout', label: 'Move-Out Processed in Yardi (Trey)', category: 'Yardi', required: true },
  { id: 'yardi_verified', label: 'Yardi Move-Out Verified / Confirmed', category: 'Yardi', required: true },

  // Re-Leasing
  { id: 'unit_listed', label: 'Unit Listed on LoopNet / Available Properties', category: 'Re-Leasing', required: true },
  { id: 'website_updated', label: 'Website Updated — Unit Marked Available', category: 'Re-Leasing', required: true },
];

const categories = [...new Set(checklistItems.map(i => i.category))];

type StatusValue = 'pending' | 'done' | 'na' | string;

export default function MoveOutPage() {
  const [tenantName, setTenantName] = useState('');
  const [property, setProperty] = useState('');
  const [suite, setSuite] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  const [forwardingAddress, setForwardingAddress] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [statuses, setStatuses] = useState<Record<string, StatusValue>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const setStatus = (id: string, value: StatusValue) => setStatuses(prev => ({ ...prev, [id]: value }));
  const setNote = (id: string, value: string) => setNotes(prev => ({ ...prev, [id]: value }));

  const completedCount = checklistItems.filter(i =>
    statuses[i.id] === 'done' || statuses[i.id] === 'na' ||
    (i.options && statuses[i.id] && statuses[i.id] !== 'pending')
  ).length;
  const progress = Math.round((completedCount / checklistItems.length) * 100);

  const categoryColors: Record<string, string> = {
    'Notice & Admin': 'bg-navy',
    'HVAC': 'bg-rust-orange',
    'Final Walk-Through': 'bg-navy',
    'Security Deposit': 'bg-rust-orange',
    'File & Records': 'bg-navy',
    'Yardi': 'bg-rust-orange',
    'Re-Leasing': 'bg-navy',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-rust-orange text-white py-10 print:py-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-1">Tenant Move-Out Checklist</h1>
              <p className="text-orange-100 text-sm">Life Long Property Management · Internal Use Only</p>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-white text-rust-orange px-4 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-90 transition print:hidden"
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
              <label className="block text-xs font-medium text-gray-500 mb-1">Notice Date</label>
              <input type="date" value={noticeDate} onChange={e => setNoticeDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Move-Out Date</label>
              <input type="date" value={moveOutDate} onChange={e => setMoveOutDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Assigned To</label>
              <input type="text" value={assignedTo} onChange={e => setAssignedTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold"
                placeholder="e.g. Norman / Lindsey" />
            </div>
          </div>

          {/* Forwarding Address — prominent */}
          <div className="mt-4 p-4 bg-gold bg-opacity-10 border border-gold rounded-lg">
            <label className="block text-sm font-bold text-navy mb-2">
              📬 Tenant Forwarding Address
              <span className="text-rust-orange ml-1 font-normal text-xs">(Collect before move-out if returning security deposit)</span>
            </label>
            <input type="text" value={forwardingAddress} onChange={e => setForwardingAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold"
              placeholder="Full mailing address for security deposit return" />
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
              className="bg-rust-orange h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist by Category */}
        {categories.map(category => (
          <div key={category} className="bg-white rounded-lg shadow mb-4 overflow-hidden">
            <div className={`${categoryColors[category] || 'bg-navy'} px-6 py-3`}>
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
                      {item.note && (
                        <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>
                      )}
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

        {/* Print Button */}
        <div className="flex justify-end print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-rust-orange text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            🖨 Print / Save PDF
          </button>
        </div>

      </div>
    </div>
  );
}
