'use client';

import { useState, FormEvent } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
          setSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">Get in touch with our property management team.</p>
        </div>
      </section>

      {/* Team Directory */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-10">
            Get in Contact With Our Property Management Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Maintenance */}
            <div className="border-2 border-rust-orange rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-navy mb-2">Maintenance</h3>
              <p className="text-rust-orange text-sm mb-4">Maintenance Department</p>
              <a href="tel:5128926000" className="text-lg font-bold text-navy hover:text-rust-orange transition block">
                512-892-6000
              </a>
            </div>

            {/* Accounting */}
            <div className="border-2 border-rust-orange rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-navy mb-2">Accounting</h3>
              <p className="text-rust-orange text-sm mb-4">Accounting Department</p>
              <a href="tel:5128926000" className="text-lg font-bold text-navy hover:text-rust-orange transition block">
                512-892-6000
              </a>
            </div>

            {/* Norman Phillips */}
            <div className="border-2 border-rust-orange rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-navy mb-2">Norman Phillips</h3>
              <p className="text-rust-orange text-sm mb-4">Property Manager</p>
              <a href="tel:5125434686" className="text-lg font-bold text-navy hover:text-rust-orange transition block mb-2">
                512-543-4686
              </a>
              <a href="mailto:norman@lifelongpm.com" className="text-sm text-gray-600 hover:text-rust-orange transition block">
                norman@lifelongpm.com
              </a>
            </div>

            {/* Lindsey Williams */}
            <div className="border-2 border-rust-orange rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold text-navy mb-2">Lindsey Williams</h3>
              <p className="text-rust-orange text-sm mb-4">Property Manager</p>
              <a href="tel:5126689459" className="text-lg font-bold text-navy hover:text-rust-orange transition block mb-2">
                512-668-9459
              </a>
              <a href="mailto:lindsey@lifelongpm.com" className="text-sm text-gray-600 hover:text-rust-orange transition block">
                lindsey@lifelongpm.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="font-bold text-navy text-lg mb-3">Main Office</h3>
              <p className="text-gray-600 text-sm">5716 Hwy 290 West #200</p>
              <p className="text-gray-600 text-sm">Austin, TX 78735</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="font-bold text-navy text-lg mb-3">Phone</h3>
              <a href="tel:5128926001" className="text-gray-600 text-sm hover:text-rust-orange transition">
                (512) 892-6001
              </a>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="font-bold text-navy text-lg mb-3">Email</h3>
              <a href="mailto:pm@lifelongpm.com" className="text-gray-600 text-sm hover:text-rust-orange transition">
                pm@lifelongpm.com
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-10">
            <h2 className="text-3xl font-bold text-navy mb-8">Send us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">Your message has been received. We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-navy mb-2">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="(512) 555-0000" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-navy mb-2">Subject *</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent">
                      <option value="">Select a subject</option>
                      <option value="lease">Lease Inquiry</option>
                      <option value="maintenance">Maintenance Request</option>
                      <option value="accounting">Accounting</option>
                      <option value="tenant">Tenant Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Tell us how we can help..." />
                </div>

                <button type="submit"
                  className="w-full bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition text-lg">
                  Send Message
                </button>

                <p className="text-sm text-gray-500">* Required fields.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Office Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-2">Monday - Friday</p>
              <p className="text-2xl font-bold text-gold">9:00 AM - 5:00 PM</p>
            </div>
            <div>
              <p className="text-lg mb-2">Saturday & Sunday</p>
              <p className="text-2xl font-bold text-gold">Closed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
