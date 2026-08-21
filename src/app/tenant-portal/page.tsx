import Link from 'next/link';

export default function TenantPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Tenant Portal</h1>
          <p className="text-xl text-gray-200">
            Access your account, pay rent, and submit maintenance requests.
          </p>
        </div>
      </section>

      {/* Portal Options */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Commercial */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-navy px-8 py-5">
              <h2 className="text-2xl font-bold text-white">Commercial Tenants</h2>
              <p className="text-gray-300 text-sm mt-1">Office, retail, warehouse, and flex space tenants</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-navy text-lg mb-3">Commercial Café</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    View your lease, make payments, access documents, and communicate with our team.
                  </p>
                  <a
                    href="https://www.commercialcafe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                  >
                    Log In to Commercial Café →
                  </a>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-navy text-lg mb-3">Maintenance Request</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Submit a maintenance or repair request for your commercial space.
                  </p>
                  <a
                    href="https://www.commercialcafe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-rust-orange text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                  >
                    Submit Maintenance Request →
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-gray-600">
                <strong className="text-navy">First time logging in?</strong> Contact us at{' '}
                <a href="mailto:pm@lifelong.com" className="text-navy font-semibold underline">
                  pm@lifelong.com
                </a>{' '}
                or call{' '}
                <a href="tel:5128926001" className="text-navy font-semibold underline">
                  (512) 892-6001
                </a>{' '}
                for your login credentials.
              </div>
            </div>
          </div>

          {/* Residential */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-rust-orange px-8 py-5">
              <h2 className="text-2xl font-bold text-white">Residential Tenants</h2>
              <p className="text-orange-100 text-sm mt-1">Residential and apartment tenants</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-navy text-lg mb-3">Rent Café</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Pay rent online, view your lease, and manage your residential account.
                  </p>
                  <a
                    href="https://www.rentcafe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                  >
                    Log In to Rent Café →
                  </a>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-navy text-lg mb-3">Maintenance Request</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    Submit a maintenance or repair request for your residential unit.
                  </p>
                  <a
                    href="https://www.rentcafe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-rust-orange text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                  >
                    Submit Maintenance Request →
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-gray-600">
                <strong className="text-navy">First time logging in?</strong> Contact us at{' '}
                <a href="mailto:pm@lifelong.com" className="text-navy font-semibold underline">
                  pm@lifelong.com
                </a>{' '}
                or call{' '}
                <a href="tel:5128926001" className="text-navy font-semibold underline">
                  (512) 892-6001
                </a>{' '}
                for your login credentials.
              </div>
            </div>
          </div>

          {/* What You Can Do */}
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-navy mb-6">What You Can Do in Your Portal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Pay rent online',
                'View lease terms and renewal info',
                'Submit and track maintenance requests',
                'Access important documents and notices',
                'View payment history',
                'Communicate directly with our team',
              ].map((item) => (
                <div key={item} className="flex items-center">
                  <span className="text-gold font-bold mr-3">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-600 mb-4">Need help? Our team is here for you.</p>
              <Link
                href="/contact"
                className="inline-block bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-rust-orange transition"
              >
                Contact Support
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
