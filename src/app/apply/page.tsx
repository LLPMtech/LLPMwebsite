import Link from 'next/link';

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Apply for Space</h1>
          <p className="text-xl text-gray-200">
            Download and complete the appropriate application below.
          </p>
        </div>
      </section>

      {/* Application Cards */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Commercial */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-navy px-8 py-5">
              <h2 className="text-2xl font-bold text-white">Commercial Application</h2>
              <p className="text-gray-300 text-sm mt-1">Office, retail, warehouse, and flex space</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-navy text-lg mb-3">What's Included</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Personal & business information</li>
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Credit history & banking references</li>
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Business credit references</li>
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Full financial statement</li>
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Credit report authorization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-3">You'll Also Need</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> Copy of Driver's License</li>
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> Copy of Social Security Card</li>
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> Business Plan</li>
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> Resume / Biography</li>
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> Certificate of Corporation (if applicable)</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/commercial-lease-application.pdf"
                  download
                  className="flex-1 text-center bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                >
                  📥 Download Commercial Application
                </a>
                <a
                  href="/tenant-contact-form.pdf"
                  download
                  className="flex-1 text-center bg-navy text-white px-6 py-3 rounded-lg font-bold hover:bg-rust-orange transition"
                >
                  📥 Download Tenant Contact Form
                </a>
              </div>
            </div>
          </div>

          {/* Residential */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-rust-orange px-8 py-5">
              <h2 className="text-2xl font-bold text-white">Residential Application</h2>
              <p className="text-orange-100 text-sm mt-1">Residential lease applicants</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-navy text-lg mb-3">What's Included</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Personal information & ID</li>
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Rental & employment history</li>
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Income & financial information</li>
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Occupant & pet information</li>
                    <li className="flex items-start"><span className="text-gold mr-2 font-bold">✓</span> Credit report authorization</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg mb-3">Important Notes</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> Each occupant 18+ must submit a separate application</li>
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> Co-applicants must submit separately</li>
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> View property before submitting if possible</li>
                    <li className="flex items-start"><span className="text-rust-orange mr-2 font-bold">→</span> Non-refundable application fee applies</li>
                  </ul>
                </div>
              </div>
              <a
                href="/residential-lease-application.pdf"
                download
                className="block text-center bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
              >
                📥 Download Residential Application
              </a>
            </div>
          </div>

          {/* Submission Instructions */}
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-bold text-navy mb-6">How to Submit Your Application</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-3">1</div>
                <h4 className="font-bold text-navy mb-2">Download</h4>
                <p className="text-gray-600 text-sm">Download and complete the appropriate application form above.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-3">2</div>
                <h4 className="font-bold text-navy mb-2">Complete</h4>
                <p className="text-gray-600 text-sm">Fill out all required fields and gather supporting documents.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-3">3</div>
                <h4 className="font-bold text-navy mb-2">Submit</h4>
                <p className="text-gray-600 text-sm">Email to pm@lifelong.com or drop off in person.</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
              <p className="text-gray-700 mb-4">
                Questions about the application process? We're happy to help.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:pm@lifelong.com"
                  className="inline-block bg-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-rust-orange transition text-sm"
                >
                  Email Us
                </a>
                <a
                  href="tel:5128926001"
                  className="inline-block bg-navy text-white px-6 py-2 rounded-lg font-semibold hover:bg-rust-orange transition text-sm"
                >
                  Call (512) 892-6001
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
