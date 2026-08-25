'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="LLPM Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-sm font-bold hidden sm:inline">LLPM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gold transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-gold transition">
              About
            </Link>
            <Link href="/portfolio" className="hover:text-gold transition">
              Portfolio
            </Link>
            <Link href="/properties" className="hover:text-gold transition">
              Properties
            </Link>
            <Link href="/tenant-portal" className="hover:text-gold transition">
              Tenant Portal
            </Link>
            <Link href="/apply" className="hover:text-gold transition">
              Apply
            </Link>
            <Link href="/contact" className="hover:text-gold transition">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-rust-orange focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-3 py-2 rounded hover:bg-rust-orange" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded hover:bg-rust-orange" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/portfolio" className="block px-3 py-2 rounded hover:bg-rust-orange" onClick={() => setIsOpen(false)}>
              Portfolio
            </Link>
            <Link href="/properties" className="block px-3 py-2 rounded hover:bg-rust-orange" onClick={() => setIsOpen(false)}>
              Properties
            </Link>
            <Link
              href="/tenant-portal"
              className="block px-3 py-2 rounded hover:bg-rust-orange"
              onClick={() => setIsOpen(false)}
            >
              Tenant Portal
            </Link>
            <Link
              href="/apply"
              className="block px-3 py-2 rounded hover:bg-rust-orange"
              onClick={() => setIsOpen(false)}
            >
              Apply
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded hover:bg-rust-orange"
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
