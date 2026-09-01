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

  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const reportRef = useRef<HTMLDivElement>(null);

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
    if (!reportRef.current) return;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;
    
    const content = reportRef.current.innerHTML;
    printWindow.document.write(`
      <html>
        <head>
          <title>${data.propertyName || 'Inspection'}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .property-info { margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .condition { margin-bottom: 15px; padding: 10px; border-left: 3px solid #ccc; }
            .good { border-left-color: #22c55e; }
            .fair { border-left-color: #eab308; }
            .needs { border-left-color: #f97316; }
            .poor { border-left-color: #ef4444; }
            .na { border-left-color: #9ca3af; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>LIFE LONG PROPERTY MANAGEMENT</h1>
            <h2>Property Inspection Report</h2>
          </div>
          <div class="property-info">
            <p><strong>Property:</strong> ${data.propertyName || 'N/A'}</p>
            <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
            <p><strong>Date:</strong> ${data.dateVisited} | <strong>Inspector:</strong> ${data.inspector || 'N/A'}</p>
          </div>
          <div class="section">
            <h3>Condition Assessment</h3>
            ${Object.entries(data.conditions).map(([key, cond]) => `
              <div class="condition ${cond.rating.toLowerCase().replace(' ', '')}">
                <strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${cond.rating || 'Not rated'}
                ${cond.notes ? `<p>${cond.notes}</p>` : ''}
              </div>
            `).join('')}
          </div>
          ${data.maintenanceItems ? `
            <div class="section">
              <h3>Priority Maintenance</h3>
              <p>${data.maintenanceItems.replace(/\n/g, '<br>')}</p>
            </div>
          ` : ''}
          <script>
            window.print();
            setTimeout(() => window.close(), 500);
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
                  <div className="flex justify-between mb-1">
                    <label className="font-medium text-sm">{area.label}</label>
                    <select value={data.conditions[area.key].rating} onChange={e => setData({...data, conditions: {...data.conditions, [area.key]: {...data.conditions[area.key], rating: e.target.value as ConditionRating}}})} className="p-1 border rounded text-sm">
                      <option value="">Select</option>
                      {ratings.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
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
          <div ref={reportRef} className="text-xs bg-gray-50 p-3 rounded mb-3 max-h-96 overflow-y-auto border">
            <div className="font-bold text-center mb-2">LLPM INSPECTION</div>
            <div className="mb-2 text-xs">
              <div><strong>Property:</strong> {data.propertyName || 'N/A'}</div>
              <div><strong>Address:</strong> {data.address || 'N/A'}</div>
              <div><strong>Date:</strong> {data.dateVisited}</div>
            </div>
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
