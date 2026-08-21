'use client';

import { useEffect, useRef } from 'react';

interface Property {
  name: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

const properties: Property[] = [
  { name: '101 Caribbean Drive', address: '101 Caribbean Drive', city: 'Corpus Christi', state: 'TX', lat: 27.7543, lng: -97.4186 },
  { name: '11183 Circle Dr.', address: '11183 Circle Dr.', city: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
  { name: '11701 Old FM 2243 West', address: '11701 Old FM 2243 West', city: 'Leander', state: 'TX', lat: 30.5788, lng: -97.8531 },
  { name: '12705 Hwy 29 W', address: '12705 Hwy 29 W', city: 'Liberty Hill', state: 'TX', lat: 30.6624, lng: -97.9317 },
  { name: '13740 West Hwy 29', address: '13740 West Hwy 29', city: 'Liberty Hill', state: 'TX', lat: 30.6645, lng: -97.9401 },
  { name: '13750 Hwy 29 West', address: '13750 Hwy 29 West', city: 'Liberty Hill', state: 'TX', lat: 30.6647, lng: -97.9405 },
  { name: '18683 & 18685 FM 1431', address: '18683 & 18685 FM 1431', city: 'Jonestown', state: 'TX', lat: 30.4985, lng: -97.9317 },
  { name: '1909 E. William Cannon Dr.', address: '1909 E. William Cannon Dr.', city: 'Austin', state: 'TX', lat: 30.1857, lng: -97.7669 },
  { name: '201 FM 3237', address: '201 FM 3237', city: 'Wimberley', state: 'TX', lat: 29.9974, lng: -98.0986 },
  { name: '2010 E Oltorf St', address: '2010 E Oltorf St', city: 'Austin', state: 'TX', lat: 30.2321, lng: -97.7198 },
  { name: '2019 Clovis Barker Road', address: '2019 Clovis Barker Road', city: 'San Marcos', state: 'TX', lat: 29.8927, lng: -97.9114 },
  { name: '2100 Roselea Dr', address: '2100 Roselea Dr', city: 'Buchanan Dam', state: 'TX', lat: 30.7474, lng: -98.4195 },
  { name: '2201 Lake Austin Blvd.', address: '2201 Lake Austin Blvd.', city: 'Austin', state: 'TX', lat: 30.2849, lng: -97.7837 },
  { name: '2410 Hunter Road', address: '2410 Hunter Road', city: 'San Marcos', state: 'TX', lat: 29.8819, lng: -97.9203 },
  { name: '2424 S Congress', address: '2424 S Congress', city: 'Austin', state: 'TX', lat: 30.2382, lng: -97.7502 },
  { name: '2443 E Hwy 71', address: '2443 E Hwy 71', city: 'Del Valle', state: 'TX', lat: 30.1943, lng: -97.6614 },
  { name: '2463 Hwy 71 East', address: '2463 Hwy 71 East', city: 'Del Valle', state: 'TX', lat: 30.1941, lng: -97.6601 },
  { name: '3000 RR 1869', address: '3000 RR 1869', city: 'Liberty Hill', state: 'TX', lat: 30.6743, lng: -97.9124 },
  { name: '305 E Morrow St', address: '305 E Morrow St', city: 'Georgetown', state: 'TX', lat: 30.6327, lng: -97.6774 },
  { name: '320 North Ridge Rd.', address: '320 North Ridge Rd.', city: 'Marble Falls', state: 'TX', lat: 30.5782, lng: -98.2724 },
  { name: '3301 Shell Road', address: '3301 Shell Road', city: 'Georgetown', state: 'TX', lat: 30.6187, lng: -97.6934 },
  { name: '3303 Shell Road', address: '3303 Shell Road', city: 'Georgetown', state: 'TX', lat: 30.6189, lng: -97.6936 },
  { name: '3317 N. Lamar', address: '3317 N. Lamar', city: 'Austin', state: 'TX', lat: 30.3097, lng: -97.7431 },
  { name: '3701 Drossett Drive', address: '3701 Drossett Drive', city: 'Austin', state: 'TX', lat: 30.1774, lng: -97.7798 },
  { name: '3900 S FM 620', address: '3900 S FM 620', city: 'Bee Caves', state: 'TX', lat: 30.3082, lng: -97.9317 },
  { name: '4005 Reynosa Dr', address: '4005 Reynosa Dr', city: 'Austin', state: 'TX', lat: 30.2256, lng: -97.7614 },
  { name: '4226 Laguna Shores', address: '4226 Laguna Shores', city: 'Corpus Christi', state: 'TX', lat: 27.7234, lng: -97.3891 },
  { name: '4234 Laguna Shores', address: '4234 Laguna Shores', city: 'Corpus Christi', state: 'TX', lat: 27.7236, lng: -97.3893 },
  { name: '4242 Laguna Shores', address: '4242 Laguna Shores', city: 'Corpus Christi', state: 'TX', lat: 27.7238, lng: -97.3895 },
  { name: '4345 West Post Rd Bldg 10', address: '4345 West Post Rd', city: 'Las Vegas', state: 'NV', lat: 36.1745, lng: -115.2103 },
  { name: '5308 Burleson Rd.', address: '5308 Burleson Rd.', city: 'Austin', state: 'TX', lat: 30.2023, lng: -97.7312 },
  { name: '5506 Hwy 290 West', address: '5506 Hwy 290 West', city: 'Austin', state: 'TX', lat: 30.2934, lng: -97.8312 },
  { name: '5508 N. Navarro', address: '5508 N. Navarro', city: 'Victoria', state: 'TX', lat: 28.8270, lng: -97.0036 },
  { name: '5615 FM 973 (The Hangars)', address: '5615 FM 973', city: 'Del Valle', state: 'TX', lat: 30.1712, lng: -97.6023 },
  { name: '5721 Burnet Rd', address: '5721 Burnet Rd', city: 'Austin', state: 'TX', lat: 30.3412, lng: -97.7398 },
  { name: '5801 Burnet Rd', address: '5801 Burnet Rd', city: 'Austin', state: 'TX', lat: 30.3432, lng: -97.7401 },
  { name: '5809 Burnet Rd', address: '5809 Burnet Rd', city: 'Austin', state: 'TX', lat: 30.3445, lng: -97.7403 },
  { name: '611 S. Lamar', address: '611 S. Lamar', city: 'Austin', state: 'TX', lat: 30.2598, lng: -97.7512 },
  { name: '6210 Hwy 290 West', address: '6210 Hwy 290 West', city: 'Austin', state: 'TX', lat: 30.2956, lng: -97.8423 },
  { name: '6214 B Hwy 290 West', address: '6214 B Hwy 290 West', city: 'Austin', state: 'TX', lat: 30.2958, lng: -97.8427 },
  { name: '6902 Scenic Brook', address: '6902 Scenic Brook', city: 'Austin', state: 'TX', lat: 30.2134, lng: -97.8834 },
  { name: '8111 Middle Court', address: '8111 Middle Court', city: 'Austin', state: 'TX', lat: 30.2234, lng: -97.8634 },
  { name: '813 Morrow St', address: '813 Morrow St', city: 'Austin', state: 'TX', lat: 30.2712, lng: -97.7398 },
  { name: '8600 Hwy 290 West', address: '8600 Hwy 290 West', city: 'Austin', state: 'TX', lat: 30.3012, lng: -97.8934 },
  { name: '8907 Circle Drive', address: '8907 Circle Drive', city: 'Austin', state: 'TX', lat: 30.2812, lng: -97.8534 },
  { name: '9110 US 183 S.', address: '9110 US 183 S.', city: 'Austin', state: 'TX', lat: 30.1934, lng: -97.7812 },
  { name: '9125 Hwy 71 West', address: '9125 Hwy 71 West', city: 'Austin', state: 'TX', lat: 30.2534, lng: -97.9234 },
  { name: '9616 E HWY 71', address: '9616 E HWY 71', city: 'Spicewood', state: 'TX', lat: 30.4234, lng: -98.1234 },
  { name: '9725 Circle Drive', address: '9725 Circle Drive', city: 'Austin', state: 'TX', lat: 30.2912, lng: -97.8634 },
  { name: '9820 Circle Dr', address: '9820 Circle Dr', city: 'Austin', state: 'TX', lat: 30.2934, lng: -97.8656 },
  { name: 'Bunton Creek Rd', address: 'Bunton Creek Rd 170 & 200', city: 'Kyle', state: 'TX', lat: 29.9834, lng: -97.8634 },
  { name: 'Liberty Meadows Plaza', address: '12701 Hwy 29 West', city: 'Liberty Hill', state: 'TX', lat: 30.6634, lng: -97.9312 },
  { name: 'Lockhart Property', address: '301 E San Antonio', city: 'Lockhart', state: 'TX', lat: 29.8834, lng: -97.6734 },
  { name: 'Oak Acres Shopping Center', address: '5716 Hwy 290 West', city: 'Austin', state: 'TX', lat: 30.2945, lng: -97.8434 },
  { name: 'Plaza Lofts Condo', address: '311 West 5th St. #100', city: 'Austin', state: 'TX', lat: 30.2698, lng: -97.7434 },
  { name: 'San Marcos Bldg', address: '1107-A Hwy 80 East', city: 'San Marcos', state: 'TX', lat: 29.8834, lng: -97.9312 },
  { name: 'Uvalde JackHawk Mountain', address: '190.97 Acres', city: 'Uvalde', state: 'TX', lat: 29.2134, lng: -99.7834 },
  { name: '21730 County Rd 501', address: '21730 County Rd 501', city: 'Bayfield', state: 'CO', lat: 37.2234, lng: -107.5934 },
  { name: '6230 S. Decatur Blvd.', address: '6230 S. Decatur Blvd.', city: 'Las Vegas', state: 'NV', lat: 36.0834, lng: -115.1934 },
];

export default function PortfolioMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Fix default marker icons
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Custom navy marker
      const navyIcon = L.divIcon({
        className: '',
        html: `<div style="width:12px;height:12px;background:#1F3A5F;border:2px solid #F5A623;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.4)"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const map = L.map(mapRef.current, {
        center: [30.2672, -97.7431],
        zoom: 7,
      });

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      properties.forEach((p) => {
        L.marker([p.lat, p.lng], { icon: navyIcon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:sans-serif;min-width:160px">
              <strong style="color:#1F3A5F;font-size:14px">${p.name}</strong><br/>
              <span style="color:#666;font-size:12px">${p.address}</span><br/>
              <span style="color:#666;font-size:12px">${p.city}, ${p.state}</span>
            </div>
          `);
      });
    });

    return () => {
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div
        ref={mapRef}
        style={{ height: '500px', width: '100%', borderRadius: '8px', zIndex: 0 }}
      />
    </>
  );
}
