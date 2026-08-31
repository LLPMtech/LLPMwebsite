import Link from 'next/link';

export default function SOPPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Lead Management SOP</h1>
          <p className="text-gray-300">Standard Operating Procedure — Prospect & Lead Handling · Life Long Property Management</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Overview */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-navy mb-4">Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            All prospect leads at LLPM flow through HubSpot CRM from three sources: our website contact form, LoopNet property inquiries, and Dialpad calls and voicemails. This SOP defines how to handle each lead type from first contact through follow-up.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: '🌐', label: 'Website Form', desc: 'Auto-creates HubSpot contact + emails team' },
              { icon: '🏢', label: 'LoopNet Inquiry', desc: 'Forwards to HubSpot via Norman\'s Outlook rule' },
              { icon: '📞', label: 'Dialpad Call/VM', desc: 'Auto-logs to HubSpot via native integration' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-bold text-navy text-sm mb-1">{s.label}</div>
                <div className="text-gray-500 text-xs">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Morning Routine */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-navy px-8 py-4">
            <h2 className="text-white font-bold text-xl">☀️ Daily Morning Routine — Lindsey</h2>
            <p className="text-gray-300 text-sm mt-1">First thing every morning — review and action all new leads from the prior day/evening</p>
          </div>
          <div className="p-8 space-y-6">

            <div>
              <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
                <span className="bg-gold text-navy rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">1</span>
                Log into HubSpot
              </h3>
              <div className="ml-9 space-y-2 text-sm text-gray-600">
                <p>Go to <a href="https://app.hubspot.com" target="_blank" rel="noopener noreferrer" className="text-navy font-semibold hover:text-rust-orange">app.hubspot.com</a> → Contacts → Sort by <strong>Date Created: Newest first</strong></p>
                <p>Review any new contacts created since your last login.</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
                <span className="bg-gold text-navy rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">2</span>
                Check Dialpad Voicemails
              </h3>
              <div className="ml-9 space-y-2 text-sm text-gray-600">
                <p>Log into <a href="https://dialpad.com" target="_blank" rel="noopener noreferrer" className="text-navy font-semibold hover:text-rust-orange">dialpad.com</a> → check for any missed calls or voicemails</p>
                <p>Listen to each voicemail — note the caller's name, number, and which property they are inquiring about</p>
                <p>Dialpad should have auto-created a HubSpot contact — search by phone number to find it</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
                <span className="bg-gold text-navy rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">3</span>
                Update Each New HubSpot Contact
              </h3>
              <div className="ml-9 space-y-2 text-sm text-gray-600">
                <p>For each new contact, fill in or verify:</p>
                <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                  <li><strong>First & Last Name</strong> — update if Dialpad only captured a phone number</li>
                  <li><strong>Email</strong> — add if missing</li>
                  <li><strong>Phone</strong> — confirm correct</li>
                  <li><strong>Company Name</strong> — business name if commercial inquiry</li>
                  <li><strong>Lifecycle Stage</strong> → set to <strong>Lead</strong></li>
                  <li><strong>Lead Status</strong> → set to <strong>New</strong></li>
                  <li><strong>Property of Interest</strong> — add a note with which property they called about</li>
                  <li><strong>Lead Source</strong> — Website, LoopNet, or Dialpad</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
                <span className="bg-gold text-navy rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">4</span>
                Log the Activity
              </h3>
              <div className="ml-9 space-y-2 text-sm text-gray-600">
                <p>On the contact record → click <strong>Log Activity</strong></p>
                <p>For voicemails: log as a <strong>Call</strong> — note the date, time, property inquired about, and a summary of the voicemail</p>
                <p>For emails: they should auto-log if Outlook is connected to HubSpot</p>
                <p>For website forms: the message is already logged as a Note automatically</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-navy mb-3 flex items-center gap-2">
                <span className="bg-gold text-navy rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">5</span>
                Assign & Follow Up
              </h3>
              <div className="ml-9 space-y-2 text-sm text-gray-600">
                <p>Determine who should follow up — Lindsey or Norman — based on the property</p>
                <p>Create a <strong>Task</strong> in HubSpot: <em>"Call back [Name] re: [Property]"</em> — assign to the right person with a due date</p>
                <p>Update <strong>Lead Status</strong> → <strong>In Progress</strong> once follow-up is assigned</p>
              </div>
            </div>

          </div>
        </div>

        {/* Response Time Guidelines */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-rust-orange px-8 py-4">
            <h2 className="text-white font-bold text-xl">⏱ Response Time Guidelines</h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { source: 'Phone / Voicemail', time: 'Same business day', note: 'Call back before 5 PM if received before 3 PM', color: 'border-navy' },
                { source: 'Website Form', time: 'Within 24 hours', note: 'Auto-reply sends immediately; personal follow-up within 1 business day', color: 'border-gold' },
                { source: 'LoopNet Inquiry', time: 'Within 24 hours', note: 'Email response preferred; include property details and availability', color: 'border-rust-orange' },
              ].map(g => (
                <div key={g.source} className={`border-l-4 ${g.color} pl-4`}>
                  <div className="font-bold text-navy mb-1">{g.source}</div>
                  <div className="text-lg font-bold text-rust-orange mb-1">{g.time}</div>
                  <div className="text-xs text-gray-500">{g.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Stages */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-navy px-8 py-4">
            <h2 className="text-white font-bold text-xl">📊 HubSpot Lead Stages</h2>
            <p className="text-gray-300 text-sm mt-1">Keep Lead Status updated as the prospect moves through the pipeline</p>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {[
                { status: 'New', desc: 'Just came in — not yet contacted', color: 'bg-blue-100 text-blue-800' },
                { status: 'In Progress', desc: 'Assigned, follow-up task created', color: 'bg-yellow-100 text-yellow-800' },
                { status: 'Open Deal', desc: 'Active conversation, showing scheduled or lease being discussed', color: 'bg-orange-100 text-orange-800' },
                { status: 'Unqualified', desc: 'Not a fit — wrong space type, budget, or timeline', color: 'bg-gray-100 text-gray-600' },
                { status: 'Connected', desc: 'Spoke with prospect, needs are understood', color: 'bg-green-100 text-green-800' },
                { status: 'Bad Timing', desc: 'Interested but not ready yet — follow up in 30-60 days', color: 'bg-purple-100 text-purple-800' },
              ].map(s => (
                <div key={s.status} className="flex items-start gap-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${s.color}`}>{s.status}</span>
                  <span className="text-sm text-gray-600 pt-0.5">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dialpad Voicemail SOP */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-navy px-8 py-4">
            <h2 className="text-white font-bold text-xl">📞 Handling a Dialpad Voicemail</h2>
            <p className="text-gray-300 text-sm mt-1">Step-by-step for a new voicemail lead</p>
          </div>
          <div className="p-8">
            <ol className="space-y-4">
              {[
                { step: 'Listen to the voicemail', detail: 'In Dialpad → Voicemails. Read the AI transcription and listen to confirm the caller\'s name, number, and which property they\'re calling about.' },
                { step: 'Find or create the HubSpot contact', detail: 'Search HubSpot by phone number. Dialpad should have auto-created the contact. If not, create it manually with the caller\'s name and number.' },
                { step: 'Update the contact record', detail: 'Add email if you have it. Set Lifecycle Stage → Lead, Lead Status → New. Add a note: "Voicemail received [date] re: [Property Name]. Caller said: [summary]."' },
                { step: 'Create a follow-up task', detail: 'Click Create Task → "Call back [Name] re: [Property]" → assign to yourself or Norman → due today or tomorrow.' },
                { step: 'Return the call', detail: 'Call from Dialpad so it auto-logs in HubSpot. If you reach them, update Lead Status → Connected. If no answer, leave a voicemail and log a note.' },
                { step: 'Send property info', detail: 'If they\'re a fit, email the listing flyer (generate from lifelongpropertymanagement.com/flyer). Log the email in HubSpot.' },
                { step: 'Update Lead Status', detail: 'Move to Open Deal if actively discussing, Bad Timing if they need more time, or Unqualified if not a fit.' },
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-7 h-7 bg-gold rounded-full flex items-center justify-center text-navy font-bold text-sm">{i+1}</div>
                  <div>
                    <div className="font-bold text-navy text-sm">{s.step}</div>
                    <div className="text-gray-600 text-sm mt-0.5">{s.detail}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-navy rounded-lg p-8">
          <h2 className="text-white font-bold text-xl mb-6">🔗 Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'HubSpot CRM', url: 'https://app.hubspot.com' },
              { label: 'Dialpad', url: 'https://dialpad.com' },
              { label: 'One-Page Flyer Generator', url: '/flyer' },
              { label: 'Move-In Checklist', url: '/move-in' },
              { label: 'Move-Out Checklist', url: '/move-out' },
              { label: 'Internal Docs', url: '/docs' },
            ].map(l => (
              <a key={l.label} href={l.url}
                target={l.url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="bg-white bg-opacity-10 text-white text-center px-4 py-3 rounded-lg text-sm font-semibold hover:bg-opacity-20 transition">
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
