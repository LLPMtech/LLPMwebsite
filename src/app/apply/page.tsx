import Link from 'next/link';

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Apply for Space</h1>
          <p className="text-xl text-gray-200">
            Submit your application for available commercial properties.
          </p>
        </div>
      </section>

      {/* Application Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-navy mb-6">
              Interested in Leasing Space?
            </h2>

            <p className="text-lg text-gray-600 mb-8">
              We're committed to finding the right tenant for our properties. To get started, please complete our comprehensive application form below.
            </p>

            {/* Application Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
              <h3 className="text-xl font-bold text-navy mb-6">Application Process</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gold text-navy font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-navy">Download Application</h4>
                    <p className="text-gray-600">Get the application form below</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gold text-navy font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-navy">Complete Information</h4>
                    <p className="text-gray-600">Provide your business and financial details</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gold text-navy font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-navy">Submit & Review</h4>
                    <p className="text-gray-600">Our team reviews your application promptly</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-gold text-navy font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-navy">Follow Up</h4>
                    <p className="text-gray-600">We'll contact you within 2-3 business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form Section */}
            <div className="border-2 border-gold rounded-lg p-8 bg-gold bg-opacity-5 mb-8">
              <h3 className="text-2xl font-bold text-navy mb-4">Download Application Form</h3>
              <p className="text-gray-600 mb-6">
                Please download and complete the application form. Once filled out, you can email it to us or submit it in person.
              </p>
              <div className="space-y-4">
                <a
                  href="#"
                  className="inline-block bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                >
                  📥 Download Application PDF
                </a>
                <p className="text-sm text-gray-600">
                  Note: Replace the "#" link above with your actual PDF link once it's ready
                </p>
              </div>
            </div>

            {/* Quick Contact CTA */}
            <div className="bg-navy text-white rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
              <p className="mb-6 text-gray-200">
                Our team is ready to help answer any questions about our available properties and the application process.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
              >
                Contact Us Now
              </Link>
            </div>

            {/* Required Information Checklist */}
            <div className="mt-12 pt-12 border-t border-gray-200">
              <h3 className="text-xl font-bold text-navy mb-6">What Information You'll Need</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-navy mb-3">Business Information</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>✓ Business name & type</li>
                    <li>✓ Years in business</li>
                    <li>✓ Number of employees</li>
                    <li>✓ Business description</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-3">Financial & References</h4>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>✓ Financial statements</li>
                    <li>✓ Bank references</li>
                    <li>✓ Trade references</li>
                    <li>✓ Personal guarantor info</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
