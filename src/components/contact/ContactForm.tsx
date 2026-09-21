import React, { useState } from 'react';
import { enquiryService } from '../../services/enquiryService';
import { useUI } from '../../hooks/useUI';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { validatePhone, validateEmail } from '../../utils/validation';
import { CheckCircle2 } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const { showToast } = useUI();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please provide your name';
    if (!phone.trim()) {
      newErrors.phone = 'Please provide your mobile number';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (email && !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!message.trim()) {
      newErrors.message = 'Please let us know how we can assist you';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await enquiryService.submitEnquiry({
        name,
        phone,
        email,
        message,
        source: 'contact_page'
      });

      setIsSuccess(true);
      showToast('Enquiry received! Our team will contact you shortly.', 'success');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setErrors({ form: err.message || 'Submission error. Please try again.' });
      showToast('Could not submit your enquiry.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm text-left">
      {isSuccess ? (
        <div className="py-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-bold text-[#0f383c]">
            Enquiry Submitted
          </h3>
          <p className="text-sm text-slate-600 mt-2 max-w-sm leading-relaxed">
            Thank you! Your message has been sent to our Ambala advisory team. We will call you or reply on WhatsApp shortly.
          </p>
          <Button
            variant="outline"
            size="md"
            className="mt-6"
            onClick={() => setIsSuccess(false)}
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-slate-900">
              Send Us an Enquiry
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill out the form below and we will prepare tailored property recommendations.
            </p>
          </div>

          {errors.form && (
            <div className="p-3 text-xs rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
              {errors.form}
            </div>
          )}

          <Input
            label="Your name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            required
          />

          <Input
            label="Mobile number"
            placeholder="10-digit mobile number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
            required
          />

          <Input
            label="Email address (optional)"
            placeholder="name@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <div className="text-left">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Message
            </label>
            <textarea
              rows={4}
              className={`block w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:border-transparent transition-colors ${
                errors.message ? 'border-rose-300' : 'border-stone-200/90'
              }`}
              placeholder="Tell us what you are looking for (e.g. 150 Gaj plot in Jaggi Garden or ready 3 BHK house)..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
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
  );
};
