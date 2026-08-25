'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-navy sticky top-0 z-50 shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="LLPM Logo"
              width={300}
              height={100}
              className="w-72 h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-navy hover:text-rust-orange transition font-medium">
              Home
            </Link>
            <Link href="/about" className="text-navy hover:text-rust-orange transition font-medium">
              About
            </Link>
            <Link href="/portfolio" className="text-navy hover:text-rust-orange transition font-medium">
              Portfolio
            </Link>
            <Link href="/properties" className="text-navy hover:text-rust-orange transition font-medium">
              Properties
            </Link>
            <Link href="/tenant-portal" className="text-navy hover:text-rust-orange transition font-medium">
              Tenant Portal
            </Link>
            <Link href="/apply" className="text-navy hover:text-rust-orange transition font-medium">
              Apply
            </Link>
            <Link href="/contact" className="text-navy hover:text-rust-orange transition font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-navy hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-3 py-2 rounded text-navy hover:bg-gray-100 font-medium" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded text-navy hover:bg-gray-100 font-medium" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/portfolio" className="block px-3 py-2 rounded text-navy hover:bg-gray-100 font-medium" onClick={() => setIsOpen(false)}>
              Portfolio
            </Link>
            <Link href="/properties" className="block px-3 py-2 rounded text-navy hover:bg-gray-100 font-medium" onClick={() => setIsOpen(false)}>
              Properties
            </Link>
            <Link
              href="/tenant-portal"
              className="block px-3 py-2 rounded text-navy hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Tenant Portal
            </Link>
            <Link
              href="/apply"
              className="block px-3 py-2 rounded text-navy hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Apply
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded text-navy hover:bg-gray-100 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
