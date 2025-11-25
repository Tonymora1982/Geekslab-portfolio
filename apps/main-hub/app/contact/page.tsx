"use client";

import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";
import { Meteors } from "@geekslab/ui";
import { useLanguage } from "@geekslab/ui";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background pt-24 pb-12 relative overflow-hidden">
      <Meteors number={20} />

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('contactPage.title')} <span className="text-gradient">{t('contactPage.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('contactPage.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6">{t('contactPage.detailsTitle')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{t('contactPage.emailLabel')}</p>
                      <a href="mailto:contact@geekslab.tech" className="text-lg font-medium hover:text-blue-400 transition-colors">
                        contact@geekslab.tech
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{t('contactPage.locationLabel')}</p>
                      <p className="text-lg font-medium">{t('contactPage.locationValue')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{t('contactPage.availabilityLabel')}</p>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-lg font-medium">{t('contactPage.availabilityValue')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
