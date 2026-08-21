'use client';

import { useState, lazy, Suspense } from 'react';
const PortfolioMap = lazy(() => import('../components/PortfolioMap'));

interface Property {
  name: string;
  address: string;
  city: string;
  state: string;
}

const properties: Property[] = [
  { name: '101 Caribbean Drive', address: '101 Caribbean Drive', city: 'Corpus Christi', state: 'TX' },
  { name: '1107 Hwy 80 E (Sign)', address: '1107 Hwy 80 E (Sign)', city: 'San Marcos', state: 'TX' },
  { name: '11183 Circle Dr.', address: '11183 Circle Dr.', city: 'Austin', state: 'TX' },
  { name: '11701 Old FM 2243 West', address: '11701 Old FM 2243 West', city: 'Leander', state: 'TX' },
  { name: '12705 Hwy 29 W', address: '12705 Hwy 29 W', city: 'Liberty Hill', state: 'TX' },
  { name: '13740 West Hwy 29', address: '13740 West Hwy 29', city: 'Liberty Hill', state: 'TX' },
  { name: '13750 Hwy 29 West', address: '13750 Hwy 29 West', city: 'Liberty Hill', state: 'TX' },
  { name: '18683 & 18685 FM 1431', address: '18683 & 18685 FM 1431', city: 'Jonestown', state: 'TX' },
  { name: '1909 E. William Cannon Dr.', address: '1909 E. William Cannon Dr.', city: 'Austin', state: 'TX' },
  { name: '201 FM 3237', address: '201 FM 3237', city: 'Wimberley', state: 'TX' },
  { name: '2010 E Oltorf St', address: '2010 E Oltorf St', city: 'Austin', state: 'TX' },
  { name: '2019 Clovis Barker Road', address: '2019 Clovis Barker Road', city: 'San Marcos', state: 'TX' },
  { name: '2100 Roselea Dr', address: '2100 Roselea Dr', city: 'Buchanan Dam', state: 'TX' },
  { name: '21730 County Rd 501', address: '21730 County Rd 501', city: 'Bayfield', state: 'CO' },
  { name: '2201 Lake Austin Blvd.', address: '2201 Lake Austin Blvd.', city: 'Austin', state: 'TX' },
  { name: '2410 Hunter Road', address: '2410 Hunter Road', city: 'San Marcos', state: 'TX' },
  { name: '2424 S Congress', address: '2424 S Congress', city: 'Austin', state: 'TX' },
  { name: '2443 E Hwy 71 Sign', address: '2443 E Hwy 71 Sign', city: 'Del Valle', state: 'TX' },
  { name: '2463 Hwy 71 East', address: '2463 Hwy 71 East', city: 'Del Valle', state: 'TX' },
  { name: '3000 RR 1869', address: '3000 RR 1869', city: 'Liberty Hill', state: 'TX' },
  { name: '305 E Morrow St', address: '305 E Morrow St', city: 'Georgetown', state: 'TX' },
  { name: '320 North Ridge Rd.', address: '320 North Ridge Rd.', city: 'Marble Falls', state: 'TX' },
  { name: '3301 Shell Road', address: '3301 Shell Road', city: 'Georgetown', state: 'TX' },
  { name: '3303 Shell Road', address: '3303 Shell Road', city: 'Georgetown', state: 'TX' },
  { name: '3317 N. Lamar', address: '3317 N. Lamar', city: 'Austin', state: 'TX' },
  { name: '3701 Drossett Drive', address: '3701 Drossett Drive', city: 'Austin', state: 'TX' },
  { name: '3900 S FM 620', address: '3900 S FM 620', city: 'Bee Caves', state: 'TX' },
  { name: '4005 Reynosa Dr', address: '4005 Reynosa Dr', city: 'Austin', state: 'TX' },
  { name: '4226 Laguna Shores', address: '4226 Laguna Shores', city: 'Corpus Christi', state: 'TX' },
  { name: '4234 Laguna Shores (Event Center & Parking Lot)', address: '4234 Laguna Shores', city: 'Corpus Christi', state: 'TX' },
  { name: '4242 Laguna Shores', address: '4242 Laguna Shores', city: 'Corpus Christi', state: 'TX' },
  { name: '4345 West Post Rd Bldg 10', address: '4345 West Post Rd Bldg 10', city: 'Las Vegas', state: 'NV' },
  { name: '5308 Burleson Rd.', address: '5308 Burleson Rd.', city: 'Austin', state: 'TX' },
  { name: '5506 Hwy 290 West', address: '5506 Hwy 290 West', city: 'Austin', state: 'TX' },
  { name: '5506 Hwy 290 West Sign', address: '5506 Hwy 290 West Sign', city: 'Austin', state: 'TX' },
  { name: '5508 N. Navarro', address: '5508 N. Navarro', city: 'Victoria', state: 'TX' },
  { name: '5615 FM 973 Bldg 1', address: '5615 S. FM 973 Bldg 1', city: 'Del Valle', state: 'TX' },
  { name: '5615 FM 973 Bldg 2', address: '5615 FM 973 Bldg 2', city: 'Del Valle', state: 'TX' },
  { name: '5615 FM 973 Bldg 3', address: '5615 FM 973 Bldg 3', city: 'Del Valle', state: 'TX' },
  { name: '5615 FM 973 Bldg 4', address: '5615 FM 973 Bldg 4', city: 'Del Valle', state: 'TX' },
  { name: '5615 FM 973 Bldg 5', address: '5615 FM 973 Bldg 5', city: 'Del Valle', state: 'TX' },
  { name: '5615 FM 973 Bldg 6', address: '5615 FM 973 Bldg 6', city: 'Del Valle', state: 'TX' },
  { name: '5615 FM 973 Bldg 7', address: '5615 FM 973 Bldg 7', city: 'Del Valle', state: 'TX' },
  { name: '5615 FM 973 Bldg 8', address: '5615 FM 973 Bldg 8', city: 'Del Valle', state: 'TX' },
  { name: '5615 FM 973 Bldg 9', address: '5615 FM 973 Bldg 9', city: 'Del Valle', state: 'TX' },
  { name: '5721 Burnet Rd', address: '5721 Burnet Rd', city: 'Austin', state: 'TX' },
  { name: '5801 Burnet Rd', address: '5801 Burnet Rd', city: 'Austin', state: 'TX' },
  { name: '5809 Burnet Rd', address: '5809 Burnet Rd', city: 'Austin', state: 'TX' },
  { name: '611 S. Lamar', address: '611 S. Lamar', city: 'Austin', state: 'TX' },
  { name: '6210 Hwy 290 West', address: '6210 Hwy 290 West', city: 'Austin', state: 'TX' },
  { name: '6214 B Hwy 290 West', address: '6214 B Hwy 290 West', city: 'Austin', state: 'TX' },
  { name: '6214 Hwy 290 Sign', address: '6214 Hwy 290 Sign', city: 'Austin', state: 'TX' },
  { name: '6230 S. Decatur Blvd. (Sign)', address: '6230 S. Decatur Blvd.', city: 'Las Vegas', state: 'NV' },
  { name: '6902 Scenic Brook', address: '6902 Scenic Brook', city: 'Austin', state: 'TX' },
  { name: '8111 Middle Court', address: '8111 Middle Court', city: 'Austin', state: 'TX' },
  { name: '813 Morrow St', address: '813 Morrow St', city: 'Austin', state: 'TX' },
  { name: '8600 Hwy 290 West', address: '8600 Hwy 290 West', city: 'Austin', state: 'TX' },
  { name: '8907 Circle Drive', address: '8907 Circle Drive', city: 'Austin', state: 'TX' },
  { name: '9110 US 183 S.', address: '9110 US 183 S.', city: 'Austin', state: 'TX' },
  { name: '9125 Hwy 71 West', address: '9125 Hwy 71 West', city: 'Austin', state: 'TX' },
  { name: '9616 E HWY 71', address: '9616 E HWY 71', city: 'Spicewood', state: 'TX' },
  { name: '9725 Circle Drive', address: '9725 Circle Drive', city: 'Austin', state: 'TX' },
  { name: '9820 Circle Dr', address: '9820 Circle Dr', city: 'Austin', state: 'TX' },
  { name: 'Bunton Creek Rd, 170 & 200', address: 'Bunton Creek Rd, 170 & 200', city: 'Kyle', state: 'TX' },
  { name: 'Liberty Meadows Plaza', address: '12701 Hwy 29 West', city: 'Liberty Hill', state: 'TX' },
  { name: 'Lockhart Property, 301 E San Antonio', address: '301 E San Antonio', city: 'Lockhart', state: 'TX' },
  { name: 'Naneyo General', address: '5716 Hwy 290 W Suite 200', city: 'Austin', state: 'TX' },
  { name: 'Oak Acres Shopping Center', address: '5716 Hwy 290 West', city: 'Austin', state: 'TX' },
  { name: 'Plaza Lofts Condo, 311 West 5th St. #100', address: '311 West 5th St. #100', city: 'Austin', state: 'TX' },
  { name: 'San Marcos Bldg, 1107-A Hwy 80 East', address: '1107-A Hwy 80 East', city: 'San Marcos', state: 'TX' },
  { name: 'Uvalde 190.97 Acres JackHawk Mountain', address: '190.97 Acres JackHawk Mountain', city: 'Uvalde', state: 'TX' },
];

export default function PortfolioPage() {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  const cities = ['All', ...Array.from(new Set(properties.map(p => p.city))).sort()];

  const filtered = properties.filter(p => {
    const searchMatch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const cityMatch = selectedCity === 'All' || p.city === selectedCity;
    return searchMatch && cityMatch;
  });

  const grouped = filtered.reduce((acc, p) => {
    const key = `${p.city}, ${p.state}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {} as Record<string, Property[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-gray-200">
            {properties.length} properties across Central Texas and beyond — owned and managed by LLPM since 1998.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-navy mb-2">Portfolio Map</h2>
          <p className="text-gray-500 text-sm mb-4">Click any pin to see property details.</p>
          <Suspense fallback={<div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">Loading map...</div>}>
            <PortfolioMap />
          </Suspense>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, address, or city..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            />
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-500 mt-2">{filtered.length} of {properties.length} properties shown</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.keys(grouped).sort().map(cityState => (
            <div key={cityState} className="mb-10">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center">
                <span className="w-2 h-6 bg-gold rounded mr-3 inline-block" />
                {cityState}
                <span className="ml-3 text-sm font-normal text-gray-400">
                  ({grouped[cityState].length})
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {grouped[cityState].map((property, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-gold transition"
                  >
                    <h3 className="font-semibold text-navy text-sm mb-1">{property.name}</h3>
                    <p className="text-gray-400 text-xs">{property.address}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-4">No properties match your search.</p>
              <button
                onClick={() => { setSearch(''); setSelectedCity('All'); }}
                className="bg-gold text-navy px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold mb-2">68+</div>
              <div className="text-gray-300">Properties Owned</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">215+</div>
              <div className="text-gray-300">Active Tenants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">10+</div>
              <div className="text-gray-300">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold mb-2">25+</div>
              <div className="text-gray-300">Years in Business</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
