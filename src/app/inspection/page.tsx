'use client';

import { useState, useRef } from 'react';

type ConditionRating = 'Good' | 'Fair' | 'Poor' | 'Needs Work' | 'N/A' | '';

interface ConditionData {
  rating: ConditionRating;
  notes: string;
}

interface InspectionData {
  propertyName: string;
  address: string;
  dateVisited: string;
  inspector: string;
  photos: string[];
  conditions: {
    [key: string]: ConditionData;
  };
  maintenanceItems: string;
}

const SCORECARD = {
  roof: {
    'Excellent': 'New or like new condition',
    'Good': 'Repairs unlikely for 5+ years',
    'Fair': 'Repair likely needed within 2-5 years',
    'Poor': 'Repair needed within 1-2 years',
    'Needs Work': 'Immediate repair needed'
  },
  facade: {
    'Excellent': 'New or like new condition',
    'Good': 'No issues for 5+ years',
    'Fair': 'Minor repairs within 2-5 years',
    'Poor': 'Significant repairs within 1-2 years',
    'Needs Work': 'Immediate attention required'
  },
  windows: {
    'Excellent': 'New or like new condition',
    'Good': 'No repairs needed for 5+ years',
    'Fair': 'Minor repairs/replacements within 2-5 years',
    'Poor': 'Significant repairs/replacements within 1-2 years',
    'Needs Work': 'Immediate repair or replacement needed'
  },
  paving: {
    'Excellent': 'New or like new surface',
    'Good': 'Repairs unlikely for 5+ years',
    'Fair': 'Seal coat or minor repairs within 2-5 years',
    'Poor': 'Repaving needed within 1-2 years',
    'Needs Work': 'Immediate repair/replacement needed'
  },
  parking: {
    'Excellent': 'New or like new condition',
    'Good': 'Repairs unlikely for 5+ years',
    'Fair': 'Minor repairs within 2-5 years',
    'Poor': 'Resurfacing needed within 1-2 years',
    'Needs Work': 'Immediate repair/replacement needed'
  },
  landscaping: {
    'Excellent': 'Well-maintained, manicured appearance',
    'Good': 'Attractive, minimal maintenance needed 5+ years',
    'Fair': 'Basic upkeep required, improvements within 2-5 years',
    'Poor': 'Overgrown or neglected, upgrades within 1-2 years',
    'Needs Work': 'Immediate landscaping work required'
  },
  signage: {
    'Excellent': 'New or like new, fully functional',
    'Good': 'Well-maintained, 5+ years remaining',
    'Fair': 'Minor repairs/updates within 2-5 years',
    'Poor': 'Fading or damage, replacement within 1-2 years',
    'Needs Work': 'Immediate repair or replacement needed'
  },
  lighting: {
    'Excellent': 'New or recently installed',
    'Good': 'Fully functional, 5+ years expected life',
    'Fair': 'Functional but aging, updates within 2-5 years',
    'Poor': 'Failing components, repair/replacement 1-2 years',
    'Needs Work': 'Immediate safety concern, repair needed now'
  },
  hvac: {
    'Excellent': 'New or recently serviced',
    'Good': 'Expected life 5+ years with regular maintenance',
    'Fair': 'Expected life 2-5 years, maintenance recommended',
    'Poor': 'Repair needed within 1-2 years',
    'Needs Work': 'Immediate repair or replacement needed'
  },
  drainage: {
    'Excellent': 'New or like new, fully functional',
    'Good': 'No issues expected for 5+ years',
    'Fair': 'Minor maintenance/repairs within 2-5 years',
    'Poor': 'Repairs needed within 1-2 years',
    'Needs Work': 'Immediate repair needed to prevent water damage'
  },
  fencing: {
    'Excellent': 'New or like new condition',
    'Good': 'Well-maintained, 5+ years remaining',
    'Fair': 'Minor repairs/maintenance within 2-5 years',
    'Poor': 'Significant repairs needed within 1-2 years',
    'Needs Work': 'Immediate repair or replacement needed'
  }
};

export default function PropertyInspectionPage() {
  const [data, setData] = useState<InspectionData>({
    propertyName: '',
    address: '',
    dateVisited: new Date().toISOString().split('T')[0],
    inspector: '',
    photos: [],
    conditions: {
      roof: { rating: '', notes: '' },
      facade: { rating: '', notes: '' },
      windows: { rating: '', notes: '' },
      paving: { rating: '', notes: '' },
      parking: { rating: '', notes: '' },
      landscaping: { rating: '', notes: '' },
      signage: { rating: '', notes: '' },
      lighting: { rating: '', notes: '' },
      hvac: { rating: '', notes: '' },
      drainage: { rating: '', notes: '' },
      fencing: { rating: '', notes: '' },
    },
    maintenanceItems: '',
  });

  const [showScorecard, setShowScorecard] = useState<string | null>(null);

  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhotos = [...data.photos];
        newPhotos[index] = event.target?.result as string;
        setData(prev => ({ ...prev, photos: newPhotos }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const downloadPDF = () => {
    const printWindow = window.open('', '', 'width=900,height=1200');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${data.propertyName || 'Inspection'}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 8.5in; margin: 0 auto; }
            h1 { text-align: center; color: #2c3e50; margin-bottom: 5px; font-size: 20px; }
            h2 { text-align: center; color: #2c3e50; margin-bottom: 15px; font-size: 16px; }
            .property-info { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #2c3e50; }
            .property-info p { margin: 5px 0; font-size: 13px; }
            .photos-section { margin-bottom: 20px; page-break-inside: avoid; }
            .photos-section h3 { color: #2c3e50; font-size: 13px; margin-bottom: 10px; border-bottom: 1px solid #ddd; }
            .photo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .photo-grid img { max-width: 100%; border: 1px solid #ccc; }
            .conditions-section { margin-bottom: 20px; }
            .conditions-section h3 { color: #2c3e50; font-size: 13px; margin-bottom: 10px; border-bottom: 1px solid #ddd; }
            .condition { margin-bottom: 12px; padding: 8px; background: #f9f9f9; border-left: 3px solid #ccc; }
            .condition strong { display: block; color: #2c3e50; }
            .condition p { margin: 3px 0; font-size: 12px; }
            .maintenance { margin-top: 20px; }
            .maintenance h3 { color: #2c3e50; font-size: 13px; margin-bottom: 10px; border-bottom: 1px solid #ddd; }
            .maintenance p { font-size: 12px; white-space: pre-wrap; }
            @media print { body { padding: 10px; } }
          </style>
        </head>
        <body>
          <h1>LIFE LONG PROPERTY MANAGEMENT</h1>
          <h2>Property Inspection Report</h2>
          
          <div class="property-info">
            <p><strong>Property:</strong> ${data.propertyName || 'N/A'}</p>
            <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
            <p><strong>Date:</strong> ${data.dateVisited} | <strong>Inspector:</strong> ${data.inspector || 'N/A'}</p>
          </div>

          ${data.photos.some(p => p) ? `
            <div class="photos-section">
              <h3>Exterior Photos</h3>
              <div class="photo-grid">
                ${data.photos.map((photo, i) => photo ? `<img src="${photo}" alt="Photo ${i+1}"/>` : '').join('')}
              </div>
            </div>
          ` : ''}

          <div class="conditions-section">
            <h3>Condition Assessment</h3>
            ${[
              { key: 'roof', label: 'Roof' },
              { key: 'facade', label: 'Facade & Exterior Walls' },
              { key: 'windows', label: 'Windows & Doors' },
              { key: 'paving', label: 'Paving & Pavement' },
              { key: 'parking', label: 'Parking Lot Condition' },
              { key: 'landscaping', label: 'Landscaping & Grounds' },
              { key: 'signage', label: 'Signage Condition' },
              { key: 'lighting', label: 'Lighting & Security' },
              { key: 'hvac', label: 'HVAC & Mechanical (External)' },
              { key: 'drainage', label: 'Drainage & Gutters' },
              { key: 'fencing', label: 'Fencing & Gates' },
            ].map(area => `
              <div class="condition">
                <strong>${area.label}: ${data.conditions[area.key].rating || 'Not rated'}</strong>
                ${data.conditions[area.key].notes ? `<p>${data.conditions[area.key].notes}</p>` : ''}
              </div>
            `).join('')}
          </div>

          ${data.maintenanceItems ? `
            <div class="maintenance">
              <h3>Priority Maintenance Items</h3>
              <p>${data.maintenanceItems}</p>
            </div>
          ` : ''}

          <script>
            setTimeout(() => { window.print(); }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const conditionAreas = [
    { key: 'roof', label: 'Roof' },
    { key: 'facade', label: 'Facade & Exterior Walls' },
    { key: 'windows', label: 'Windows & Doors' },
    { key: 'paving', label: 'Paving & Pavement' },
    { key: 'parking', label: 'Parking Lot Condition' },
    { key: 'landscaping', label: 'Landscaping & Grounds' },
    { key: 'signage', label: 'Signage Condition' },
    { key: 'lighting', label: 'Lighting & Security' },
    { key: 'hvac', label: 'HVAC & Mechanical (External)' },
    { key: 'drainage', label: 'Drainage & Gutters' },
    { key: 'fencing', label: 'Fencing & Gates' },
  ];

  const ratings: ConditionRating[] = ['Good', 'Fair', 'Needs Work', 'Poor', 'N/A'];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-navy mb-2">Property Inspection Report</h1>
      <p className="text-gray-600 mb-8">Document exterior property conditions</p>

      <div className="grid grid-cols-3 gap-6">
        {/* Form - Left */}
        <div className="col-span-2 space-y-4">
          {/* Details */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-bold text-navy mb-3">Property Details</h2>
            <input type="text" placeholder="Property Name" value={data.propertyName} onChange={e => setData({...data, propertyName: e.target.value})} className="w-full p-2 border mb-2 rounded" />
            <input type="text" placeholder="Address" value={data.address} onChange={e => setData({...data, address: e.target.value})} className="w-full p-2 border mb-2 rounded" />
            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={data.dateVisited} onChange={e => setData({...data, dateVisited: e.target.value})} className="p-2 border rounded" />
              <input type="text" placeholder="Inspector" value={data.inspector} onChange={e => setData({...data, inspector: e.target.value})} className="p-2 border rounded" />
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-bold text-navy mb-3">Photos</h2>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map(i => (
                <button key={i} type="button" onClick={() => fileRefs.current[i]?.click()} className="p-3 border-2 border-dashed rounded hover:border-gold">
                  {data.photos[i] ? '✓ Uploaded' : `Photo ${i + 1}`}
                  <input ref={el => {if(el) fileRefs.current[i] = el}} type="file" accept="image/*" onChange={e => handlePhotoUpload(i, e)} className="hidden" />
                </button>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-bold text-navy mb-3">Condition Assessment</h2>
            <div className="space-y-3">
              {conditionAreas.map(area => (
                <div key={area.key}>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-medium text-sm">{area.label}</label>
                    <div className="flex gap-2">
                      <select value={data.conditions[area.key].rating} onChange={e => setData({...data, conditions: {...data.conditions, [area.key]: {...data.conditions[area.key], rating: e.target.value as ConditionRating}}})} className="p-1 border rounded text-sm">
                        <option value="">Select</option>
                        {ratings.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      {SCORECARD[area.key as keyof typeof SCORECARD] && (
                        <button type="button" onClick={() => setShowScorecard(showScorecard === area.key ? null : area.key)} className="px-2 py-1 bg-navy text-white rounded text-xs hover:bg-opacity-80">?</button>
                      )}
                    </div>
                  </div>
                  {showScorecard === area.key && SCORECARD[area.key as keyof typeof SCORECARD] && (
                    <div className="p-2 bg-blue-50 rounded border border-blue-200 text-xs mb-2">
                      {Object.entries(SCORECARD[area.key as keyof typeof SCORECARD]).map(([rating, desc]) => (
                        <div key={rating} className="mb-1"><strong>{rating}:</strong> {desc}</div>
                      ))}
                    </div>
                  )}
                  <textarea value={data.conditions[area.key].notes} onChange={e => setData({...data, conditions: {...data.conditions, [area.key]: {...data.conditions[area.key], notes: e.target.value}}})} placeholder="Notes..." className="w-full p-2 border rounded text-xs" rows={2} />
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded shadow p-4">
            <h2 className="font-bold text-navy mb-3">Priority Maintenance</h2>
            <textarea value={data.maintenanceItems} onChange={e => setData({...data, maintenanceItems: e.target.value})} placeholder="Priority items..." className="w-full p-2 border rounded" rows={4} />
          </div>
        </div>

        {/* Preview - Right */}
        <div className="bg-white rounded shadow p-4 sticky top-4 h-fit">
          <h2 className="font-bold text-navy mb-3">Preview</h2>
          <div className="text-xs bg-gray-50 p-3 rounded mb-3 max-h-96 overflow-y-auto border">
            <div className="font-bold text-center mb-2">LLPM INSPECTION</div>
            <div className="mb-2 text-xs">
              <div><strong>Property:</strong> {data.propertyName || 'N/A'}</div>
              <div><strong>Address:</strong> {data.address || 'N/A'}</div>
              <div><strong>Date:</strong> {data.dateVisited}</div>
            </div>
            {data.photos.some(p => p) && (
              <div className="mb-2">
                <strong className="text-xs">Photos: {data.photos.filter(p => p).length}</strong>
              </div>
            )}
            {conditionAreas.map(a => (
              <div key={a.key} className="text-xs mb-1">
                <strong>{a.label}:</strong> {data.conditions[a.key].rating || '-'}
                {data.conditions[a.key].notes && <div className="ml-2 text-gray-600 text-xs">{data.conditions[a.key].notes}</div>}
              </div>
            ))}
          </div>
          <button type="button" onClick={downloadPDF} className="w-full bg-gold text-navy py-2 rounded font-bold">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
