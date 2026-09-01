'use client';

import { useState, useRef } from 'react';

type Rating = 'Good' | 'Fair' | 'Poor' | 'N/A' | '';

interface InspectionItem {
  id: string;
  label: string;
  category: string;
}

const items: InspectionItem[] = [
  // Exterior
  { id: 'ext_facade', label: 'Building Facade / Exterior Walls', category: 'Exterior' },
  { id: 'ext_roof', label: 'Roof / Gutters / Drainage', category: 'Exterior' },
  { id: 'ext_windows', label: 'Windows & Doors', category: 'Exterior' },
  { id: 'ext_signage', label: 'Signage', category: 'Exterior' },
  { id: 'ext_lighting', label: 'Exterior Lighting', category: 'Exterior' },
  { id: 'ext_parking', label: 'Parking Lot / Pavement', category: 'Exterior' },
  { id: 'ext_landscaping', label: 'Landscaping / Grounds', category: 'Exterior' },
  { id: 'ext_trash', label: 'Trash / Dumpster Area', category: 'Exterior' },
  { id: 'ext_fence', label: 'Fencing / Security', category: 'Exterior' },
  // Common Areas
  { id: 'com_hallways', label: 'Hallways / Common Areas', category: 'Common Areas' },
  { id: 'com_restrooms', label: 'Common Restrooms', category: 'Common Areas' },
  { id: 'com_elevators', label: 'Elevators / Stairs', category: 'Common Areas' },
  { id: 'com_hvac', label: 'HVAC / Mechanical Rooms', category: 'Common Areas' },
  // Utilities & Systems
  { id: 'sys_electric', label: 'Electrical / Panels', category: 'Utilities & Systems' },
  { id: 'sys_plumbing', label: 'Plumbing / Water', category: 'Utilities & Systems' },
  { id: 'sys_hvac', label: 'HVAC Units / Condition', category: 'Utilities & Systems' },
  { id: 'sys_fire', label: 'Fire Suppression / Alarms', category: 'Utilities & Systems' },
  { id: 'sys_security', label: 'Security Systems / Cameras', category: 'Utilities & Systems' },
  // Vacant Units
  { id: 'vac_condition', label: 'Vacant Unit Condition', category: 'Vacant Spaces' },
  { id: 'vac_ready', label: 'Move-In Ready Status', category: 'Vacant Spaces' },
  { id: 'vac_cleanup', label: 'Cleanup / Debris Needed', category: 'Vacant Spaces' },
  // Overall
  { id: 'ov_curb', label: 'Overall Curb Appeal', category: 'Overall' },
  { id: 'ov_safety', label: 'Safety / Liability Concerns', category: 'Overall' },
  { id: 'ov_deferred', label: 'Deferred Maintenance Observed', category: 'Overall' },
];

const categories = [...new Set(items.map(i => i.category))];

const ratingColors: Record<string, string> = {
  'Good': 'bg-green-500 text-white',
  'Fair': 'bg-yellow-400 text-navy',
  'Poor': 'bg-red-500 text-white',
  'N/A': 'bg-gray-300 text-gray-600',
};

export default function InspectionPage() {
  const [property, setProperty] = useState('');
  const [address, setAddress] = useState('');
  const [inspector, setInspector] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tenanted, setTenanted] = useState('');
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [overallNotes, setOverallNotes] = useState('');
  const [actionItems, setActionItems] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const setRating = (id: string, val: Rating) =>
    setRatings(prev => ({ ...prev, [id]: val }));
  const setNote = (id: string, val: string) =>
    setNotes(prev => ({ ...prev, [id]: val }));

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setPhotos(prev => [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const goodCount = items.filter(i => ratings[i.id] === 'Good').length;
  const fairCount = items.filter(i => ratings[i.id] === 'Fair').length;
  const poorCount = items.filter(i => ratings[i.id] === 'Poor').length;
  const ratedCount = items.filter(i => ratings[i.id] && ratings[i.id] !== 'N/A').length;

  const generate = async () => {
    const logoRes = await fetch('/api/logo');
    const { logo } = await logoRes.json();

    const ratingBadge = (r: Rating) => {
      if (!r) return '<span style="color:#9CA3AF;font-size:7px;">—</span>';
      const colors: Record<string, string> = {
        Good: 'background:#16a34a;color:white',
        Fair: 'background:#F5A623;color:#1F3A5F',
        Poor: 'background:#dc2626;color:white',
        'N/A': 'background:#D1D5DB;color:#4B5563',
      };
      return `<span style="font-size:7px;font-weight:bold;padding:2px 6px;border-radius:2px;${colors[r] || ''}">${r}</span>`;
    };

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
* { margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important; }
body { font-family:Arial,sans-serif;background:white; }
.header { background:#1F3A5F !important;padding:12px 20px;display:flex;align-items:center;gap:14px; }
.header img { height:60px;width:auto; }
.title { color:white;font-size:18px;font-weight:bold; }
.subtitle { color:#F5A623;font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px; }
.meta { display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px 20px;background:#F4F5F7 !important;border-bottom:2px solid #1F3A5F; }
.meta-item label { font-size:6.5px;font-weight:bold;color:#C85A17;text-transform:uppercase;display:block;margin-bottom:2px; }
.meta-item span { font-size:9px;font-weight:bold;color:#1F3A5F; }
.summary { display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid #D1D5DB; }
.sum-box { padding:8px;text-align:center;border-right:1px solid #D1D5DB; }
.sum-box:last-child { border-right:none; }
.sum-num { font-size:20px;font-weight:bold; }
.sum-label { font-size:6.5px;text-transform:uppercase;color:#4B5563;margin-top:2px; }
.body { padding:10px 20px; }
.cat-title { background:#1F3A5F !important;color:white !important;font-size:8px;font-weight:bold;padding:4px 8px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:0; }
table { width:100%;border-collapse:collapse;margin-bottom:10px;font-size:8px; }
tr:nth-child(even) td { background:#F4F5F7 !important; }
td { padding:4px 8px;border:0.5px solid #D1D5DB; }
td:first-child { color:#1F3A5F;font-weight:bold;width:35%; }
td:nth-child(2) { width:12%;text-align:center; }
td:last-child { color:#4B5563;font-size:7.5px; }
.notes-box { border:1px solid #D1D5DB;border-radius:3px;padding:8px;margin-bottom:8px;min-height:60px;font-size:8px;color:#4B5563; }
.photos { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px; }
.photos img { width:100%;height:120px;object-fit:cover;border-radius:3px;border:0.5px solid #D1D5DB; }
.footer { background:#111827 !important;padding:8px 20px;display:flex;justify-content:space-between;align-items:center; }
.footer-text { color:#9CA3AF;font-size:7px; }
.sig-row { display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:10px; }
.sig-box { border-top:1px solid #1F3A5F;padding-top:4px;font-size:7px;color:#4B5563; }
@media print { @page { size:letter;margin:0.4in; } }
</style></head><body>

<div class="header">
  <img src="${logo}" />
  <div>
    <div class="subtitle">Property Inspection Report</div>
    <div class="title">${property || '[Property Name]'}</div>
    <div style="color:#D1D5DB;font-size:8px;margin-top:2px;">${address || '[Address]'}</div>
  </div>
</div>

<div class="meta">
  <div class="meta-item"><label>Inspector</label><span>${inspector || '—'}</span></div>
  <div class="meta-item"><label>Inspection Date</label><span>${date}</span></div>
  <div class="meta-item"><label>Occupancy Status</label><span>${tenanted || '—'}</span></div>
</div>

<div class="summary">
  <div class="sum-box"><div class="sum-num" style="color:#16a34a">${goodCount}</div><div class="sum-label">Good</div></div>
  <div class="sum-box"><div class="sum-num" style="color:#F5A623">${fairCount}</div><div class="sum-label">Fair</div></div>
  <div class="sum-box"><div class="sum-num" style="color:#dc2626">${poorCount}</div><div class="sum-label">Poor</div></div>
  <div class="sum-box"><div class="sum-num" style="color:#1F3A5F">${ratedCount}</div><div class="sum-label">Items Rated</div></div>
</div>

<div class="body">
${categories.map(cat => `
  <div class="cat-title">${cat}</div>
  <table>
    ${items.filter(i => i.category === cat).map(item => `
    <tr>
      <td>${item.label}</td>
      <td>${ratingBadge(ratings[item.id] || '')}</td>
      <td>${notes[item.id] || ''}</td>
    </tr>`).join('')}
  </table>`).join('')}

  <div style="font-size:8.5px;font-weight:bold;color:#1F3A5F;margin-bottom:4px;text-transform:uppercase;">Overall Notes & Observations</div>
  <div class="notes-box">${overallNotes || '&nbsp;'}</div>

  <div style="font-size:8.5px;font-weight:bold;color:#C85A17;margin-bottom:4px;text-transform:uppercase;">Action Items / Follow-Up Required</div>
  <div class="notes-box">${actionItems || '&nbsp;'}</div>

  ${photos.length > 0 ? `
  <div style="font-size:8.5px;font-weight:bold;color:#1F3A5F;margin-bottom:6px;text-transform:uppercase;">Photos (${photos.length})</div>
  <div class="photos">
    ${photos.map(p => `<img src="${p}" />`).join('')}
  </div>` : ''}

  <div class="sig-row">
    <div class="sig-box">Inspector Signature: _____________________________ &nbsp;&nbsp; Date: ____________</div>
    <div class="sig-box">Reviewed By: _____________________________ &nbsp;&nbsp; Date: ____________</div>
  </div>
</div>

<div class="footer">
  <span class="footer-text">Life Long Property Management  ·  Property Inspection Report  ·  ${date}</span>
  <span class="footer-text">lifelongpropertymanagement.com</span>
</div>

</body></html>`;

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => { win.print(); }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-1">Property Inspection Form</h1>
          <p className="text-gray-300 text-sm">Fill in, rate each item, add notes and photos, then generate a PDF report.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-6">

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">Property Info</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Property Name *</label>
                  <input value={property} onChange={e => setProperty(e.target.value)}
                    placeholder="Oak Acres Shopping Center"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                  <input value={address} onChange={e => setAddress(e.target.value)}
                    placeholder="5716 Hwy 290 West, Austin, TX 78735"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Inspector</label>
                  <input value={inspector} onChange={e => setInspector(e.target.value)}
                    placeholder="Lindsey Williams"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Occupancy Status</label>
                  <select value={tenanted} onChange={e => setTenanted(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold">
                    <option value="">Select...</option>
                    <option>Fully Occupied</option>
                    <option>Partially Occupied</option>
                    <option>Vacant</option>
                    <option>Mixed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Inspection Items */}
            {categories.map(cat => (
              <div key={cat} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-navy px-6 py-3">
                  <h2 className="text-white font-bold">{cat}</h2>
                </div>
                <div className="divide-y divide-gray-100">
                  {items.filter(i => i.category === cat).map(item => (
                    <div key={item.id} className="px-6 py-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-navy">{item.label}</label>
                        <div className="flex gap-2">
                          {(['Good', 'Fair', 'Poor', 'N/A'] as Rating[]).map(r => (
                            <button key={r} onClick={() => setRating(item.id, r)}
                              className={`px-2 py-1 rounded text-xs font-bold transition ${
                                ratings[item.id] === r
                                  ? ratingColors[r]
                                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              }`}>
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>
                      <input value={notes[item.id] || ''} onChange={e => setNote(item.id, e.target.value)}
                        placeholder="Notes (optional)..."
                        className="w-full px-3 py-1 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-gold" />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Overall Notes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">Overall Notes & Observations</h2>
              <textarea value={overallNotes} onChange={e => setOverallNotes(e.target.value)}
                rows={4} placeholder="General observations about the property condition, tenant activity, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />

              <h2 className="font-bold text-rust-orange mt-4 mb-2">Action Items / Follow-Up Required</h2>
              <textarea value={actionItems} onChange={e => setActionItems(e.target.value)}
                rows={4} placeholder="List any maintenance issues, repairs needed, or follow-up actions..."
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
            </div>

            {/* Photos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">📸 Photos ({photos.length})</h2>
              <button onClick={() => fileRef.current?.click()}
                className="w-full h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:border-gold transition text-sm mb-4">
                + Upload Photos (select multiple)
              </button>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((p, i) => (
                    <div key={i} className="relative">
                      <img src={p} className="w-full h-24 object-cover rounded" alt={`Photo ${i+1}`} />
                      <button onClick={() => setPhotos(prev => prev.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24 self-start">
            {/* Score */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">Inspection Summary</h2>
              <div className="grid grid-cols-3 gap-3 text-center mb-4">
                <div className="bg-green-50 rounded p-3">
                  <div className="text-2xl font-bold text-green-600">{goodCount}</div>
                  <div className="text-xs text-gray-500">Good</div>
                </div>
                <div className="bg-yellow-50 rounded p-3">
                  <div className="text-2xl font-bold text-yellow-500">{fairCount}</div>
                  <div className="text-xs text-gray-500">Fair</div>
                </div>
                <div className="bg-red-50 rounded p-3">
                  <div className="text-2xl font-bold text-red-500">{poorCount}</div>
                  <div className="text-xs text-gray-500">Poor</div>
                </div>
              </div>
              <div className="text-xs text-gray-400 text-center">{ratedCount} of {items.length} items rated</div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 text-xs text-gray-700 mb-4 space-y-1">
                <p className="font-bold text-yellow-800">⚠️ Print settings:</p>
                <p>• Check <strong>"Background graphics"</strong></p>
                <p>• Margins: <strong>Default or 0.4in</strong></p>
                <p>• Destination: <strong>Save as PDF</strong></p>
              </div>
              <button onClick={generate}
                className="w-full bg-gold text-navy py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                📋 Generate Inspection PDF
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
