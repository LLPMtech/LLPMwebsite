import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-navy to-rust-orange text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Property Excellence in Central Texas
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Life Long Property Management delivers reliable, professional commercial property management with a focus on tenant satisfaction and property value.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="/properties"
                  className="bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                >
                  View Properties
                </Link>
                <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-navy transition"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="LLPM Logo"
                width={300}
                height={300}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-4">About LLPM</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since 1998, we've been managing commercial properties with integrity, professionalism, and a commitment to long-term value creation for our owners and tenants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl font-bold text-gold mb-4">240+</div>
              <h3 className="text-xl font-bold text-navy mb-2">Properties</h3>
              <p className="text-gray-600">
                Diverse portfolio across retail, office, warehouse, and flex space.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl font-bold text-gold mb-4">215+</div>
              <h3 className="text-xl font-bold text-navy mb-2">Active Tenants</h3>
              <p className="text-gray-600">
                Long-term partnerships built on trust and reliable service.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl font-bold text-gold mb-4">25+</div>
              <h3 className="text-xl font-bold text-navy mb-2">Years</h3>
              <p className="text-gray-600">
                Proven track record of excellence in property management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work with Us?</h2>
          <p className="text-xl mb-8">
            Explore our available properties or get in touch to learn more.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/apply"
              className="bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
            >
              Apply Now
            </Link>
            <Link
              href="/tenant-portal"
              className="border-2 border-gold text-gold px-8 py-3 rounded-lg font-bold hover:bg-gold hover:text-navy transition"
            >
              Tenant Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
