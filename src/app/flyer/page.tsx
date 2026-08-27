'use client';

import { useState, useRef } from 'react';

const FIELDS = [
  { id: 'propertyName', label: 'Property Name', placeholder: 'e.g. Oak Acres Shopping Center', required: true },
  { id: 'address', label: 'Street Address', placeholder: '5716 Hwy 290 West', required: true },
  { id: 'city', label: 'City', placeholder: 'Austin', required: true },
  { id: 'zip', label: 'ZIP Code', placeholder: '78735', required: true },
  { id: 'status', label: 'Status', placeholder: '', required: true, type: 'select', options: ['For Lease', 'For Sale', 'For Lease | For Sale', 'For Lease | Build-to-Suit'] },
  { id: 'size', label: 'Available Space', placeholder: '5,000 SF', required: true },
  { id: 'zoning', label: 'Zoning', placeholder: 'C-1', required: false },
  { id: 'leaseType', label: 'Lease Type', placeholder: 'NNN', required: false },
  { id: 'askingRate', label: 'Asking Rate', placeholder: '$18.00 PSF/Year', required: false },
  { id: 'traffic', label: 'Traffic Count (VPD)', placeholder: '26,000', required: false },
  { id: 'county', label: 'County', placeholder: 'Travis County', required: false },
  { id: 'yearBuilt', label: 'Year Built', placeholder: '2005', required: false },
  { id: 'suites', label: 'Suite Options', placeholder: 'Suite A: 1,200 SF · Suite B: 2,400 SF', required: false },
  { id: 'parking', label: 'Parking', placeholder: '45 spaces / 4.5 per 1,000 SF', required: false },
  { id: 'roadFrontage', label: 'Road Frontage', placeholder: 'Hwy 290 West', required: false },
  { id: 'permittedUse', label: 'Permitted Use', placeholder: 'Retail, Office, Medical, Restaurant', required: false },
  { id: 'utilities', label: 'Utilities', placeholder: 'Water, Sewer, Electric — Available', required: false },
  { id: 'highlights', label: 'Property Highlights', placeholder: 'One highlight per line', required: false, type: 'textarea' },
  { id: 'contactName', label: 'Contact Name', placeholder: 'Norman Phillips', required: true },
  { id: 'contactTitle', label: 'Contact Title', placeholder: 'Property Manager', required: false },
  { id: 'contactPhone', label: 'Contact Phone', placeholder: '(512) 543-4686', required: false },
  { id: 'contactEmail', label: 'Contact Email', placeholder: 'norman@hawkinsfamilypartners.com', required: false },
];

type FormData = Record<string, string>;

export default function FlyerPage() {
  const [form, setForm] = useState<FormData>({
    status: 'For Lease',
    contactPhone: '(512) 892-6001',
    contactEmail: 'pm@lifelongpm.com',
    utilities: 'Water, Sewer, Electric — Available at site',
    permittedUse: 'Retail, Office, Medical, Flex, Warehouse',
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const [photo2, setPhoto2] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const file2Ref = useRef<HTMLInputElement>(null);

  const handleChange = (id: string, val: string) => setForm(prev => ({ ...prev, [id]: val }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>, setFn: (s: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setFn(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const generatePDF = async () => {
    setGenerating(true);

    const highlights = (form.highlights || '').split('\n').filter(Boolean);

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Arial, sans-serif; width: 8.5in; background: white; }
  .header { background: #1F3A5F; padding: 14px 20px; display: flex; align-items: center; gap: 16px; }
  .header img { height: 60px; width: auto; }
  .header-text { flex: 1; }
  .header-label { color: #F5A623; font-size: 9px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; }
  .header-name { color: white; font-size: 22px; font-weight: bold; line-height: 1.2; margin: 2px 0; }
  .header-address { color: #D1D5DB; font-size: 9px; }
  .header-badge { background: #C85A17; color: white; font-size: 8px; font-weight: bold; padding: 4px 12px; border-radius: 2px; white-space: nowrap; }
  .photo { width: 100%; height: 280px; object-fit: cover; display: block; background: #D1D5DB; }
  .photo-placeholder { width: 100%; height: 280px; background: #D1D5DB; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 14px; }
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); }
  .stat { padding: 10px 8px; text-align: center; }
  .stat:nth-child(odd) { background: #1F3A5F; }
  .stat:nth-child(even) { background: #C85A17; }
  .stat-val { color: white; font-size: 14px; font-weight: bold; }
  .stat-label { color: #F5A623; font-size: 7px; text-transform: uppercase; margin-top: 2px; }
  .body { padding: 14px 20px; }
  .section-title { font-size: 9px; font-weight: bold; color: #1F3A5F; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: 8.5px; }
  tr:nth-child(odd) td { background: #F4F5F7; }
  tr:nth-child(even) td { background: white; }
  td { padding: 5px 8px; }
  td:first-child { font-weight: bold; color: #1F3A5F; width: 32%; }
  td:last-child { color: #4B5563; }
  .highlights { margin-bottom: 14px; }
  .highlight { display: flex; gap: 8px; margin-bottom: 5px; align-items: flex-start; font-size: 8.5px; color: #4B5563; }
  .highlight-dot { width: 6px; height: 6px; background: #F5A623; border-radius: 50%; margin-top: 3px; flex-shrink: 0; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .photo2 { width: 100%; height: 160px; object-fit: cover; display: block; background: #D1D5DB; border-radius: 4px; }
  .photo2-placeholder { width: 100%; height: 160px; background: #D1D5DB; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-size: 11px; border-radius: 4px; }
  .footer { background: #111827; padding: 10px 20px; display: flex; align-items: center; gap: 14px; }
  .footer img { height: 40px; width: auto; }
  .footer-contact { flex: 1; }
  .footer-name { color: white; font-size: 9px; font-weight: bold; }
  .footer-info { color: #9CA3AF; font-size: 7.5px; margin-top: 1px; }
  .footer-web { color: #9CA3AF; font-size: 7px; text-align: right; }
  .disclaimer { font-size: 6px; color: #9CA3AF; padding: 6px 20px; border-top: 0.5px solid #374151; background: #111827; }
</style>
</head>
<body>

<div class="header">
  <img src="/logo.png" />
  <div class="header-text">
    <div class="header-label">Available — ${form.status || 'For Lease'}</div>
    <div class="header-name">${form.propertyName || '[Property Name]'}</div>
    <div class="header-address">${form.address || ''} · ${form.city || ''}, TX ${form.zip || ''}</div>
  </div>
  <div class="header-badge">${form.status || 'FOR LEASE'}</div>
</div>

${photo
  ? `<img class="photo" src="${photo}" />`
  : `<div class="photo-placeholder">[ Insert Primary Property Photo ]</div>`
}

<div class="stats">
  <div class="stat"><div class="stat-val">${form.size || '—'}</div><div class="stat-label">Available Space</div></div>
  <div class="stat"><div class="stat-val">${form.zoning || '—'}</div><div class="stat-label">Zoning</div></div>
  <div class="stat"><div class="stat-val">${form.leaseType || '—'}</div><div class="stat-label">Lease Type</div></div>
  <div class="stat"><div class="stat-val">${form.askingRate || '—'}</div><div class="stat-label">Asking Rate</div></div>
</div>

<div class="body">

  ${highlights.length > 0 ? `
  <div class="section-title">Property Highlights</div>
  <div class="highlights">
    ${highlights.map(h => `<div class="highlight"><div class="highlight-dot"></div><span>${h}</span></div>`).join('')}
  </div>
  ` : ''}

  <div class="two-col">
    <div>
      <div class="section-title">Property Details</div>
      <table>
        ${form.address ? `<tr><td>Site Address</td><td>${form.address}, ${form.city}, TX ${form.zip}</td></tr>` : ''}
        ${form.county ? `<tr><td>County</td><td>${form.county}</td></tr>` : ''}
        ${form.size ? `<tr><td>Total Size</td><td>${form.size}</td></tr>` : ''}
        ${form.suites ? `<tr><td>Suite Options</td><td>${form.suites}</td></tr>` : ''}
        ${form.yearBuilt ? `<tr><td>Year Built</td><td>${form.yearBuilt}</td></tr>` : ''}
        ${form.zoning ? `<tr><td>Zoning</td><td>${form.zoning}</td></tr>` : ''}
        ${form.permittedUse ? `<tr><td>Permitted Use</td><td>${form.permittedUse}</td></tr>` : ''}
        ${form.parking ? `<tr><td>Parking</td><td>${form.parking}</td></tr>` : ''}
        ${form.roadFrontage ? `<tr><td>Road Frontage</td><td>${form.roadFrontage}</td></tr>` : ''}
        ${form.traffic ? `<tr><td>Traffic Count</td><td>${form.traffic} VPD</td></tr>` : ''}
        ${form.utilities ? `<tr><td>Utilities</td><td>${form.utilities}</td></tr>` : ''}
        ${form.leaseType ? `<tr><td>Lease Type</td><td>${form.leaseType}</td></tr>` : ''}
        ${form.askingRate ? `<tr><td>Asking Rate</td><td>${form.askingRate}</td></tr>` : ''}
      </table>
    </div>
    <div>
      ${photo2
        ? `<img class="photo2" src="${photo2}" />`
        : `<div class="photo2-placeholder">[ Insert Secondary Photo ]</div>`
      }
    </div>
  </div>

</div>

<div class="footer">
  <img src="/logo.png" />
  <div class="footer-contact">
    <div class="footer-name">${form.contactName || 'Life Long Property Management'} ${form.contactTitle ? '· ' + form.contactTitle : ''}</div>
    <div class="footer-info">${[form.contactPhone, form.contactEmail].filter(Boolean).join('  ·  ')}</div>
  </div>
  <div class="footer-web">lifelongpropertymanagement.com</div>
</div>
<div class="disclaimer">The information contained herein has been obtained from sources deemed reliable. While we do not doubt its accuracy, we have not verified it and make no guarantee, warranty, or representation about it. ©2026 Life Long Property Management. All rights reserved.</div>

</body>
</html>`;

    // Open print dialog in a new window
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => {
        win.print();
        setGenerating(false);
      }, 800);
    } else {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-1">Property Flyer Generator</h1>
          <p className="text-gray-300 text-sm">Fill in the details below and click Generate — no PowerPoint needed.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Form */}
          <div className="space-y-4">

            {/* Photos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">Property Photos</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Primary Photo (main image)</label>
                  {photo ? (
                    <div className="relative">
                      <img src={photo} alt="Primary" className="w-full h-32 object-cover rounded" />
                      <button onClick={() => setPhoto(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">×</button>
                    </div>
                  ) : (
                    <button onClick={() => fileRef.current?.click()}
                      className="w-full h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-gold transition text-sm">
                      + Upload Primary Photo
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handlePhoto(e, setPhoto)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-2">Secondary Photo (optional)</label>
                  {photo2 ? (
                    <div className="relative">
                      <img src={photo2} alt="Secondary" className="w-full h-24 object-cover rounded" />
                      <button onClick={() => setPhoto2(null)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">×</button>
                    </div>
                  ) : (
                    <button onClick={() => file2Ref.current?.click()}
                      className="w-full h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-gold transition text-sm">
                      + Upload Secondary Photo
                    </button>
                  )}
                  <input ref={file2Ref} type="file" accept="image/*" className="hidden" onChange={e => handlePhoto(e, setPhoto2)} />
                </div>
              </div>
            </div>

            {/* Fields grouped */}
            {[
              { title: 'Property Info', fields: FIELDS.slice(0, 4) },
              { title: 'Lease Details', fields: FIELDS.slice(4, 10) },
              { title: 'Site Details', fields: FIELDS.slice(10, 17) },
              { title: 'Highlights', fields: FIELDS.slice(17, 18) },
              { title: 'Contact Info', fields: FIELDS.slice(18) },
            ].map(group => (
              <div key={group.title} className="bg-white rounded-lg shadow p-6">
                <h2 className="font-bold text-navy mb-4">{group.title}</h2>
                <div className="space-y-3">
                  {group.fields.map(f => (
                    <div key={f.id}>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        {f.label}{f.required && <span className="text-rust-orange ml-1">*</span>}
                      </label>
                      {f.type === 'select' ? (
                        <select value={form[f.id] || ''} onChange={e => handleChange(f.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold focus:border-transparent">
                          {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : f.type === 'textarea' ? (
                        <textarea value={form[f.id] || ''} onChange={e => handleChange(f.id, e.target.value)}
                          rows={4} placeholder={f.placeholder}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold focus:border-transparent"
                        />
                      ) : (
                        <input type="text" value={form[f.id] || ''} onChange={e => handleChange(f.id, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold focus:border-transparent" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Preview + Generate */}
          <div className="lg:sticky lg:top-24 space-y-4 self-start">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-2">Ready to Generate?</h2>
              <p className="text-gray-500 text-sm mb-4">
                Fill in the fields on the left, then click the button below. A print dialog will open — choose <strong>Save as PDF</strong> to download your flyer.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded p-3 text-xs text-gray-600 mb-4">
                <strong>Tips:</strong>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>Only required fields (*) are needed to generate</li>
                  <li>Enter one highlight per line in the Highlights box</li>
                  <li>In the print dialog, set paper size to Letter, margins to None</li>
                  <li>Check "Background graphics" in print settings for colors</li>
                </ul>
              </div>
              <button
                onClick={generatePDF}
                disabled={generating}
                className="w-full bg-gold text-navy py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition disabled:opacity-50"
              >
                {generating ? 'Generating...' : '📄 Generate Flyer PDF'}
              </button>
            </div>

            {/* Live mini preview */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Preview</h3>
              <div className="border border-gray-200 rounded overflow-hidden text-xs">
                <div className="bg-navy p-3 flex items-center gap-2">
                  <div className="text-white">
                    <div className="text-gold text-xs font-bold">{form.status || 'FOR LEASE'}</div>
                    <div className="font-bold text-sm">{form.propertyName || '[Property Name]'}</div>
                    <div className="text-gray-300 text-xs">{form.address || '[Address]'} · {form.city || '[City]'}, TX</div>
                  </div>
                </div>
                <div className="bg-gray-200 h-16 flex items-center justify-center text-gray-400 text-xs">
                  {photo ? <img src={photo} className="w-full h-16 object-cover" alt="" /> : '[ Photo ]'}
                </div>
                <div className="grid grid-cols-4">
                  {[form.size, form.zoning, form.leaseType, form.askingRate].map((v, i) => (
                    <div key={i} className={`p-1 text-center ${i % 2 === 0 ? 'bg-navy' : 'bg-rust-orange'}`}>
                      <div className="text-white text-xs font-bold truncate">{v || '—'}</div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-gray-600 text-xs">
                  {form.highlights?.split('\n').filter(Boolean).slice(0, 2).map((h, i) => (
                    <div key={i} className="flex gap-1 items-start mb-0.5">
                      <span className="text-gold">•</span><span className="truncate">{h}</span>
                    </div>
                  ))}
                  {!form.highlights && <span className="text-gray-300">Highlights will appear here...</span>}
                </div>
                <div className="bg-gray-900 p-2 text-gray-400 text-xs">
                  {form.contactName || 'Contact Name'} · {form.contactPhone || '(512) 892-6001'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
