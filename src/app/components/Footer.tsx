import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Life Long Property Management</h3>
            <p className="text-gray-300 text-sm">
              Commercial property management serving Central Texas with integrity and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/properties" className="text-gray-300 hover:text-gold transition">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/tenant-portal" className="text-gray-300 hover:text-gold transition">
                  Tenant Portal
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-gray-300 hover:text-gold transition">
                  Apply
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-gold transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300 text-sm mb-2">
              <strong>Phone:</strong> (512) 892-6001
            </p>
            <p className="text-gray-300 text-sm mb-2">
              <strong>Email:</strong> pm@lifelong.com
            </p>
            <p className="text-gray-300 text-sm">
              <strong>Address:</strong> 5716 Hwy 290 West #200, Austin, TX 78735
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Life Long Property Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
