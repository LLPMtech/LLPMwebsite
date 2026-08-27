import Link from 'next/link';

const sections = [
  {
    title: 'Website',
    color: 'bg-navy',
    icon: '🌐',
    items: [
      {
        title: 'Public Website',
        url: 'https://www.lifelongpropertymanagement.com',
        owner: 'Lindsey',
        description: 'Main company website. Built on Next.js, hosted on Vercel, code stored on GitHub.',
        howToUpdate: [
          'Contact Lindsey to request content changes',
          'Changes are made in the code and pushed to GitHub',
          'Vercel automatically deploys within 60 seconds',
        ],
      },
      {
        title: 'Portfolio Page',
        url: '/portfolio',
        owner: 'Lindsey',
        description: 'Shows all 60+ properties owned by LLPM with photos, interactive map, and search.',
        howToUpdate: [
          'To add/remove a property: notify Lindsey',
          'To add photos: upload image files to GitHub → public/ folder, then notify Lindsey to wire them up',
          'Photo naming convention: use the property address (e.g. oak-acres.jpg)',
        ],
      },
      {
        title: 'Available Properties Page',
        url: '/properties',
        owner: 'Norman',
        description: 'Shows spaces currently available for lease or sale. Links directly to LoopNet listings.',
        howToUpdate: [
          'Update listings directly on LoopNet — the website links to your LoopNet page automatically',
          'To add/remove a specific listing card: notify Lindsey',
        ],
      },
      {
        title: 'Tenant Portal',
        url: '/tenant-portal',
        owner: 'Lindsey',
        description: 'Links commercial tenants to Commercial Cafe and residential tenants to Rent Cafe.',
        howToUpdate: [
          'If the Commercial Cafe or Rent Cafe URL changes, notify Lindsey to update the links',
        ],
      },
      {
        title: 'Apply Page',
        url: '/apply',
        owner: 'Lindsey',
        description: 'Prospects can download commercial lease application, residential application, and tenant contact form.',
        howToUpdate: [
          'To update application PDFs: send new PDF to Lindsey',
          'Lindsey uploads to GitHub and updates the download link',
        ],
      },
    ],
  },
  {
    title: 'Lead Pipeline',
    color: 'bg-rust-orange',
    icon: '📥',
    items: [
      {
        title: 'Website Contact Form → HubSpot',
        url: 'https://www.lifelongpropertymanagement.com/contact',
        owner: 'Lindsey',
        description: 'When a prospect fills out the contact form, they automatically receive an auto-reply and a new contact is created in HubSpot.',
        howToUpdate: [
          'No action needed — fully automated',
          'Check HubSpot → Contacts for new submissions',
          'Form submissions also CC\'d to lindsey@lifelongpropertymanagement.com',
        ],
      },
      {
        title: 'LoopNet Leads → HubSpot',
        url: null,
        owner: 'Norman',
        description: 'When a prospect inquires on a LoopNet listing, the lead email is automatically forwarded to HubSpot and a new contact is created.',
        howToUpdate: [
          'Norman\'s Outlook has a forwarding rule: leads@loopnet.com → 247149064@forward.na2.hubspot.com',
          'If Norman\'s email account changes, the forwarding rule must be recreated in the new inbox',
          'To verify: submit a test inquiry on a LoopNet listing and check HubSpot → Contacts',
        ],
      },
      {
        title: 'Dialpad → HubSpot',
        url: null,
        owner: 'Norman',
        description: 'All calls and texts made through Dialpad are automatically logged in HubSpot.',
        howToUpdate: [
          'Connected via Dialpad Settings → Integrations → HubSpot',
          'If connection breaks: reconnect in Dialpad settings',
          'Each Dialpad user must have the integration enabled individually',
        ],
      },
      {
        title: 'Outlook → HubSpot',
        url: null,
        owner: 'Lindsey',
        description: 'Emails sent and received in Lindsey\'s Outlook are automatically logged in HubSpot.',
        howToUpdate: [
          'Connected via HubSpot Settings → General → Email → Connect personal email',
          'HubSpot Sales add-in installed in Outlook',
          'If connection breaks: reconnect in HubSpot settings',
        ],
      },
    ],
  },
  {
    title: 'Internal Operations Tools',
    color: 'bg-navy',
    icon: '🛠',
    items: [
      {
        title: 'Vacancy Report',
        url: '/vacancy',
        owner: 'Norman',
        description: 'Live dashboard showing all vacant units across the portfolio. Color-coded by days vacant. Updated by uploading a fresh CSV from Yardi every Monday.',
        howToUpdate: [
          '1. Log into Yardi Voyager',
          '2. Go to Reports → Unit Vacancy',
          '3. Run report for all properties',
          '4. Export as CSV',
          '5. Go to github.com/LLPMtech/LLPMwebsite → public/ folder',
          '6. Upload vacancy.csv (overwrite existing file)',
          '7. Dashboard updates automatically within 60 seconds',
          'Norman has a recurring Outlook reminder every Monday at 8:00 AM',
        ],
      },
      {
        title: 'New Tenant Move-In Checklist',
        url: '/move-in',
        owner: 'Lindsey / Norman',
        description: 'Digital checklist for every new tenant move-in. Mirrors our existing Monday.com SOP. Covers admin, Yardi setup, financials, utilities, and move-in day.',
        howToUpdate: [
          '1. Open the Move-In Checklist page',
          '2. Fill in tenant info at the top',
          '3. Work through each section, marking items Done / Pending / N/A',
          '4. Add any special tasks (brokerage commissions, TI work, warranty items) in the Special Tasks section',
          '5. Click Print / Save PDF to save a copy for the tenant file',
          'To update the checklist itself: notify Lindsey',
        ],
      },
      {
        title: 'Tenant Move-Out Checklist',
        url: '/move-out',
        owner: 'Lindsey / Norman',
        description: 'Digital checklist for every tenant move-out. Covers notice, HVAC inspection, final walk-through, security deposit, file preparation for Trey, and Yardi processing.',
        howToUpdate: [
          '1. Open the Move-Out Checklist page when notice is received',
          '2. Fill in tenant info and move-out date',
          '3. Collect forwarding address early (required for security deposit return)',
          '4. Work through each section as move-out progresses',
          '5. File goes to Trey once walk-through is complete',
          '6. Trey processes move-out in Yardi',
          '7. Print / Save PDF for the tenant file',
          'To update the checklist itself: notify Lindsey',
        ],
      },
    ],
  },
  {
    title: 'Accounts & Access',
    color: 'bg-rust-orange',
    icon: '🔐',
    items: [
      {
        title: 'GitHub',
        url: 'https://github.com/LLPMtech/LLPMwebsite',
        owner: 'Lindsey',
        description: 'Where the website code and files live. Used to update the site, upload photos, and update the vacancy CSV.',
        howToUpdate: [
          'Account: LLPMtech (lindsey@lifelongpropertymanagement.com)',
          'To upload files: go to the repo → public/ folder → Add file → Upload files',
          'Direct code edits: click any file → pencil icon → edit → commit changes',
        ],
      },
      {
        title: 'Vercel',
        url: 'https://vercel.com',
        owner: 'Lindsey',
        description: 'Hosts and deploys the website. Auto-deploys every time code is pushed to GitHub. No manual action needed.',
        howToUpdate: [
          'Login via GitHub (LLPMtech account)',
          'Check deployment logs if site is not updating',
          'Environment variables (API keys) stored here',
        ],
      },
      {
        title: 'HubSpot',
        url: 'https://app.hubspot.com',
        owner: 'Lindsey',
        description: 'CRM for all prospect and tenant communications. Connected to website, LoopNet, Dialpad, and Outlook.',
        howToUpdate: [
          'Hub ID: 247149064',
          'Service Key stored in Vercel environment variables',
          'Add new users in HubSpot → Settings → Users & Teams',
        ],
      },
      {
        title: 'Resend (Email Service)',
        url: 'https://resend.com',
        owner: 'Lindsey',
        description: 'Sends contact form notification emails and auto-replies to prospects.',
        howToUpdate: [
          'Account: lindsey@lifelongpropertymanagement.com',
          'API key stored in Vercel environment variables',
          'Domain verification pending (waiting on GoDaddy/Cloudflare)',
        ],
      },
      {
        title: 'Cloudflare (DNS)',
        url: 'https://dash.cloudflare.com',
        owner: 'Lindsey',
        description: 'Manages DNS for lifelongpropertymanagement.com. Nameservers still pointing to Wix/GoDaddy — pending resolution.',
        howToUpdate: [
          'Account: lindsey@lifelongpropertymanagement.com',
          'Action needed: log into GoDaddy and switch nameservers to aitana.ns.cloudflare.com and javier.ns.cloudflare.com',
          'Once complete: verify Resend domain and Google Search Console',
        ],
      },
    ],
  },
  {
    title: 'Pending / Coming Soon',
    color: 'bg-gray-600',
    icon: '⏳',
    items: [
      {
        title: 'GoDaddy Access',
        url: null,
        owner: 'Lindsey',
        description: 'Need to recover GoDaddy login to switch nameservers to Cloudflare. This unlocks email delivery to pm@lifelongpm.com and Google Search Console verification.',
        howToUpdate: [
          'Try password recovery at godaddy.com with company email addresses',
          'Call GoDaddy support: 1-480-505-8877',
          'Once resolved: switch nameservers, verify Resend domain, verify Google Search Console',
        ],
      },
      {
        title: 'Delinquency Dashboard',
        url: null,
        owner: 'Norman',
        description: 'Internal dashboard showing delinquent tenants sorted by amount owed and days past due. Weekly email to Norman. Pending Yardi export.',
        howToUpdate: [
          'Run AR Analytics or Unpaid Charges report in Yardi',
          'Export as CSV and share with Lindsey to build the dashboard',
        ],
      },
      {
        title: 'Dialpad → HubSpot',
        url: null,
        owner: 'Norman',
        description: 'Needs to be confirmed working — test call did not log in HubSpot.',
        howToUpdate: [
          'Verify integration is enabled per user in Dialpad Settings → Integrations → HubSpot',
          'Each user must individually connect their Dialpad account to HubSpot',
        ],
      },
      {
        title: 'HubSpot Tenant Import',
        url: null,
        owner: 'Lindsey',
        description: 'Import all 200+ tenants into HubSpot as contacts. Foundation for automated lease renewal and delinquency communications.',
        howToUpdate: [
          'Export Customer Directory from Yardi CRM section',
          'Clean up contact data',
          'Import CSV into HubSpot → Contacts → Import',
        ],
      },
      {
        title: 'CAM Reconciliation Dashboard',
        url: null,
        owner: 'TBD',
        description: 'Internal dashboard for tracking CAM charges, utility billing, and year-end reconciliation.',
        howToUpdate: [
          'Run Recovery Summary report in Yardi',
          'Export as CSV and share with Lindsey',
        ],
      },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">LLPM Operations & Technology Guide</h1>
          <p className="text-gray-300">Internal documentation for all systems, tools, and processes. Last updated: August 2026.</p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Quick Access — Internal Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              { label: 'Vacancy Report', url: '/vacancy', color: 'bg-navy' },
              { label: 'Move-In Checklist', url: '/move-in', color: 'bg-gold' },
              { label: 'Move-Out Checklist', url: '/move-out', color: 'bg-rust-orange' },
              { label: 'Marketing Templates', url: '/marketing', color: 'bg-navy' },
              { label: 'HubSpot', url: 'https://app.hubspot.com', color: 'bg-orange-500' },
              { label: 'GitHub', url: 'https://github.com/LLPMtech/LLPMwebsite', color: 'bg-gray-800' },
              { label: 'Vercel', url: 'https://vercel.com', color: 'bg-gray-800' },
            ].map(link => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`${link.color} text-white text-center px-4 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map(section => (
            <div key={section.title}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-2xl font-bold text-navy">{section.title}</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {section.items.map(item => (
                  <div key={item.title} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className={`${section.color} px-6 py-3 flex justify-between items-center`}>
                      <h3 className="text-white font-bold">{item.title}</h3>
                      <span className="text-white text-opacity-80 text-xs bg-white bg-opacity-20 px-2 py-0.5 rounded-full">
                        Owner: {item.owner}
                      </span>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>

                      {item.url && (
                        <a
                          href={item.url.startsWith('/') ? item.url : item.url}
                          target={item.url.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="inline-block text-xs bg-gray-100 text-navy px-3 py-1 rounded font-mono mb-4 hover:bg-gold hover:text-navy transition"
                        >
                          {item.url.startsWith('/') ? `lifelongpropertymanagement.com${item.url}` : item.url}
                        </a>
                      )}

                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">How to Update / Use:</p>
                        <ol className="space-y-1">
                          {item.howToUpdate.map((step, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                              {step.match(/^\d\./) ? (
                                <span>{step}</span>
                              ) : (
                                <>
                                  <span className="text-gold font-bold mt-0.5">→</span>
                                  <span>{step}</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <section className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 text-sm">
            Questions or changes needed? Contact Lindsey Williams · lindsey@lifelongpropertymanagement.com · 512-668-9459
          </p>
          <p className="text-gray-500 text-xs mt-2">LLPM Internal Documentation · Not for public distribution</p>
        </div>
      </section>
    </div>
  );
}
