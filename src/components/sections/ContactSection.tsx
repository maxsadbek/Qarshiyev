import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { CONTACT_INFO } from '@/constants';
import type { ContactFormData } from '@/types';

export const ContactSection: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    reset();
  };

  return (
    <section className="section-padding bg-slate-50 relative z-0">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <SectionHeader
            overline="Get In Touch"
            title="Start Your"
            titleAccent="Journey"
            description="Have a question or ready to enroll? Visit us, call us, or send us a message below. Our admissions team is ready to help you."
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-white rounded-3xl p-8 card-shadow border border-slate-100 mb-8">
              <h3 className="font-serif font-bold text-2xl text-slate-950 mb-6">Contact Information</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Our Location</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{CONTACT_INFO.addressFull}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Phone Numbers</h4>
                    <div className="space-y-1">
                      <a href={`tel:${CONTACT_INFO.phone}`} className="block text-slate-500 text-sm hover:text-violet-600 transition-colors">{CONTACT_INFO.phone}</a>
                      <a href={`tel:${CONTACT_INFO.phone2}`} className="block text-slate-500 text-sm hover:text-violet-600 transition-colors">{CONTACT_INFO.phone2}</a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Email Addresses</h4>
                    <div className="space-y-1">
                      <a href={`mailto:${CONTACT_INFO.email}`} className="block text-slate-500 text-sm hover:text-violet-600 transition-colors">{CONTACT_INFO.email}</a>
                      <a href={`mailto:${CONTACT_INFO.email2}`} className="block text-slate-500 text-sm hover:text-violet-600 transition-colors">{CONTACT_INFO.email2}</a>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Working Hours</h4>
                    <div className="space-y-1">
                      {CONTACT_INFO.workingHours.map(h => (
                        <div key={h.day} className="text-slate-500 text-sm">
                          <span className="font-medium">{h.day}:</span> {h.hours}
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden card-shadow h-64 relative border border-slate-100">
              <iframe
                src={CONTACT_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Qarshiyev Education Center Location"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 card-shadow border border-slate-100 h-full">
              <h3 className="font-serif font-bold text-3xl text-slate-950 mb-2">Send a Message</h3>
              <p className="text-slate-500 text-sm mb-8">We usually reply within 24 hours.</p>

              {isSubmitSuccessful ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-violet-50 text-violet-800 rounded-2xl p-6 text-center border border-violet-100"
                >
                  <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-violet-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-violet-700/80 text-sm">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => reset()}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-950 mb-2">Full Name</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-950 mb-2">Phone Number</label>
                      <input
                        {...register('phone', { required: 'Phone is required' })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="+998 90 123 45 67"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-950 mb-2">Subject / Course</label>
                    <select
                      {...register('subject', { required: 'Please select a subject' })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject...</option>
                      <option value="IELTS">IELTS Preparation</option>
                      <option value="General English">General English</option>
                      <option value="SAT">SAT Preparation</option>
                      <option value="Other">Other Inquiry</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-950 mb-2">Your Message</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={5}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
