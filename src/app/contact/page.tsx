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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to your email service or backend API
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">
            Get in touch with our team. We're here to help.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-navy mb-6">Phone</h3>
              <p className="text-gray-600 text-lg mb-2">(512) 555-0123</p>
              <p className="text-sm text-gray-500">Call us during business hours</p>
            </div>

            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-navy mb-6">Email</h3>
              <p className="text-gray-600 text-lg mb-2">
                <a
                  href="mailto:info@lifelongpropertymanagement.com"
                  className="hover:text-rust-orange transition"
                >
                  info@lifelongpropertymanagement.com
                </a>
              </p>
              <p className="text-sm text-gray-500">We respond within 24 hours</p>
            </div>

            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold text-navy mb-6">Office</h3>
              <p className="text-gray-600 text-lg mb-2">Austin, TX 78704</p>
              <p className="text-sm text-gray-500">Central Texas</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-navy mb-8">Send us a Message</h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-green-700">
                  Your message has been received. We'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-navy mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone and Subject Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-navy mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="(512) 555-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-navy mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="lease">Lease Inquiry</option>
                      <option value="maintenance">Maintenance Request</option>
                      <option value="tenant">Tenant Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-navy mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gold text-navy px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition text-lg"
                  >
                    Send Message
                  </button>
                </div>

                <p className="text-sm text-gray-500">
                  * Required fields. We respect your privacy and will only use this information to respond to your inquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Office Hours Section */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Office Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-2">Monday - Friday</p>
              <p className="text-2xl font-bold text-gold">8:00 AM - 5:00 PM</p>
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
