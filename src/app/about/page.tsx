import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            A family business rooted in Austin, built on decades of entrepreneurship, and committed to long-term ownership.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Life Long Property Management was born from an Austin original. Kris Hawkins — a true Austinite through and through — founded Doc Holidays, a brand that grew from local roots into a nationwide presence before being acquired by Cash America.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                But Kris kept the land.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                That decision — to hold onto the real estate while selling the business — became the foundation of what is today Life Long Property Management. What started as a natural extension of entrepreneurship has grown into a portfolio of over 68 properties and more than 200 active tenants across Central Texas and beyond.
              </p>
            </div>
            <div className="bg-gradient-to-br from-navy to-rust-orange rounded-2xl p-12 text-white text-center">
              <Image
                src="/logo.png"
                alt="LLPM Logo"
                width={200}
                height={200}
                className="mx-auto mb-6 h-auto"
              />
              <p className="text-lg font-semibold">Est. 1998</p>
              <p className="text-gray-300 text-sm">Austin, Texas</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-20" />

          {/* How We Operate */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-navy mb-6">How We Operate</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Owner-Operated</h3>
                <p className="text-gray-600">
                  We exclusively manage our own assets. Every property in our portfolio is owned by LLPM or its affiliated entities — we have skin in the game on every decision we make.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Family Business</h3>
                <p className="text-gray-600">
                  We're not a corporate property management company. We're a family business that treats tenants like long-term partners — because that's exactly what they are.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">Always Growing</h3>
                <p className="text-gray-600">
                  While we don't manage third-party properties, we're always looking to acquire new cash-flow properties. If you have a property worth considering, we'd love to talk.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mb-20" />

          {/* Stats */}
          <div className="bg-navy rounded-2xl p-12 text-white mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">LLPM By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-gold mb-2">25+</div>
                <div className="text-gray-300">Years in Business</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gold mb-2">68+</div>
                <div className="text-gray-300">Properties Owned</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gold mb-2">200+</div>
                <div className="text-gray-300">Active Tenants</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-gold mb-2">10+</div>
                <div className="text-gray-300">Cities</div>
              </div>
            </div>
          </div>

          {/* Acquisition CTA */}
          <div className="bg-gradient-to-r from-gold to-rust-orange rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">Have a Property Worth Considering?</h2>
            <p className="text-navy text-lg mb-8 max-w-2xl mx-auto">
              We're always looking to acquire cash-flow properties in Central Texas and beyond. If you have something worth talking about, we'd love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-navy text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
