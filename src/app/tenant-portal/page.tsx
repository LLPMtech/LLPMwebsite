import Link from 'next/link';

export default function TenantPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Tenant Portal</h1>
          <p className="text-xl text-gray-200">
            Manage your lease and property information online.
          </p>
        </div>
      </section>

      {/* Portal Access */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-navy mb-6">
              Commercial Cafe Tenant Portal
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Access your lease details, submit maintenance requests, view documents, and communicate with our property management team.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-navy mb-4">What You Can Do:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">✓</span>
                  <span>View your lease terms and renewal information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">✓</span>
                  <span>Submit and track maintenance requests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">✓</span>
                  <span>Access important documents and notices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">✓</span>
                  <span>Communicate directly with our team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3 font-bold">✓</span>
                  <span>View property announcements and updates</span>
                </li>
              </ul>
            </div>

            <a
              href="https://www.commercialcafe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-navy px-12 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition"
            >
              Log In to Tenant Portal
            </a>

            <p className="text-sm text-gray-600 mt-8">
              First time logging in? Contact us at{' '}
              <a href="mailto:info@lifelongpropertymanagement.com" className="text-navy font-semibold">
                info@lifelongpropertymanagement.com
              </a>{' '}
              for your login credentials.
            </p>
          </div>

          {/* Additional Support */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-navy mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-6">
                Our team is here to assist with any questions about your lease or property.
              </p>
              <Link
                href="/contact"
                className="text-gold font-semibold hover:text-rust-orange transition"
              >
                Contact Support →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-navy mb-4">Quick Resources</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a href="#" className="hover:text-rust-orange transition font-semibold">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rust-orange transition font-semibold">
                    Maintenance Request Form
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rust-orange transition font-semibold">
                    Policy Documents
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
