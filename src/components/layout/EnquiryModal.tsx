import React, { useState, useEffect } from 'react';
import { useUI } from '../../hooks/useUI';
import { enquiryService } from '../../services/enquiryService';
import { formspreeService } from '../../services/formspreeService';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { validatePhone, validateEmail } from '../../utils/validation';
import { X, CheckCircle2 } from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, enquiryModalProperty, closeEnquiryModal, showToast } = useUI();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEnquiryModalOpen) {
      if (enquiryModalProperty) {
        setMessage(
          `Hello, I would like more details and an in-person site visit for "${enquiryModalProperty.title}".`
        );
      } else {
        setMessage('');
      }
      setIsSuccess(false);
      setErrors({});
    }
  }, [isEnquiryModalOpen, enquiryModalProperty]);

  const handleClose = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setIsSuccess(false);
    setErrors({});
    closeEnquiryModal();
  };

  useEffect(() => {
    if (!isEnquiryModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEnquiryModalOpen]);

  if (!isEnquiryModalOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Please provide your name';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Please provide your mobile number';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (email && !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!message.trim() || message.trim() === 'Tell us what you are looking for.') {
      newErrors.message = 'Please write a brief message or question';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const payload = {
        name,
        phone,
        email,
        message,
        propertyId: enquiryModalProperty?.id,
        propertyTitle: enquiryModalProperty?.title,
        source: enquiryModalProperty ? 'property_detail' : 'homepage_contact'
      };
      await enquiryService.submitEnquiry(payload);
      // Send to Formspree; ignore errors to avoid rolling back Firestore write
      try {
        await formspreeService.sendEnquiry(payload);
      } catch (fsErr) {
        console.error('Formspree submission failed:', fsErr);
      }

      setIsSuccess(true);
      showToast('Enquiry received! Our team will contact you shortly.', 'success');
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (err: any) {
      setErrors({ form: err.message || 'Failed to submit enquiry. Please try again.' });
      showToast('Submission error. Please check your inputs.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-2">
          <img
            src="https://res.cloudinary.com/c3jvvveh/image/upload/v1789923920/fauji-properties-logo.png"
            alt="Fauji Properties"
            className="h-8 w-auto object-contain shrink-0"
            referrerPolicy="no-referrer"
          />
          <span className="text-xs uppercase font-bold tracking-wider text-[#0f383c]">
            FAUJI PROPERTIES ADVISORY
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f383c]">
          {enquiryModalProperty ? 'Enquire About This Property' : 'Speak with Our Real Estate Team'}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-6 leading-relaxed">
          {enquiryModalProperty ? (
            <span className="font-semibold text-slate-800">{enquiryModalProperty.title}</span>
          ) : (
            'Share your requirement and get trusted guidance on verified plots, homes, and commercial units in Ambala.'
          )}
        </p>

        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#0f383c]">Thank you!</h4>
            <p className="text-sm text-slate-600 mt-1 max-w-xs">
              Your message has been sent to Ajit Singh and the Fauji Properties advisory desk.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {errors.form && (
              <div className="p-3 text-xs rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
                {errors.form}
              </div>
            )}

            <div>
              <Input
                label="Your name"
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required
              />
            </div>

            <div>
              <Input
                label="Mobile number"
                placeholder="10-digit mobile number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                required
              />
            </div>

            <div>
              <Input
                label="Email address (optional)"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
              />
            </div>

            <div className="text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Message
              </label>
              <textarea
                rows={3}
                className="block w-full rounded-xl border border-stone-200/90 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:border-transparent transition-colors"
                placeholder="Tell us what you are looking for."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-rose-600">{errors.message}</p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Send enquiry
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
