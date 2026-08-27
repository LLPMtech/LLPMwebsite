import Link from 'next/link';

const guidelines = [
  { icon: '🎨', title: 'Brand Colors', body: 'Navy #1F3A5F · Rust Orange #C85A17 · Gold #F5A623 · White #FFFFFF' },
  { icon: '🖋', title: 'Typography', body: 'Arial or similar sans-serif. Bold for headlines, regular for body copy.' },
  { icon: '📐', title: 'Logo Usage', body: 'Always use the transparent background PNG logo. Do not stretch, recolor, or place on busy backgrounds.' },
  { icon: '📸', title: 'Photos', body: 'Use high-resolution aerial and property photos. Minimum 1200px wide for print quality.' },
  { icon: '📄', title: 'File Format', body: 'Save flyers as PDF for email and LoopNet uploads.' },
  { icon: '✏️', title: 'Editing', body: 'Use the generators below — no PowerPoint needed.' },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Marketing</h1>
          <p className="text-gray-300">Internal use only · Generate professional property flyers in minutes.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Generators */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">📄 Flyer Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-navy px-6 py-4">
                <h3 className="text-white font-bold text-xl">One-Page Flyer</h3>
                <p className="text-gray-300 text-sm mt-1">Quick single-page flyer — perfect for email and LoopNet</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> Upload 1-2 property photos</li>
                  <li className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> Fill in property details</li>
                  <li className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> Click generate → Save as PDF</li>
                  <li className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> No PowerPoint needed</li>
                </ul>
                <a href="/flyer"
                  className="block w-full text-center bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                  Generate One-Page Flyer →
                </a>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-rust-orange px-6 py-4">
                <h3 className="text-white font-bold text-xl">5-Page Listing Package</h3>
                <p className="text-orange-100 text-sm mt-1">Full presentation package for serious prospects</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> Aerial, exterior & map photos</li>
                  <li className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> Cover, overview, site details, access & back cover</li>
                  <li className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> "Why This Property" selling points</li>
                  <li className="flex items-center gap-2"><span className="text-gold font-bold">✓</span> Drive time cards</li>
                </ul>
                <a href="/flyer5"
                  className="block w-full text-center bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
                  Generate 5-Page Package →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">📋 How It Works</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              {[
                { num: '1', title: 'Open Generator', body: 'Click one of the generator buttons above.' },
                { num: '2', title: 'Upload Photos', body: 'Upload your aerial, exterior, and/or map photos.' },
                { num: '3', title: 'Fill in Details', body: 'Enter property info, stats, and contact details.' },
                { num: '4', title: 'Save as PDF', body: 'Click Generate → print dialog → Save as PDF.' },
              ].map(step => (
                <div key={step.num}>
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-3">{step.num}</div>
                  <h3 className="font-bold text-navy mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Guidelines */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">🎨 Brand Guidelines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guidelines.map((g, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="text-2xl mb-2">{g.icon}</div>
                <h3 className="font-bold text-navy mb-2">{g.title}</h3>
                <p className="text-gray-600 text-sm">{g.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Color Swatches */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">🎨 Brand Colors</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { name: 'Navy', hex: '#1F3A5F', bg: 'bg-navy', text: 'text-white' },
                { name: 'Rust Orange', hex: '#C85A17', bg: 'bg-rust-orange', text: 'text-white' },
                { name: 'Gold', hex: '#F5A623', bg: 'bg-gold', text: 'text-navy' },
                { name: 'White', hex: '#FFFFFF', bg: 'bg-white', text: 'text-navy' },
              ].map(c => (
                <div key={c.name} className="text-center">
                  <div className={`${c.bg} rounded-lg h-20 mb-3 border border-gray-200 flex items-center justify-center`}>
                    <span className={`${c.text} text-xs font-mono font-bold`}>{c.hex}</span>
                  </div>
                  <p className="text-sm font-bold text-navy">{c.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">🖼 Logo</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img src="/logo.png" alt="LLPM Logo" className="h-24 w-auto" />
              <div className="flex-1">
                <h3 className="font-bold text-navy mb-2">Life Long Property Management Logo</h3>
                <p className="text-gray-600 text-sm mb-4">Transparent background PNG. Use on all marketing materials.</p>
                <a href="/logo.png" download="LLPM_Logo.png"
                  className="inline-block bg-navy text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-rust-orange transition">
                  📥 Download Logo PNG
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Request */}
        <div className="bg-navy rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Something Else?</h2>
          <p className="text-gray-300 mb-6">Request a new marketing tool or report a problem.</p>
          <a href="mailto:lindsey@lifelongpm.com?subject=Marketing Request"
            className="inline-block bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">
            Contact Lindsey
          </a>
        </div>

      </div>
    </div>
  );
}
