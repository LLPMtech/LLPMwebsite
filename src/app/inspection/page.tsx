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

const ratingColors: Record<ConditionRating, string> = {
  'Good': 'bg-green-100 border-green-300 text-green-900',
  'Fair': 'bg-yellow-100 border-yellow-300 text-yellow-900',
  'Poor': 'bg-red-100 border-red-300 text-red-900',
  'Needs Work': 'bg-orange-100 border-orange-300 text-orange-900',
  'N/A': 'bg-gray-100 border-gray-300 text-gray-600',
  '': 'bg-white border-gray-300 text-gray-600',
};

const ratingBgColors: Record<ConditionRating, string> = {
  'Good': 'bg-green-50',
  'Fair': 'bg-yellow-50',
  'Poor': 'bg-red-50',
  'Needs Work': 'bg-orange-50',
  'N/A': 'bg-gray-50',
  '': 'bg-white',
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

  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
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

  const generatePDF = () => {
    const element = reportRef.current;
    if (!element) return;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
      const html2pdf = (window as any).html2pdf;
      html2pdf()
        .set({
          margin: 10,
          filename: `${data.propertyName || 'inspection'}_${data.dateVisited}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(element)
        .save();
    };
    document.head.appendChild(script);
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
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-navy mb-2">Property Inspection Report</h1>
      <p className="text-gray-600 mb-8">Document exterior property conditions with ratings and detailed notes</p>

      <div className="grid grid-cols-4 gap-8">
        {/* Form */}
        <div className="col-span-3 space-y-6">
          {/* Property Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Property Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
                <input
                  type="text"
                  value={data.propertyName}
                  onChange={e => setData(prev => ({ ...prev, propertyName: e.target.value }))}
                  placeholder="e.g., Plaza Lofts"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={data.address}
                  onChange={e => setData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Full address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={data.dateVisited}
                    onChange={e => setData(prev => ({ ...prev, dateVisited: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Inspector</label>
                  <input
                    type="text"
                    value={data.inspector}
                    onChange={e => setData(prev => ({ ...prev, inspector: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Exterior Photos</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num, idx) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => fileRefs[idx].current?.click()}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold"
                >
                  {data.photos[idx] ? (
                    <div><div className="text-2xl">✓</div><div className="text-sm">Photo {num} uploaded</div></div>
                  ) : (
                    <div><div className="text-2xl">📷</div><div className="text-sm">Photo {num}</div></div>
                  )}
                  <input
                    ref={fileRefs[idx]}
                    type="file"
                    accept="image/*"
                    onChange={e => handlePhotoUpload(idx, e)}
                    className="hidden"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Condition Assessment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Condition Assessment</h2>
            <div className="space-y-4">
              {conditionAreas.map(area => (
                <div key={area.key} className={`p-4 rounded-lg border-2 ${ratingBgColors[data.conditions[area.key].rating]}`}>
                  <div className="flex justify-between items-start mb-3">
                    <label className="font-medium">{area.label}</label>
                    <select
                      value={data.conditions[area.key].rating}
                      onChange={e => setData(prev => ({
                        ...prev,
                        conditions: {
                          ...prev.conditions,
                          [area.key]: { ...prev.conditions[area.key], rating: e.target.value as ConditionRating }
                        }
                      }))}
                      className={`px-2 py-1 rounded border-2 text-sm font-medium ${ratingColors[data.conditions[area.key].rating]}`}
                    >
                      <option value="">Select</option>
                      {ratings.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <textarea
                    value={data.conditions[area.key].notes}
                    onChange={e => setData(prev => ({
                      ...prev,
                      conditions: { ...prev.conditions, [area.key]: { ...prev.conditions[area.key], notes: e.target.value } }
                    }))}
                    placeholder="Notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Priority Maintenance</h2>
            <textarea
              value={data.maintenanceItems}
              onChange={e => setData(prev => ({ ...prev, maintenanceItems: e.target.value }))}
              placeholder="Priority items..."
              className="w-full px-4 py-3 border border-gray-300 rounded"
              rows={5}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Legend */}
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-lg font-bold text-navy mb-4">Legend</h2>
            <div className="space-y-2">
              <div className="p-2 rounded bg-green-50 border border-green-300"><div className="font-bold text-sm">Good</div></div>
              <div className="p-2 rounded bg-yellow-50 border border-yellow-300"><div className="font-bold text-sm">Fair</div></div>
              <div className="p-2 rounded bg-orange-50 border border-orange-300"><div className="font-bold text-sm">Needs Work</div></div>
              <div className="p-2 rounded bg-red-50 border border-red-300"><div className="font-bold text-sm">Poor</div></div>
              <div className="p-2 rounded bg-gray-50 border border-gray-300"><div className="font-bold text-sm">N/A</div></div>
            </div>
          </div>

          {/* Preview & Download */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Preview</h2>
            <div ref={reportRef} className="text-xs p-3 bg-white border border-gray-200 rounded mb-4 max-h-96 overflow-y-auto">
              <div className="font-bold text-center mb-2">LLPM PROPERTY INSPECTION</div>
              <div className="text-xs mb-2">
                <div><strong>Property:</strong> {data.propertyName || 'N/A'}</div>
                <div><strong>Address:</strong> {data.address || 'N/A'}</div>
                <div><strong>Date:</strong> {data.dateVisited} | <strong>Inspector:</strong> {data.inspector || 'N/A'}</div>
              </div>
              {conditionAreas.map(a => (
                <div key={a.key} className="text-xs mb-1">
                  <strong>{a.label}:</strong> {data.conditions[a.key].rating || 'Not rated'}
                  {data.conditions[a.key].notes && <div className="ml-2 text-gray-600">{data.conditions[a.key].notes}</div>}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={generatePDF}
              className="w-full bg-gold text-navy py-3 rounded-lg font-bold hover:opacity-90"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
