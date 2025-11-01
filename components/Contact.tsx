'use client';

import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { WhatsAppIcon } from '@/components/Icons';
import { siteConfig } from '@/config/site';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  type BranchKey = 'andipillikkav' | 'mannam' | 'mathilmoola';
  const salonBranches: Record<BranchKey, {
    name: string;
    address: string;
    phone: string;
    email: string;
    workingHours: string;
  }> = {
    andipillikkav: {
      name: 'BA-BU GENTS MAKEOVER',
      address: 'BA-BU GENTS MAKEOVER , Andipillikkav, opposite to HDPY English Medium Public School,\nErnakulam, Kerala, 683516',
      phone: '9846272333, 9544546547',
      email: 'info@babufamilysalon.com',
      workingHours: '8:30 AM to 8:30 PM (Tuesdays 3:00 PM to 8:30)'
    },
    mannam: {
      name: 'BA-BU FAMILY SALON',
      address: 'KRM building, Ground floor, Vedimara-Mannam road, opposite to Bangalore Juicy & Foods, Ernakulam, Kerala 683520',
      phone: '9846272333',
      email: 'info@babufamilysalon.com',
      workingHours: '9:00 AM to 9:00 PM'
    },
    mathilmoola: {
      name: 'BA-BU FAMILY SALON',
      address: 'BA-BU FAMILY SALON, Mathilmoola, Junction, Pappinivattom,\nThrissur, Kerala 680685',
      phone: '9846272333, 7558809270',
      email: 'info@babufamilysalon.com',
      workingHours: '8:30 AM to 8:30 PM'
    }
  };
  const [activeContactLocation, setActiveContactLocation] = useState<BranchKey>('andipillikkav');
  const [activeMapLocation, setActiveMapLocation] = useState<BranchKey>('andipillikkav');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in-section');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll create a WhatsApp message
    const message = `Hi! I'd like to book an appointment at BA-BU Salon.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service: ${formData.service}
Message: ${formData.message}`;

    // Use wa.me which opens WhatsApp app on mobile and web on desktop
    const phoneNumber = "919846272333";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-black w-screen">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-in-section">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-4 tracking-widest">
            Contact Us
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#77530a] to-[#ffd277] mx-auto mb-6"></div>
          {/* <p className="text-lg text-white/80 max-w-2xl mx-auto tracking-wider">
            Ready to transform your look? Get in touch with us to book your appointment or ask any questions.
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:mx-16">
          {/* Contact Information */}
          <div className="fade-in-section">
            <h3 className="text-2xl font-serif font-bold text-babu-primary mb-8 tracking-widest">Get In Touch</h3>

            {/* Branch Switches */}
            <div className="flex justify-center mb-8 px-2">
              <div
                className="flex flex-nowrap gap-2 bg-white/10 rounded-lg p-2 max-w-full overflow-x-auto"
                role="tablist"
                aria-label="Contact locations"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeContactLocation === 'andipillikkav'}
                  onClick={() => setActiveContactLocation('andipillikkav')}
                  className={`px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md transition-all duration-300 text-xs sm:text-sm lg:text-lg font-semibold tracking-wide font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd277] whitespace-nowrap text-center leading-snug ${
                    activeContactLocation === 'andipillikkav'
                      ? 'bg-gradient-to-r from-[#77530a] to-[#ffd277] text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Andipillikkav
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeContactLocation === 'mannam'}
                  onClick={() => setActiveContactLocation('mannam')}
                  className={`px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md transition-all duration-300 text-xs sm:text-sm lg:text-lg font-semibold tracking-wide font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd277] whitespace-nowrap text-center leading-snug ${
                    activeContactLocation === 'mannam'
                      ? 'bg-gradient-to-r from-[#77530a] to-[#ffd277] text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Mannam
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeContactLocation === 'mathilmoola'}
                  onClick={() => setActiveContactLocation('mathilmoola')}
                  className={`px-3 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md transition-all duration-300 text-xs sm:text-sm lg:text-lg font-semibold tracking-wide font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd277] whitespace-nowrap text-center leading-snug ${
                    activeContactLocation === 'mathilmoola'
                      ? 'bg-gradient-to-r from-[#77530a] to-[#ffd277] text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  Mathilmoola
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-babu-teal text-white p-3 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                                  <div>
                    <h4 className="text-lg font-semibold text-babu-primary mb-1 tracking-widest">Address</h4>
                    <div className="text-gray-300 tracking-widest">
                      {salonBranches[activeContactLocation].address.split('\n').map((line, index) => (
                        <p key={index} className={index > 0 ? 'mt-1' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-babu-teal text-white p-3 rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-babu-primary mb-1 tracking-widest">Phone</h4>
                  <a
                    href={`tel:${salonBranches[activeContactLocation].phone.split(',')[0]}`}
                    className="text-lg text-gray-300 hover:text-babu-teal transition-colors tracking-widest"
                  >
                    {salonBranches[activeContactLocation].phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-babu-teal text-white p-3 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-babu-primary mb-1 tracking-widest">Email</h4>
                  <a
                    href={`mailto:${salonBranches[activeContactLocation].email}`}
                    className="text-gray-300 hover:text-babu-teal transition-colors tracking-widest"
                  >
                    {salonBranches[activeContactLocation].email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-babu-teal text-white p-3 rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-babu-primary mb-1 tracking-widest">Working Hours</h4>
                  <div className="text-gray-300 tracking-widest">
                    <p>{salonBranches[activeContactLocation].workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-4">
              <a
                href={`https://wa.me/919846272333?text=${encodeURIComponent('Hi! I would like to book an appointment at BA-BU Salon.')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Book salon appointment on WhatsApp at ${salonBranches[activeContactLocation].name}`}
                className="flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-6 py-3 rounded-full transition-all duration-300 w-full hover:scale-105 tracking-widest"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span className="tracking-widest">WhatsApp</span>
              </a>
              <a
                href={`tel:${salonBranches[activeContactLocation].phone.split(',')[0]}`}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#77530a] to-[#ffd277] hover:from-[#ffd277] hover:to-[#77530a] text-black px-6 py-3 rounded-full font-normal transition-all duration-300 w-full hover:scale-105 tracking-widest"
              >
                <Phone className="w-5 h-5" />
                <span className="tracking-widest">Call Now</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="fade-in-section">
            <div className="bg-black border border-white/10 p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-serif font-bold text-white mb-6 tracking-widest">Book Appointment</h3>

              <form onSubmit={handleSubmit} className="space-y-6 tracking-widest">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2 tracking-widest">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-[#ffd277] focus:border-[#ffd277] transition-colors placeholder-white/50 tracking-widest"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2 tracking-widest">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-[#ffd277] focus:border-[#ffd277] transition-colors placeholder-white/50 tracking-widest"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2 tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-[#ffd277] focus:border-[#ffd277] transition-colors placeholder-white/50 tracking-widest"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-white mb-2 tracking-widest">
                    Service Required *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-[#ffd277] focus:border-[#ffd277] transition-colors tracking-widest"
                  >
                    <option value="">Select a service</option>
                    {siteConfig.services.map((service) => (
                      <option key={service.id} value={service.name} className="bg-black text-white">
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2 tracking-widest">
                    Additional Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-white/20 bg-white/5 text-white rounded-lg focus:ring-2 focus:ring-[#ffd277] focus:border-[#ffd277] transition-colors resize-none placeholder-white/50 tracking-widest"
                    placeholder="Any specific requirements or preferred time..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#77530a] to-[#ffd277] hover:from-[#ffd277] hover:to-[#77530a] text-black px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 tracking-widest font-normal"
                >
                  <Send className="w-5 h-5" />
                  <span className="tracking-widest">Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 fade-in-section relative left-1/2 right-1/2 -translate-x-1/2 w-full">
          <div className="bg-black border border-white/10 p-4 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-serif font-bold text-white mb-6 text-center tracking-widest">Find Us</h3>

            {/* Location Tabs */}
            <div className="flex justify-center mb-6 px-2">
              <div
                className="flex flex-nowrap gap-2 bg-white/10 rounded-lg p-1 max-w-full overflow-x-auto"
                role="tablist"
                aria-label="Map locations"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMapLocation === 'mannam'}
                  onClick={() => setActiveMapLocation('mannam')}
                  className={`px-3 sm:px-5 lg:px-6 py-2 rounded-md transition-all duration-300 text-xs sm:text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd277] whitespace-nowrap text-center leading-snug ${
                    activeMapLocation === 'mannam'
                      ? 'bg-gradient-to-r from-[#77530a] to-[#ffd277] text-white tracking-widest'
                      : 'text-white/70 hover:text-white tracking-widest'
                  }`}
                >
                  Mannam
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMapLocation === 'andipillikkav'}
                  onClick={() => setActiveMapLocation('andipillikkav')}
                  className={`px-3 sm:px-5 lg:px-6 py-2 rounded-md transition-all duration-300 text-xs sm:text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd277] whitespace-nowrap text-center leading-snug ${
                    activeMapLocation === 'andipillikkav'
                      ? 'bg-gradient-to-r from-[#77530a] to-[#ffd277] text-white tracking-widest'
                      : 'text-white/70 hover:text-white tracking-widest'
                  }`}
                >
                  Andipillikkav
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeMapLocation === 'mathilmoola'}
                  onClick={() => setActiveMapLocation('mathilmoola')}
                  className={`px-3 sm:px-5 lg:px-6 py-2 rounded-md transition-all duration-300 text-xs sm:text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd277] whitespace-nowrap text-center leading-snug ${
                    activeMapLocation === 'mathilmoola'
                      ? 'bg-gradient-to-r from-[#77530a] to-[#ffd277] text-white tracking-widest'
                      : 'text-white/70 hover:text-white tracking-widest'
                  }`}
                >
                  Mathilmoola
                </button>
              </div>
            </div>

            <div className="relative w-full rounded-lg overflow-hidden h-[28rem]">
              {activeMapLocation === 'mannam' ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15709.638684965286!2d76.2483281!3d10.1473162!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081ba5e09b9cad%3A0x363ca14465d8a7c!2sBA-BU%20FAMILY%20SALON!5e0!3m2!1sen!2sin!4v1754569333582!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BA-BU Family Salon Mannam Location"
                />
              ) : activeMapLocation === 'mathilmoola' ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31405.570694735976!2d76.1686472119335!3d10.286032900000011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081f1044192541%3A0xa84e6cc5efe4e4fe!2sBA-BU%20Family%20Salon!5e0!3m2!1sen!2sin!4v1756629192930!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BA-BU Family Salon Mathilmoola Location"
                />
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10053.186638643878!2d76.2107498!3d10.1785445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081b9c3b0185d9%3A0x4483676b8b757840!2sBA-BU!5e0!3m2!1sen!2sin!4v1754570099787!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BA-BU Family Salon Andipillikkav Location"
                />
              )}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-black/40 via-transparent to-black/70" />
            </div>
            <div className="text-center mt-4">
              <a
                href={activeMapLocation === 'mannam'
                  ? "https://maps.google.com/?q=BA-BU+FAMILY+SALON+Mannam"
                  : activeMapLocation === 'mathilmoola'
                  ? "https://maps.google.com/?q=BA-BU+Family+Salon+Mathilmoola"
                  : activeMapLocation === 'andipillikkav'
                  ? "https://maps.google.com/?q=BA-BU+GENTS+MAKEOVER+Andipillikkav"
                  : "https://maps.google.com/?q=BA-BU+North+Paravur"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-transparent bg-gradient-to-r from-[#77530a] to-[#ffd277] bg-clip-text hover:from-[#ffd277] hover:to-[#77530a] font-medium transition-all duration-300 tracking-widest"
              >
                <MapPin className="w-4 h-4" />
                <span className="tracking-widest">View on Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;