'use client';

import Link from 'next/link';

export default function InternalHub() {
  const tools = [
    {
      name: 'Property Inspection',
      description: 'Document property conditions with photos and ratings',
      href: '/internal/inspection',
      icon: '📋',
    },
    {
      name: 'Vacancy Management',
      description: 'Track and manage vacant units',
      href: '/internal/vacancy',
      icon: '🏢',
    },
    {
      name: 'Marketing Flyer',
      description: 'Generate property marketing flyers',
      href: '/internal/flyer',
      icon: '📄',
    },
    {
      name: 'Move-In Forms',
      description: 'Move-in checklists and documentation',
      href: '/internal/move-in',
      icon: '✅',
    },
    {
      name: 'Move-Out Forms',
      description: 'Move-out checklists and documentation',
      href: '/internal/move-out',
      icon: '📤',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-navy mb-4">Internal Tools</h1>
        <p className="text-gray-600 text-lg">
          Access LLPM property management and operational tools
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-gray-100 hover:border-gold"
          >
            <div className="text-4xl mb-4">{tool.icon}</div>
            <h2 className="text-xl font-bold text-navy group-hover:text-gold transition mb-2">
              {tool.name}
            </h2>
            <p className="text-gray-600 text-sm">{tool.description}</p>
            <div className="mt-4 text-gold font-medium text-sm group-hover:translate-x-2 transition">
              Access →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
