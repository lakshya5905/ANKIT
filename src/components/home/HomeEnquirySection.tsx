import React, { useState } from 'react';
import { enquiryService } from '../../services/enquiryService';
import { useUI } from '../../hooks/useUI';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { validatePhone, validateEmail } from '../../utils/validation';
import { CheckCircle2, MessageSquare, Phone, MapPin } from 'lucide-react';

export const HomeEnquirySection: React.FC = () => {
  const { showToast } = useUI();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please enter your full name';
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile number';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (email && !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!message.trim()) {
      newErrors.message = 'Please tell us what you are looking for';
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
        source: 'homepage_contact'
      });

      setIsSubmitted(true);
      showToast('Enquiry sent! Our team will contact you shortly.', 'success');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setErrors({ form: err.message || 'Something went wrong. Please try again.' });
      showToast('Could not send enquiry.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-50/70 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Reference Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0f383c] bg-teal-950/5 border border-[#0f383c]/15 px-3 py-1 rounded-md mb-4">
              LET'S TALK
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0f383c] leading-[1.15] mb-5">
              Looking for the right <br />
              property?
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-8">
              Share what you need and our team will guide you through the options.
            </p>

            {/* Quick Contact Micro-Cards */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f383c] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Direct Call</div>
                  <div className="text-sm font-bold text-slate-900">+91 98960 56240</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0f383c] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Office Location</div>
                  <div className="text-sm font-bold text-slate-900">Jaggi Garden, Ambala</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: White Rounded Form Card */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.06)] text-left">
              {isSubmitted ? (
                <div className="py-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f383c]">
                    Enquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-sm leading-relaxed">
                    Thank you! Our property advisor will review your preferences and get in touch with verified listings shortly.
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    className="mt-6"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Enquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {errors.form && (
                    <div className="p-3 text-xs rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
                      {errors.form}
                    </div>
                  )}

                  <Input
                    label="Your name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    required
                  />

                  <Input
                    label="Mobile number"
                    placeholder="Enter 10-digit mobile number"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={errors.phone}
                    required
                  />

                  <Input
                    label="Email address (optional)"
                    placeholder="Enter your email address"
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
                      rows={3}
                      className={`block w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f383c] focus:border-transparent transition-colors ${
                        errors.message ? 'border-rose-300' : 'border-stone-200/90'
                      }`}
                      placeholder="Tell us what you are looking for."
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
          </div>

        </div>
      </div>
    </section>
  );
};
