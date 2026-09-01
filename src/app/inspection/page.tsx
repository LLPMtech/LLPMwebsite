'use client';

import { useState, useRef } from 'react';

interface InspectionData {
  propertyName: string;
  address: string;
  dateVisited: string;
  inspector: string;
  photos: string[];
  conditions: {
    [key: string]: string;
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
      roof: '',
      facade: '',
      windows: '',
      paving: '',
      parking: '',
      landscaping: '',
      signage: '',
      lighting: '',
      hvac: '',
      drainage: '',
      fencing: '',
    },
    maintenanceItems: '',
  });

  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

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

  const generateDocument = async () => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => {
      const element = document.getElementById('inspection-report');
      if (element) {
        const opt = {
          margin: 10,
          filename: `${data.propertyName.replace(/[^a-z0-9]/gi, '_')}_inspection_${new Date().toISOString().split('T')[0]}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
        };
        const html2pdf = (window as any).html2pdf;
        html2pdf().set(opt).from(element).save();
      }
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

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-navy mb-2">Property Inspection Report</h1>
      <p className="text-gray-600 mb-8">Document exterior property conditions with photos and detailed notes</p>

      <div className="grid grid-cols-3 gap-8">
        {/* Form */}
        <div className="col-span-2 space-y-6">
          {/* Property Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Property Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Name *</label>
                <input
                  type="text"
                  value={data.propertyName}
                  onChange={e => setData(prev => ({ ...prev, propertyName: e.target.value }))}
                  placeholder="e.g., Plaza Lofts, Oak Acres"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <input
                  type="text"
                  value={data.address}
                  onChange={e => setData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Full address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Visited *</label>
                  <input
                    type="date"
                    value={data.dateVisited}
                    onChange={e => setData(prev => ({ ...prev, dateVisited: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Inspector *</label>
                  <input
                    type="text"
                    value={data.inspector}
                    onChange={e => setData(prev => ({ ...prev, inspector: e.target.value }))}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
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
                <div key={num}>
                  <button
                    onClick={() => fileRefs[idx].current?.click()}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gold transition text-center"
                  >
                    {data.photos[idx] ? (
                      <div>
                        <div className="text-2xl mb-2">✓</div>
                        <div className="text-sm text-gray-600">Photo {num} uploaded</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-2xl mb-2">📷</div>
                        <div className="text-sm text-gray-600">Photo {num}: {['Front Facade', 'Side/Parking', 'Rear/Loading', 'Roof/Entry'][idx]}</div>
                      </div>
                    )}
                  </button>
                  <input
                    ref={fileRefs[idx]}
                    type="file"
                    accept="image/*"
                    onChange={e => handlePhotoUpload(idx, e)}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Condition Assessment */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Condition Assessment</h2>
            <div className="grid grid-cols-2 gap-6">
              {conditionAreas.map(area => (
                <div key={area.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{area.label}</label>
                  <textarea
                    value={data.conditions[area.key]}
                    onChange={e => setData(prev => ({
                      ...prev,
                      conditions: { ...prev.conditions, [area.key]: e.target.value }
                    }))}
                    placeholder="Condition notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Priority Maintenance Items</h2>
            <textarea
              value={data.maintenanceItems}
              onChange={e => setData(prev => ({ ...prev, maintenanceItems: e.target.value }))}
              placeholder="List any priority items or action items needed..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold"
              rows={5}
            />
          </div>
        </div>

        {/* Preview & Generate */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-lg font-bold text-navy mb-4">Report Preview</h2>
            <div id="inspection-report" className="text-xs mb-6 p-4 bg-gray-50 rounded border border-gray-200" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <div className="font-bold text-center mb-2">LIFE LONG PROPERTY MANAGEMENT</div>
              <div className="font-bold text-center mb-3">Property Inspection Report</div>
              <div className="mb-3 space-y-1">
                <div><strong>Property:</strong> {data.propertyName || '[Property Name]'}</div>
                <div><strong>Address:</strong> {data.address || '[Address]'}</div>
                <div><strong>Date:</strong> {data.dateVisited} | <strong>Inspector:</strong> {data.inspector || '[Name]'}</div>
              </div>
              
              {data.photos.some(p => p) && (
                <div className="mb-3">
                  <div className="font-bold mb-1">Photos:</div>
                  <div className="grid grid-cols-2 gap-1">
                    {data.photos.map((photo, i) => (
                      photo && <div key={i} className="bg-gray-300 h-12 text-center text-xs flex items-center justify-center">Photo {i+1}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="font-bold mb-1">Condition Assessment:</div>
              <div className="text-xs space-y-1">
                {conditionAreas.map(area => (
                  <div key={area.key}>
                    <strong>{area.label}:</strong> {data.conditions[area.key] || '—'}
                  </div>
                ))}
              </div>

              {data.maintenanceItems && (
                <div className="mt-3 pt-3 border-t border-gray-300">
                  <div className="font-bold mb-1">Priority Maintenance:</div>
                  <div className="text-xs">{data.maintenanceItems}</div>
                </div>
              )}
            </div>

            <button
              onClick={generateDocument}
              className="w-full bg-gold text-navy py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              📥 Download as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
