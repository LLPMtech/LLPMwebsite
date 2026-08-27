'use client';

import { useState, useRef } from 'react';

const WHY_OPTIONS = [
  'Ideal IOS / Outdoor Storage Configuration',
  'High-Growth Submarket',
  'Major Employer Proximity',
  'Highway Visibility & Access',
  'Low Through-Traffic / Private Road',
  'Managed Commercial Park',
  'Flexible Deal Structure',
  'Build-to-Suit Available',
  'Rare Availability',
  'Development Ready',
  'Signalized Intersection',
  'High Foot Traffic Location',
  'Custom / Other',
];

type FormData = Record<string, string>;

export default function Flyer5Page() {
  const [form, setForm] = useState<FormData>({
    status: 'For Lease',
    contactPhone: '(512) 892-6001',
    contactEmail: 'pm@lifelongpm.com',
    utilities: 'Water, Sewer, Electric — Available at site',
    permittedUse: 'Retail, Office, Medical, Flex, Warehouse',
  });
  const [aerial, setAerial] = useState<string | null>(null);
  const [exterior, setExterior] = useState<string | null>(null);
  const [mapPhoto, setMapPhoto] = useState<string | null>(null);
  const [why, setWhy] = useState([
    { option: '', body: '' },
    { option: '', body: '' },
    { option: '', body: '' },
    { option: '', body: '' },
  ]);
  const [driveTimes, setDriveTimes] = useState([
    { mins: '', dest: '' },
    { mins: '', dest: '' },
    { mins: '', dest: '' },
    { mins: '', dest: '' },
    { mins: '', dest: '' },
    { mins: '', dest: '' },
  ]);
  const [generating, setGenerating] = useState(false);

  const aerialRef = useRef<HTMLInputElement>(null);
  const exteriorRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLInputElement>(null);

  const set = (id: string, val: string) => setForm(p => ({ ...p, [id]: val }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>, setFn: (s: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setFn(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const updateWhy = (i: number, field: 'option' | 'body', val: string) => {
    setWhy(prev => prev.map((w, idx) => idx === i ? { ...w, [field]: val } : w));
  };

  const updateDrive = (i: number, field: 'mins' | 'dest', val: string) => {
    setDriveTimes(prev => prev.map((d, idx) => idx === i ? { ...d, [field]: val } : d));
  };

  const generate = () => {
    setGenerating(true);

    const highlights = (form.highlights || '').split('\n').filter(Boolean);
    const activeDrives = driveTimes.filter(d => d.mins && d.dest);
    const activeWhy = why.filter(w => w.option);

    const photoBox = (src: string | null, label: string, h = '280px') =>
      src
        ? `<img style="width:100%;height:${h};object-fit:cover;display:block;" src="${src}" />`
        : `<div style="width:100%;height:${h};background:#D1D5DB;display:flex;align-items:center;justify-content:center;color:#9CA3AF;font-size:13px;">[ ${label} ]</div>`;

    const header = (tabLabel: string) => `
      <div style="background:#1F3A5F;padding:10px 20px;display:flex;align-items:center;gap:14px;">
        <img src="/logo.png" style="height:48px;width:auto;" />
        <div style="flex:1;color:#9CA3AF;font-size:8px;text-align:center;font-weight:bold;">
          ${form.address || ''} · ${form.city || ''}, TX ${form.zip || ''}
        </div>
        <div style="background:#C85A17;color:white;font-size:7.5px;font-weight:bold;padding:5px 14px;border-radius:2px;">
          ${tabLabel.toUpperCase()}
        </div>
      </div>`;

    const footer = (page: number) => `
      <div style="background:#111827;padding:8px 20px;display:flex;align-items:center;gap:12px;">
        <div style="color:white;font-size:8px;font-weight:bold;flex:1;">
          ${form.contactName || 'Life Long Property Management'} · ${form.contactPhone || '(512) 892-6001'} · ${form.contactEmail || 'pm@lifelongpm.com'}
        </div>
        <div style="color:#6B7280;font-size:7px;">${page}/5</div>
      </div>`;

    const css = `
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family:Arial,sans-serif; background:white; }
      .page { width:10in; min-height:7.5in; page-break-after:always; display:flex; flex-direction:column; }
      .page:last-child { page-break-after:auto; }
      .body { padding:14px 20px; flex:1; }
      .section-title { font-size:8.5px;font-weight:bold;color:#1F3A5F;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px; }
      table { width:100%;border-collapse:collapse;font-size:8px; }
      tr:nth-child(odd) td { background:#F4F5F7; }
      td { padding:4px 8px; }
      td:first-child { font-weight:bold;color:#1F3A5F;width:32%; }
      td:last-child { color:#4B5563; }
      .two-col { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
      .three-col { display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px; }
      .badge { display:inline-block;background:#C85A17;color:white;font-size:7px;font-weight:bold;padding:3px 10px;border-radius:2px;margin-right:6px; }
    `;

    // PAGE 1 — COVER
    const p1 = `
      <div class="page">
        <div style="background:#1F3A5F;padding:16px 20px;display:flex;align-items:center;gap:16px;">
          <img src="/logo.png" style="height:64px;width:auto;" />
          <div style="flex:1;">
            <div style="color:#F5A623;font-size:8px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px;">Commercial Property — ${form.status || 'For Lease'}</div>
            <div style="color:white;font-size:26px;font-weight:bold;line-height:1.1;">${form.propertyName || '[Property Name]'}</div>
            <div style="color:#D1D5DB;font-size:9px;margin-top:3px;">${form.address || ''} · ${form.city || ''}, TX ${form.zip || ''}</div>
          </div>
          <div style="background:#C85A17;color:white;font-size:9px;font-weight:bold;padding:8px 16px;border-radius:2px;white-space:nowrap;">${(form.status || 'FOR LEASE').toUpperCase()}</div>
        </div>

        ${photoBox(aerial, 'Aerial Photo', '320px')}

        <div style="display:grid;grid-template-columns:repeat(4,1fr);">
          ${[
            { v: form.size || '—', l: 'Available Space' },
            { v: form.zoning || '—', l: 'Zoning' },
            { v: form.leaseType || '—', l: 'Lease Type' },
            { v: form.traffic ? form.traffic + ' VPD' : '—', l: 'Traffic Count' },
          ].map((s, i) => `
            <div style="background:${i % 2 === 0 ? '#1F3A5F' : '#C85A17'};padding:10px;text-align:center;">
              <div style="color:white;font-size:13px;font-weight:bold;">${s.v}</div>
              <div style="color:#F5A623;font-size:7px;text-transform:uppercase;margin-top:2px;">${s.l}</div>
            </div>`).join('')}
        </div>

        <div class="body" style="display:flex;gap:14px;align-items:flex-start;">
          <div style="flex:1;">
            <div class="section-title" style="margin-bottom:4px;">Property Description</div>
            <div style="font-size:8.5px;color:#4B5563;line-height:1.5;">${form.description || '[Brief property description — ideal use, key features, and location highlights.]'}</div>
            ${highlights.length > 0 ? `
            <div style="margin-top:10px;">
              ${highlights.map(h => `<div style="display:flex;gap:6px;margin-bottom:4px;font-size:8px;color:#4B5563;"><span style="color:#F5A623;font-weight:bold;">•</span>${h}</div>`).join('')}
            </div>` : ''}
          </div>
          <div style="width:45%;">
            ${photoBox(exterior, 'Exterior Photo', '160px')}
          </div>
        </div>

        <div style="display:flex;gap:6px;padding:0 20px 12px;">
          ${['Development Ready', 'Prime Location', 'High-Growth Corridor'].map(b =>
            `<div style="flex:1;background:#1F3A5F;color:white;text-align:center;padding:7px;font-size:7.5px;font-weight:bold;border-radius:2px;">${b}</div>`
          ).join('')}
        </div>

        ${footer(1)}
      </div>`;

    // PAGE 2 — PROPERTY OVERVIEW
    const p2 = `
      <div class="page">
        ${header('Property Overview')}
        <div style="padding:12px 20px 4px;">
          <span style="font-size:18px;font-weight:bold;color:#1F3A5F;">PROPERTY </span>
          <span style="font-size:18px;font-weight:bold;color:#C85A17;">OVERVIEW</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(5,1fr);padding:0 20px;gap:6px;margin-bottom:10px;">
          ${[
            { l: 'SIZE', v: form.size || '—', s: 'Total Space' },
            { l: 'ZONING', v: form.zoning || '—', s: 'District' },
            { l: 'LEASE TYPE', v: form.leaseType || '—', s: '' },
            { l: 'ASKING RATE', v: form.askingRate || '—', s: 'PSF/Year' },
            { l: 'STATUS', v: 'AVAILABLE', s: form.status || 'For Lease' },
          ].map(s => `
            <div style="border:0.5px solid #D1D5DB;padding:6px;border-radius:3px;text-align:center;">
              <div style="font-size:6.5px;font-weight:bold;color:#C85A17;text-transform:uppercase;margin-bottom:2px;">${s.l}</div>
              <div style="font-size:13px;font-weight:bold;color:#1F3A5F;">${s.v}</div>
              <div style="font-size:6px;color:#6B7280;">${s.s}</div>
            </div>`).join('')}
        </div>
        <div class="body">
          <div class="two-col">
            <div>
              ${photoBox(aerial || exterior, 'Property Photo', '200px')}
            </div>
            <div>
              <div class="section-title">Property Details</div>
              <table>
                ${form.address ? `<tr><td>Site Address</td><td>${form.address}, ${form.city}, TX ${form.zip}</td></tr>` : ''}
                ${form.county ? `<tr><td>County</td><td>${form.county}</td></tr>` : ''}
                ${form.size ? `<tr><td>Total Size</td><td>${form.size}</td></tr>` : ''}
                ${form.suites ? `<tr><td>Suite Options</td><td>${form.suites}</td></tr>` : ''}
                ${form.yearBuilt ? `<tr><td>Year Built</td><td>${form.yearBuilt}</td></tr>` : ''}
                ${form.parking ? `<tr><td>Parking</td><td>${form.parking}</td></tr>` : ''}
                ${form.leaseType ? `<tr><td>Lease Type</td><td>${form.leaseType}</td></tr>` : ''}
                ${form.askingRate ? `<tr><td>Asking Rate</td><td>${form.askingRate}</td></tr>` : ''}
              </table>
              <div style="margin-top:10px;background:#1F3A5F;padding:10px;border-radius:3px;">
                <div style="font-size:7.5px;color:white;line-height:1.5;">${form.description || '[Property description — ideal use and key features.]'}</div>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:6px;margin-top:10px;">
            ${(form.badges || 'IOS Ready,Prime Location,High-Growth').split(',').map(b =>
              `<div style="background:#C85A17;color:white;padding:5px 12px;font-size:7px;font-weight:bold;border-radius:2px;">${b.trim()}</div>`
            ).join('')}
          </div>
        </div>
        ${footer(2)}
      </div>`;

    // PAGE 3 — SITE DETAILS
    const p3 = `
      <div class="page">
        ${header('Site Details')}
        <div style="padding:12px 20px 4px;">
          <span style="font-size:18px;font-weight:bold;color:#1F3A5F;">SITE </span>
          <span style="font-size:18px;font-weight:bold;color:#C85A17;">DETAILS</span>
        </div>
        <div class="body">
          <div class="two-col">
            <div>
              <div style="margin-bottom:14px;">
                <div class="section-title">Space Information</div>
                <table>
                  ${form.size ? `<tr><td>Total Size</td><td>${form.size}</td></tr>` : ''}
                  ${form.suites ? `<tr><td>Suite Options</td><td>${form.suites}</td></tr>` : ''}
                  ${form.yearBuilt ? `<tr><td>Year Built</td><td>${form.yearBuilt}</td></tr>` : ''}
                </table>
              </div>
              <div style="margin-bottom:14px;">
                <div class="section-title">Zoning & Use</div>
                <table>
                  ${form.zoning ? `<tr><td>Zoning</td><td>${form.zoning}</td></tr>` : ''}
                  ${form.permittedUse ? `<tr><td>Permitted Use</td><td>${form.permittedUse}</td></tr>` : ''}
                  ${form.parking ? `<tr><td>Parking</td><td>${form.parking}</td></tr>` : ''}
                </table>
              </div>
              <div>
                <div class="section-title">Utilities</div>
                <table>
                  <tr><td>Water</td><td>Available</td></tr>
                  <tr><td>Sewer</td><td>Available</td></tr>
                  <tr><td>Electric</td><td>Available</td></tr>
                  ${form.gas ? `<tr><td>Gas</td><td>${form.gas}</td></tr>` : ''}
                </table>
              </div>
            </div>
            <div>
              <div style="background:#1F3A5F;padding:14px;border-radius:3px;margin-bottom:12px;">
                <div style="font-size:9px;font-weight:bold;color:white;margin-bottom:10px;">WHY THIS PROPERTY</div>
                ${activeWhy.length > 0 ? activeWhy.map(w => `
                  <div style="margin-bottom:10px;">
                    <div style="font-size:7.5px;font-weight:bold;color:#F5A623;margin-bottom:3px;">${w.option}</div>
                    <div style="font-size:7px;color:#D1D5DB;line-height:1.4;">${w.body || 'Description of this key selling point.'}</div>
                  </div>`).join('') :
                  `<div style="font-size:7px;color:#6B7280;">Add "Why This Property" points in the form.</div>`
                }
              </div>
              ${photoBox(exterior, 'Exterior Photo', '160px')}
            </div>
          </div>
        </div>
        ${footer(3)}
      </div>`;

    // PAGE 4 — LOCATION & ACCESS
    const p4 = `
      <div class="page">
        ${header('Location & Access')}
        <div style="padding:12px 20px 4px;">
          <span style="font-size:18px;font-weight:bold;color:#1F3A5F;">LOCATION & </span>
          <span style="font-size:18px;font-weight:bold;color:#C85A17;">ACCESS</span>
        </div>
        <div class="body">
          <div class="two-col">
            <div>
              ${photoBox(mapPhoto || aerial, 'Aerial / Location Map', '260px')}
            </div>
            <div>
              <div style="background:#1F3A5F;padding:12px;border-radius:3px;margin-bottom:12px;">
                <div style="font-size:9px;font-weight:bold;color:white;margin-bottom:8px;">ACCESS SUMMARY</div>
                ${form.primaryEntry ? `<div style="margin-bottom:6px;"><div style="color:#F5A623;font-size:7px;font-weight:bold;">PRIMARY ENTRY</div><div style="color:#D1D5DB;font-size:7px;line-height:1.4;">${form.primaryEntry}</div></div>` : ''}
                ${form.roadType ? `<div style="margin-bottom:6px;"><div style="color:#F5A623;font-size:7px;font-weight:bold;">ROAD TYPE</div><div style="color:#D1D5DB;font-size:7px;">${form.roadType}</div></div>` : ''}
                ${form.traffic ? `<div style="margin-bottom:6px;"><div style="color:#F5A623;font-size:7px;font-weight:bold;">TRAFFIC</div><div style="color:#D1D5DB;font-size:7px;">${form.traffic} VPD</div></div>` : ''}
                ${form.truckAccess ? `<div><div style="color:#F5A623;font-size:7px;font-weight:bold;">TRUCK / HEAVY VEHICLE</div><div style="color:#D1D5DB;font-size:7px;">${form.truckAccess}</div></div>` : ''}
              </div>
              ${activeDrives.length > 0 ? `
              <div class="section-title">Drive Times</div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px;">
                ${activeDrives.map(d => `
                  <div style="border:0.5px solid #D1D5DB;border-radius:3px;padding:8px;text-align:center;">
                    <div style="font-size:22px;font-weight:bold;color:#C85A17;line-height:1;">${d.mins}</div>
                    <div style="font-size:6px;font-weight:bold;color:#1F3A5F;text-transform:uppercase;margin-top:3px;">MIN TO</div>
                    <div style="font-size:7px;font-weight:bold;color:#1F3A5F;text-transform:uppercase;">${d.dest}</div>
                  </div>`).join('')}
              </div>` : ''}
            </div>
          </div>
        </div>
        ${footer(4)}
      </div>`;

    // PAGE 5 — BACK COVER
    const p5 = `
      <div class="page">
        ${photoBox(aerial, 'Aerial Photo', '320px')}
        <div style="background:#0A1929;padding:16px 30px;">
          <div style="font-size:36px;font-weight:bold;color:white;line-height:1.1;">${form.address || '[ADDRESS]'}</div>
          <div style="font-size:12px;font-weight:bold;color:white;margin-top:4px;">${form.city || '[CITY]'}, TX · ${form.size || '[SIZE]'} · ${(form.status || 'FOR LEASE').toUpperCase()}</div>
        </div>
        <div style="background:#111827;padding:14px 20px;display:flex;align-items:center;gap:16px;flex:1;">
          <img src="/logo.png" style="height:56px;width:auto;" />
          <div style="flex:1;">
            <div style="color:white;font-size:13px;font-weight:bold;">${form.contactName || 'Life Long Property Management'}</div>
            <div style="color:#9CA3AF;font-size:9px;margin-top:2px;">${form.contactTitle || ''}</div>
            <div style="color:#9CA3AF;font-size:9px;margin-top:2px;">${form.contactPhone || '(512) 892-6001'}  ·  ${form.contactEmail || 'pm@lifelongpm.com'}</div>
          </div>
          <div style="text-align:right;">
            <div style="color:#9CA3AF;font-size:8px;">lifelongpropertymanagement.com</div>
            <div style="color:#6B7280;font-size:6.5px;margin-top:4px;max-width:280px;text-align:right;">The information contained herein has been obtained from sources deemed reliable. While we do not doubt its accuracy, we have not verified it and make no guarantee, warranty, or representation about it. ©2026 Life Long Property Management.</div>
          </div>
        </div>
      </div>`;

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}@media print{@page{size:10in 7.5in;margin:0;}}</style></head><body>${p1}${p2}${p3}${p4}${p5}</body></html>`;

    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
      win.focus();
      setTimeout(() => { win.print(); setGenerating(false); }, 1000);
    } else {
      setGenerating(false);
    }
  };

  const PhotoUpload = ({ label, note, val, ref: inputRef, onUpload, onClear }: {
    label: string; note: string; val: string | null;
    ref: React.RefObject<HTMLInputElement | null>;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
  }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label} <span className="text-gray-400 font-normal">({note})</span></label>
      {val ? (
        <div className="relative">
          <img src={val} alt={label} className="w-full h-28 object-cover rounded" />
          <button onClick={onClear} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">×</button>
        </div>
      ) : (
        <button onClick={() => inputRef.current?.click()}
          className="w-full h-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:border-gold transition text-sm">
          + Upload {label}
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onUpload} />
    </div>
  );

  const Field = ({ id, label, placeholder, required = false, type = 'text', options = [] }: {
    id: string; label: string; placeholder?: string; required?: boolean; type?: string; options?: string[];
  }) => (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}{required && <span className="text-rust-orange ml-1">*</span>}</label>
      {type === 'select' ? (
        <select value={form[id] || ''} onChange={e => set(id, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold">
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === 'textarea' ? (
        <textarea value={form[id] || ''} onChange={e => set(id, e.target.value)}
          placeholder={placeholder} rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
      ) : (
        <input type="text" value={form[id] || ''} onChange={e => set(id, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-1">5-Page Listing Package Generator</h1>
          <p className="text-gray-300 text-sm">Fill in the details, upload your photos, and generate a print-ready 5-page property package.</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Form — 2/3 width */}
          <div className="lg:col-span-2 space-y-6">

            {/* Photos */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">📸 Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PhotoUpload label="Aerial Photo" note="used on cover & back" val={aerial} ref={aerialRef}
                  onUpload={e => handlePhoto(e, setAerial)} onClear={() => setAerial(null)} />
                <PhotoUpload label="Exterior Photo" note="street level view" val={exterior} ref={exteriorRef}
                  onUpload={e => handlePhoto(e, setExterior)} onClear={() => setExterior(null)} />
                <PhotoUpload label="Map / Location" note="aerial or Google Maps screenshot" val={mapPhoto} ref={mapRef}
                  onUpload={e => handlePhoto(e, setMapPhoto)} onClear={() => setMapPhoto(null)} />
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">🏢 Property Info</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><Field id="propertyName" label="Property Name" placeholder="Oak Acres Shopping Center" required /></div>
                <Field id="address" label="Street Address" placeholder="5716 Hwy 290 West" required />
                <Field id="city" label="City" placeholder="Austin" required />
                <Field id="zip" label="ZIP Code" placeholder="78735" />
                <Field id="county" label="County" placeholder="Travis County" />
                <div className="col-span-2"><Field id="status" label="Status" type="select" options={['For Lease', 'For Sale', 'For Lease | For Sale', 'For Lease | Build-to-Suit']} /></div>
                <div className="col-span-2"><Field id="description" label="Property Description" placeholder="Brief 2-3 sentence description of the property, ideal use, and key selling points." type="textarea" /></div>
                <div className="col-span-2"><Field id="highlights" label="Bullet Highlights (one per line)" placeholder={"High-visibility corner location\nDirect highway access\nAmple parking"} type="textarea" /></div>
                <div className="col-span-2"><Field id="badges" label="Feature Badges (comma separated, max 4)" placeholder="IOS Ready, Prime Location, High-Growth" /></div>
              </div>
            </div>

            {/* Lease Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">📋 Lease Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field id="size" label="Available Space" placeholder="5,000 SF" required />
                <Field id="zoning" label="Zoning" placeholder="C-1" />
                <Field id="leaseType" label="Lease Type" placeholder="NNN" />
                <Field id="askingRate" label="Asking Rate" placeholder="$18.00 PSF/Year" />
                <Field id="suites" label="Suite Options" placeholder="Suite A: 1,200 SF · Suite B: 2,400 SF" />
                <Field id="yearBuilt" label="Year Built" placeholder="2005" />
                <Field id="parking" label="Parking" placeholder="45 spaces / 4.5 per 1,000 SF" />
                <Field id="permittedUse" label="Permitted Use" placeholder="Retail, Office, Medical, Flex" />
                <div className="col-span-2"><Field id="utilities" label="Utilities" placeholder="Water, Sewer, Electric — Available at site" /></div>
              </div>
            </div>

            {/* Why This Property */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">⭐ Why This Property (up to 4)</h2>
              <div className="space-y-4">
                {why.map((w, i) => (
                  <div key={i} className="border border-gray-100 rounded p-4">
                    <label className="block text-xs font-medium text-gray-500 mb-1">Point {i + 1}</label>
                    <select value={w.option} onChange={e => updateWhy(i, 'option', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold mb-2">
                      <option value="">— Select or skip —</option>
                      {WHY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    {w.option && (
                      <input type="text" value={w.body} onChange={e => updateWhy(i, 'body', e.target.value)}
                        placeholder="Brief description of this selling point..."
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Access */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">📍 Location & Access</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><Field id="primaryEntry" label="Primary Entry Route" placeholder="US-183 southbound → right on Maha Court → property at cul-de-sac terminus" type="textarea" /></div>
                <Field id="roadType" label="Road Type" placeholder="Public highway / Private roadway" />
                <Field id="traffic" label="Traffic Count (VPD)" placeholder="26,000" />
                <div className="col-span-2"><Field id="truckAccess" label="Truck / Heavy Vehicle Access" placeholder="Designed for commercial traffic. Neighboring uses include industrial tenants." /></div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-bold text-navy mb-3">Drive Times (Option B — number cards)</label>
                <div className="grid grid-cols-2 gap-3">
                  {driveTimes.map((d, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input type="text" value={d.mins} onChange={e => updateDrive(i, 'mins', e.target.value)}
                        placeholder="9" className="w-14 px-2 py-2 border border-gray-300 rounded text-sm text-center focus:ring-2 focus:ring-gold" />
                      <span className="text-xs text-gray-400">min to</span>
                      <input type="text" value={d.dest} onChange={e => updateDrive(i, 'dest', e.target.value)}
                        placeholder="IH-35" className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-gold" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-4">👤 Contact Info</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field id="contactName" label="Contact Name" placeholder="Norman Phillips" required />
                <Field id="contactTitle" label="Title" placeholder="Property Manager" />
                <Field id="contactPhone" label="Phone" placeholder="(512) 543-4686" />
                <Field id="contactEmail" label="Email" placeholder="norman@hawkinsfamilypartners.com" />
              </div>
            </div>

          </div>

          {/* Sidebar — Generate button */}
          <div className="space-y-4 lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-navy mb-2">Generate Package</h2>
              <p className="text-gray-500 text-sm mb-4">Generates a 5-page print-ready package. In the print dialog, select <strong>Save as PDF</strong>.</p>
              <div className="bg-blue-50 border border-blue-100 rounded p-3 text-xs text-gray-600 mb-4 space-y-1">
                <p><strong>Print settings:</strong></p>
                <p>• Paper: Letter (Landscape)</p>
                <p>• Margins: None</p>
                <p>• Check "Background graphics"</p>
              </div>
              <button onClick={generate} disabled={generating}
                className="w-full bg-gold text-navy py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition disabled:opacity-50">
                {generating ? 'Generating...' : '📄 Generate 5-Page PDF'}
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-4 text-xs text-gray-500 space-y-1">
              <p className="font-bold text-navy text-sm mb-2">Pages included:</p>
              <p>1️⃣ Cover — name, photo, stats</p>
              <p>2️⃣ Property Overview — specs & photo</p>
              <p>3️⃣ Site Details — zoning, utilities, why</p>
              <p>4️⃣ Location & Access — map, drive times</p>
              <p>5️⃣ Back Cover — aerial & contact</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
