'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  address: string;
  type: 'Retail' | 'Office' | 'Warehouse' | 'Flex';
  size: string;
  available: boolean;
  description: string;
  image?: string;
}

// Sample data - replace with dynamic data from your backend
const properties: Property[] = [
  {
    id: '1',
    name: 'The Hangars - Building A',
    address: 'Del Valle, Austin TX',
    type: 'Warehouse',
    size: '5,000 SF',
    available: true,
    description: 'Climate-controlled warehouse space ideal for light manufacturing or storage.',
  },
  {
    id: '2',
    name: 'Downtown Office Plaza',
    address: 'Central Austin, TX',
    type: 'Office',
    size: '2,500 SF',
    available: false,
    description: 'Professional office space with modern amenities and parking.',
  },
  {
    id: '3',
    name: 'Retail Center - Suite 100',
    address: 'East Austin, TX',
    type: 'Retail',
    size: '1,200 SF',
    available: true,
    description: 'High-traffic retail location with excellent visibility and accessibility.',
  },
  {
    id: '4',
    name: 'Flex Industrial Space',
    address: 'Industrial District, Austin TX',
    type: 'Flex',
    size: '8,000 SF',
    available: true,
    description: 'Versatile flex space suitable for various commercial uses.',
  },
  {
    id: '5',
    name: 'Tech Park Office Suite',
    address: 'North Austin, TX',
    type: 'Office',
    size: '3,200 SF',
    available: true,
    description: 'Modern office with collaborative workspace and tech-ready infrastructure.',
  },
  {
    id: '6',
    name: 'Neighborhood Retail',
    address: 'West Lake Hills, TX',
    type: 'Retail',
    size: '900 SF',
    available: false,
    description: 'Corner retail location with good foot traffic.',
  },
];

export default function PropertiesPage() {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const types = ['All', 'Retail', 'Office', 'Warehouse', 'Flex'];

  const filtered = properties.filter((p) => {
    const typeMatch = selectedType === 'All' || p.type === selectedType;
    const availMatch = !showAvailableOnly || p.available;
    return typeMatch && availMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Properties</h1>
          <p className="text-xl text-gray-200">
            Explore our diverse portfolio of commercial spaces across Central Texas.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Property Type
              </label>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedType === type
                        ? 'bg-gold text-navy'
                        : 'bg-gray-200 text-navy hover:bg-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability Filter */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-sm font-medium text-navy">
                  Available Only
                </span>
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  {/* Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-gold to-rust-orange flex items-center justify-center text-white">
                    <span className="text-sm font-bold">{property.type}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-navy">{property.name}</h3>
                      {property.available ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                          Leased
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{property.address}</p>

                    <div className="flex justify-between mb-4 text-sm">
                      <span className="text-navy font-semibold">{property.size}</span>
                      <span className="text-gray-500">{property.type}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6">{property.description}</p>

                    <Link
                      href={`/properties/${property.id}`}
                      className="inline-block w-full text-center bg-navy text-white py-2 rounded-lg hover:bg-rust-orange transition font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No properties match your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedType('All');
                  setShowAvailableOnly(false);
                }}
                className="bg-gold text-navy px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't see what you're looking for?</h2>
          <p className="text-lg mb-8 text-gray-200">
            Contact us to learn about other opportunities or to discuss custom solutions.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
