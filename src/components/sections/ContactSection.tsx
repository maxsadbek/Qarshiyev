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
            overline="Bog'laning"
            title="Safaringizni"
            titleAccent="Boshlang"
            description="Savolingiz bormi yoki ro'yxatdan o'tishga tayyormisiz? Tashrif buyuring, qo'ng'iroq qiling yoki quyida xabar yuboring. Qabul jamoamiz sizga yordam berishga tayyor."
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
              <h3 className="font-serif font-bold text-2xl text-slate-950 mb-6">Aloqa Ma'lumotlari</h3>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Manzilimiz</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{CONTACT_INFO.addressFull}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-950 mb-1">Telefon Raqamlar</h4>
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
                    <h4 className="font-bold text-slate-950 mb-1">Email Manzillar</h4>
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
                    <h4 className="font-bold text-slate-950 mb-1">Ish Vaqti</h4>
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
              <h3 className="font-serif font-bold text-3xl text-slate-950 mb-2">Xabar Yuboring</h3>
              <p className="text-slate-500 text-sm mb-8">Odatda 24 soat ichida javob beramiz.</p>

              {isSubmitSuccessful ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-violet-50 text-violet-800 rounded-2xl p-6 text-center border border-violet-100"
                >
                  <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-violet-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Xabar Yuborildi!</h4>
                   <p className="text-violet-700/80 text-sm">
                    Murojaat qilganingiz uchun rahmat. Jamoamiz tez orada siz bilan bog'lanadi.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => reset()}
                  >
                    Yana Xabar Yuborish
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-950 mb-2">To'liq Ism</label>
                      <input
                        {...register('name', { required: 'Ism talab qilinadi' })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="Ism Familiya"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-950 mb-2">Telefon Raqami</label>
                      <input
                        {...register('phone', { required: 'Telefon talab qilinadi' })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                        placeholder="+998 90 123 45 67"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-950 mb-2">Mavzu / Kurs</label>
                    <select
                      {...register('subject', { required: 'Iltimos, mavzu tanlang' })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    >
                      <option value="">Mavzu tanlang...</option>
                      <option value="IELTS">IELTS Tayyorgarlik</option>
                      <option value="General English">Umumiy Ingliz Tili</option>
                      <option value="SAT">SAT Tayyorgarlik</option>
                      <option value="Other">Boshqa So'rov</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-950 mb-2">Xabaringiz</label>
                    <textarea
                      {...register('message', { required: 'Xabar talab qilinadi' })}
                      rows={5}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                      placeholder="Sizga qanday yordam bera olamiz?"
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
                    {isSubmitting ? 'Yuborilmoqda...' : 'Xabar Yuborish'}
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
