import React from 'react';
import { ContactInfoCard } from '../components/contact/ContactInfoCard';
import { ContactForm } from '../components/contact/ContactForm';

export const ContactPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 bg-[#F8F9FA] min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading, Supporting Text, and Info Card */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-[#0f383c] bg-teal-950/5 border border-[#0f383c]/15 px-3 py-1 rounded-md mb-4">
              CONTACT FAUJI PROPERTIES
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0f383c] leading-[1.15] mb-4">
              Let's find your next property.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg mb-8">
              Whether you are looking to buy a home, invest in a plot, or sell a property in Ambala, we are here to help.
            </p>

            <div className="w-full">
              <ContactInfoCard />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 w-full">
            <ContactForm />
          </div>

        </div>

      </div>
    </div>
  );
};
