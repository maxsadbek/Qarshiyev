import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const CertificatesSection: React.FC = () => {
  const certificates = [
    { id: 1, title: 'Cambridge Assessment English', image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&q=80' },
    { id: 2, title: 'British Council IELTS Partner', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80' },
    { id: 3, title: 'Ministry of Education License', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80' },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              overline="Accreditations"
              title="Internationally"
              titleAccent="Recognized"
              description="Qarshiyev Education Center operates under strict international quality standards. We are officially accredited by leading global education bodies."
              align="left"
            />
            
            <div className="mt-8 space-y-4">
              {[
                'Official IELTS Registration & Testing Venue',
                'Cambridge English Preparation Centre',
                'Licensed by the Ministry of Education',
                'Teachers certified by Cambridge (CELTA/DELTA)',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <CheckCircle2 size={18} className="text-violet-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="space-y-4 pt-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <CertificateCard cert={certificates[0]} />
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CertificateCard cert={certificates[1]} />
              <CertificateCard cert={certificates[2]} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const CertificateCard = ({ cert }: { cert: { title: string, image: string } }) => (
  <div className="relative group rounded-3xl overflow-hidden card-shadow bg-white aspect-[3/4]">
    <img
      src={cert.image}
      alt={cert.title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center mb-3">
        <Award size={18} className="text-white" />
      </div>
      <h4 className="text-white font-bold leading-snug">{cert.title}</h4>
    </div>
  </div>
);
