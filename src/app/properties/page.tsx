'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  address: string;
  type: 'Retail' | 'Office' | 'Warehouse' | 'Flex';
  status: 'For Lease' | 'For Sale';
  loopnetUrl: string;
  description: string;
}

const properties: Property[] = [
  {
    id: '1',
    name: 'Liberty Meadows Plaza',
    address: '12701 W Tx-29 Hwy, Liberty Hill, TX 78642',
    type: 'Retail',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/Listing/12701-W-Tx-29-Hwy-Liberty-Hill-TX/19745022/',
    description: 'Newly renovated strip center with pylon signage, dedicated turn lane, and 63 parking spaces.',
  },
  {
    id: '2',
    name: 'Rio Gabriel Plaza',
    address: '13750 W Highway 29, Liberty Hill, TX 78642',
    type: 'Retail',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/Listing/13740-W-State-Highway-29-Liberty-Hill-TX/38626189/',
    description: 'Retail space in Liberty Hill\'s growing corridor along W Highway 29.',
  },
  {
    id: '3',
    name: '13740 W State Highway 29',
    address: '13740 W State Highway 29, Liberty Hill, TX 78642',
    type: 'Retail',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/Listing/13740-W-State-Highway-29-Liberty-Hill-TX/38626189/',
    description: 'High-visibility retail space along State Highway 29 in Liberty Hill.',
  },
  {
    id: '4',
    name: 'Ranchitos Office',
    address: '3303 Shell Rd, Georgetown, TX 78628',
    type: 'Office',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/',
    description: 'Professional office space in Georgetown.',
  },
  {
    id: '5',
    name: '320 N Ridge',
    address: '320 N Ridge Rd, Marble Falls, TX 78654',
    type: 'Flex',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/',
    description: 'Versatile flex space in Marble Falls suitable for a variety of commercial uses.',
  },
  {
    id: '6',
    name: '2019 Clovis R Barker Rd - Warehouse or Office',
    address: '2019 Clovis R Barker Rd, San Marcos, TX 78666',
    type: 'Office',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/',
    description: 'Flexible warehouse or office space in San Marcos.',
  },
  {
    id: '7',
    name: 'MoPac 6 - Lab Space',
    address: '3701 Drossett Dr, Austin, TX 78744',
    type: 'Flex',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/',
    description: 'Specialized lab and flex space near MoPac in South Austin.',
  },
  {
    id: '8',
    name: '1909 E William Cannon Dr',
    address: '1909 E William Cannon Dr, Austin, TX 78744',
    type: 'Retail',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/',
    description: 'Retail space on high-traffic East William Cannon Drive in South Austin.',
  },
  {
    id: '9',
    name: '9125 W Highway 71',
    address: '9125 W Highway 71, Austin, TX 78735',
    type: 'Retail',
    status: 'For Lease',
    loopnetUrl: 'https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/',
    description: 'Retail space along West Highway 71 in Austin.',
  },
  {
    id: '10',
    name: '5508 N Navarro St',
    address: '5508 N Navarro St, Victoria, TX 77904',
    type: 'Retail',
    status: 'For Sale',
    loopnetUrl: 'https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/',
    description: 'Retail property for sale in Victoria, TX.',
  },
];

const typeColors: Record<string, string> = {
  Retail: 'bg-blue-100 text-blue-800',
  Office: 'bg-green-100 text-green-800',
  Warehouse: 'bg-yellow-100 text-yellow-800',
  Flex: 'bg-purple-100 text-purple-800',
};

export default function PropertiesPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const types = ['All', 'Retail', 'Office', 'Warehouse', 'Flex'];
  const statuses = ['All', 'For Lease', 'For Sale'];

  const filtered = properties.filter((p) => {
    const typeMatch = selectedType === 'All' || p.type === selectedType;
    const statusMatch = selectedStatus === 'All' || p.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Available Properties</h1>
          <p className="text-xl text-gray-200 mb-6">
            Commercial spaces for lease and sale across Central Texas.
          </p>
          <a
            href="https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            View All Listings on LoopNet →
          </a>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 items-center">
            <div>
              <span className="text-sm font-medium text-navy mr-3">Type:</span>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`mr-2 px-3 py-1 rounded-lg text-sm font-medium transition ${
                    selectedType === type
                      ? 'bg-gold text-navy'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <div>
              <span className="text-sm font-medium text-navy mr-3">Status:</span>
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`mr-2 px-3 py-1 rounded-lg text-sm font-medium transition ${
                    selectedStatus === status
                      ? 'bg-gold text-navy'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-500 text-sm mb-6">{filtered.length} properties found</p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
                >
                  {/* Color Banner */}
                  <div className="h-3 bg-gradient-to-r from-navy to-rust-orange" />

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[property.type]}`}>
                        {property.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        property.status === 'For Lease'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {property.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-navy mb-1">{property.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{property.address}</p>
                    <p className="text-gray-600 text-sm mb-6 flex-1">{property.description}</p>

                    <a
                      href={property.loopnetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-navy text-white py-2 rounded-lg hover:bg-rust-orange transition font-medium"
                    >
                      View on LoopNet →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No properties match your filters.</p>
              <button
                onClick={() => { setSelectedType('All'); setSelectedStatus('All'); }}
                className="bg-gold text-navy px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* LoopNet CTA */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for something specific?</h2>
          <p className="text-lg mb-8 text-gray-200">
            View our full portfolio of available listings on LoopNet, or contact us directly to discuss your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.loopnet.com/company/hawkins-family-partners/4ev29nll/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              View All on LoopNet
            </a>
            <Link
              href="/contact"
              className="border-2 border-gold text-gold px-8 py-3 rounded-lg font-bold hover:bg-gold hover:text-navy transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
