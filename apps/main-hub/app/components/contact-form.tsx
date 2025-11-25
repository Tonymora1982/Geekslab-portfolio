"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useLanguage } from "@geekslab/ui";

export const ContactForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    name: z.string().min(2, t('contactPage.form.validation.name')),
    email: z.string().email(t('contactPage.form.validation.email')),
    message: z.string().min(10, t('contactPage.form.validation.message')),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // TODO: Replace 'YOUR_FORM_ID' with your actual Formspree ID (https://formspree.io/)
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        setError(t('contactPage.form.errorGeneric'));
      }
    } catch (err) {
      setError(t('contactPage.form.errorNetwork'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-green-500/10 border border-green-500/20 text-center"
      >
        <h3 className="text-2xl font-bold text-green-400 mb-2">{t('contactPage.form.successTitle')}</h3>
        <p className="text-gray-300">
          {t('contactPage.form.successMessage')}
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 px-6 py-2 rounded-full bg-green-500 text-black font-medium hover:bg-green-400 transition-colors"
        >
          {t('contactPage.form.sendAnother')}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-300">
          {t('contactPage.form.nameLabel')}
        </label>
        <input
          {...register("name")}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-gray-500"
          placeholder={t('contactPage.form.namePlaceholder')}
        />
        {errors.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-300">
          {t('contactPage.form.emailLabel')}
        </label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-gray-500"
          placeholder={t('contactPage.form.emailPlaceholder')}
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-300">
          {t('contactPage.form.messageLabel')}
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-gray-500 resize-none"
          placeholder={t('contactPage.form.messagePlaceholder')}
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-4 rounded-lg bg-white text-black font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t('contactPage.form.sendingButton')}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t('contactPage.form.submitButton')}
          </>
        )}
      </button>
    </form>
  );
};
