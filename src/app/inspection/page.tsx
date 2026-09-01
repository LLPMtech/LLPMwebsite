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

  const generatePDF = async () => {
    // Create HTML content for PDF
    const htmlContent = document.getElementById('inspection-report')?.innerHTML || '';
    
    // Create a temporary container
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    tempDiv.style.padding = '40px';
    tempDiv.style.width = '8.5in';
    tempDiv.style.fontFamily = 'Arial, sans-serif';
    tempDiv.style.fontSize = '12px';
    tempDiv.style.color = '#333';
    
    // Use html2pdf library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    script.onload = () => {
      const html2pdf = (window as any).html2pdf;
      const opt = {
        margin: 0.5,
        filename: `${data.propertyName.replace(/[^a-z0-9]/gi, '_')}_inspection_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      
      html2pdf()
        .set(opt)
        .from(tempDiv)
        .save()
        .catch((err: any) => console.error('PDF generation error:', err));
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
                        <div className="text-sm text-gray-600">Photo {num}</div>
                        <div className="text-xs text-gray-500 mt-1">{['Front Facade', 'Side/Parking', 'Rear/Loading', 'Roof/Entry'][idx]}</div>
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
            <div className="space-y-4">
              {conditionAreas.map(area => (
                <div key={area.key} className={`p-4 rounded-lg border-2 ${ratingBgColors[data.conditions[area.key].rating]}`}>
                  <div className="flex items-start justify-between mb-3">
                    <label className="block font-medium text-gray-900">{area.label}</label>
                    <select
                      value={data.conditions[area.key].rating}
                      onChange={e => setData(prev => ({
                        ...prev,
                        conditions: {
                          ...prev.conditions,
                          [area.key]: {
                            ...prev.conditions[area.key],
                            rating: e.target.value as ConditionRating
                          }
                        }
                      }))}
                      className={`px-3 py-1 rounded border-2 text-sm font-medium ${ratingColors[data.conditions[area.key].rating]}`}
                    >
                      <option value="">-- Select Rating --</option>
                      {ratings.map(rating => (
                        <option key={rating} value={rating}>{rating}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    value={data.conditions[area.key].notes}
                    onChange={e => setData(prev => ({
                      ...prev,
                      conditions: {
                        ...prev.conditions,
                        [area.key]: {
                          ...prev.conditions[area.key],
                          notes: e.target.value
                        }
                      }
                    }))}
                    placeholder="Add detailed notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gold"
                    rows={2}
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

        {/* Sidebar: Legend & Preview */}
        <div className="space-y-6">
          {/* Legend */}
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-lg font-bold text-navy mb-4">Condition Legend</h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border-2 bg-green-50 border-green-300">
                <div className="font-bold text-green-900">Good</div>
                <div className="text-xs text-green-700">Well-maintained, no immediate issues</div>
              </div>
              <div className="p-3 rounded-lg border-2 bg-yellow-50 border-yellow-300">
                <div className="font-bold text-yellow-900">Fair</div>
                <div className="text-xs text-yellow-700">Minor wear, routine maintenance recommended</div>
              </div>
              <div className="p-3 rounded-lg border-2 bg-orange-50 border-orange-300">
                <div className="font-bold text-orange-900">Needs Work</div>
                <div className="text-xs text-orange-700">Visible issues, should be addressed soon</div>
              </div>
              <div className="p-3 rounded-lg border-2 bg-red-50 border-red-300">
                <div className="font-bold text-red-900">Poor</div>
                <div className="text-xs text-red-700">Significant damage or major repair needed</div>
              </div>
              <div className="p-3 rounded-lg border-2 bg-gray-50 border-gray-300">
                <div className="font-bold text-gray-900">N/A</div>
                <div className="text-xs text-gray-700">Not applicable to this property</div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-navy mb-4">Report Preview</h2>
            <div id="inspection-report" className="text-xs mb-4 p-3 bg-gray-50 rounded border border-gray-200 space-y-2" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <div className="font-bold text-center mb-2">LIFE LONG PROPERTY MANAGEMENT</div>
              <div className="font-bold text-center mb-2">Property Inspection Report</div>
              <div className="mb-2 space-y-1 pb-2 border-b">
                <div><strong>Property:</strong> {data.propertyName || '[Property Name]'}</div>
                <div><strong>Address:</strong> {data.address || '[Address]'}</div>
                <div><strong>Date:</strong> {data.dateVisited} | <strong>Inspector:</strong> {data.inspector || '[Name]'}</div>
              </div>

              <div className="font-bold mb-1">Condition Assessment:</div>
              <div className="space-y-1">
                {conditionAreas.map(area => (
                  <div key={area.key} className="text-xs">
                    <strong>{area.label}:</strong> {data.conditions[area.key].rating || 'Not rated'}
                    {data.conditions[area.key].notes && <div className="ml-2 text-gray-600">{data.conditions[area.key].notes}</div>}
                  </div>
                ))}
              </div>

              {data.maintenanceItems && (
                <div className="mt-2 pt-2 border-t border-gray-300">
                  <div className="font-bold mb-1">Priority Maintenance:</div>
                  <div className="text-xs whitespace-pre-wrap">{data.maintenanceItems}</div>
                </div>
              )}
            </div>

            <button
              onClick={generatePDF}
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
