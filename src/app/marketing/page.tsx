import Link from 'next/link';

interface Template {
  name: string;
  description: string;
  file: string;
  fileType: string;
  pages: string;
  use: string;
  updatedDate: string;
}

const templates: Template[] = [
  {
    name: 'Listing Flyer — Multi-Page',
    description: 'Full 5-slide listing presentation with cover, property overview, site details, location & access, and back cover. Branded with LLPM colors and logo.',
    file: '/templates/LLPM_Listing_Flyer_Template.pptx',
    fileType: 'PPTX',
    pages: '5 slides',
    use: 'LoopNet, Email, Print',
    updatedDate: 'August 2026',
  },
  {
    name: 'Listing Flyer — Portrait (Info Sheet)',
    description: 'Single-page portrait format packed with property details. Header, large photo, key stats bar, and full property details table. Best for prospects who want all the facts.',
    file: '/templates/LLPM_OnePager_Portrait.pptx',
    fileType: 'PPTX',
    pages: '1 slide',
    use: 'Email, Print, LoopNet',
    updatedDate: 'August 2026',
  },
  {
    name: 'Listing Flyer — One Page (Landscape)',
    description: 'Single-slide high-impact flyer with navy left panel, property name, key stats, two photo placeholders, property highlights, and contact footer. Perfect for quick email sends.',
    file: '/templates/LLPM_OnePager_Template.pptx',
    fileType: 'PPTX',
    pages: '1 slide',
    use: 'Email, LoopNet, Print',
    updatedDate: 'August 2026',
  },
];

const guidelines = [
  { icon: '🎨', title: 'Brand Colors', body: 'Navy #1F3A5F · Rust Orange #C85A17 · Gold #F5A623 · White #FFFFFF' },
  { icon: '🖋', title: 'Typography', body: 'Arial or similar sans-serif. Bold for headlines, regular for body copy.' },
  { icon: '📐', title: 'Logo Usage', body: 'Always use the transparent background PNG logo. Do not stretch, recolor, or place on busy backgrounds.' },
  { icon: '📸', title: 'Photos', body: 'Use high-resolution aerial and property photos. Minimum 1200px wide for print quality.' },
  { icon: '📄', title: 'File Format', body: 'Send flyers as PDF for email and LoopNet uploads. Keep the PPTX as the editable master.' },
  { icon: '✏️', title: 'Editing', body: 'Replace all [BRACKETED] placeholders before sending. Never leave template text in a final document.' },
];

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Marketing Templates</h1>
          <p className="text-gray-300">Internal use only · Download, customize, and send. Never distribute the master templates.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Flyer Generator CTA */}
        <div className="bg-gradient-to-r from-navy to-rust-orange rounded-lg p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">🚀 Flyer Generator</h2>
              <p className="text-gray-200">Fill out a form and generate a ready-to-print PDF flyer — no PowerPoint needed. Upload your photos, enter property details, click generate.</p>
            </div>
            <a
              href="/flyer"
              className="flex-shrink-0 bg-gold text-navy px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition"
            >
              Generate a Flyer →
            </a>
          </div>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">📄 Available Templates</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map((t, i) => (
              <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-navy px-6 py-4 flex justify-between items-center">
                  <h3 className="text-white font-bold text-lg">{t.name}</h3>
                  <span className="bg-gold text-navy text-xs font-bold px-2 py-1 rounded">
                    {t.fileType}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{t.description}</p>
                  <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-400 mb-1">SLIDES</p>
                      <p className="text-sm font-bold text-navy">{t.pages}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-400 mb-1">BEST FOR</p>
                      <p className="text-sm font-bold text-navy">{t.use}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-xs text-gray-400 mb-1">UPDATED</p>
                      <p className="text-sm font-bold text-navy">{t.updatedDate}</p>
                    </div>
                  </div>
                  <a
                    href={t.file}
                    download
                    className="block w-full text-center bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                  >
                    📥 Download Template
                  </a>
                </div>
              </div>
            ))}

            {/* end templates */}
          </div>
        </div>

        {/* How to Use */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">📋 How to Use a Template</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { num: '1', title: 'Download', body: 'Click the download button above to get the PPTX file.' },
                { num: '2', title: 'Customize', body: 'Open in PowerPoint. Replace all [BRACKETED] placeholders with your property info.' },
                { num: '3', title: 'Add Photos', body: 'Insert your aerial and property photos where the gray placeholder boxes appear.' },
                { num: '4', title: 'Export & Send', body: 'Save as PDF for email or LoopNet. File → Save As → PDF.' },
              ].map(step => (
                <div key={step.num} className="text-center">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-xl mx-auto mb-3">
                    {step.num}
                  </div>
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
                { name: 'Navy',        hex: '#1F3A5F', bg: 'bg-navy',        text: 'text-white' },
                { name: 'Rust Orange', hex: '#C85A17', bg: 'bg-rust-orange', text: 'text-white' },
                { name: 'Gold',        hex: '#F5A623', bg: 'bg-gold',        text: 'text-navy' },
                { name: 'White',       hex: '#FFFFFF', bg: 'bg-white',       text: 'text-navy' },
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

        {/* Logo Download */}
        <div>
          <h2 className="text-2xl font-bold text-navy mb-6">🖼 Logo Files</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <img src="/logo.png" alt="LLPM Logo" className="h-24 w-auto" />
              <div className="flex-1">
                <h3 className="font-bold text-navy mb-2">Life Long Property Management Logo</h3>
                <p className="text-gray-600 text-sm mb-4">Transparent background PNG. Use this version for all marketing materials, presentations, and documents.</p>
                <a
                  href="/logo.png"
                  download="LLPM_Logo.png"
                  className="inline-block bg-navy text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-rust-orange transition"
                >
                  📥 Download Logo PNG
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Request a template */}
        <div className="bg-navy rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need a Different Template?</h2>
          <p className="text-gray-300 mb-6">Request a new template or report a problem with an existing one.</p>
          <a
            href="mailto:lindsey@lifelongpropertymanagement.com?subject=Marketing Template Request"
            className="inline-block bg-gold text-navy px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
          >
            Request a Template
          </a>
        </div>

      </div>
    </div>
  );
}
