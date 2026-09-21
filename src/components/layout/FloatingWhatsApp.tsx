import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappNumber = '919896056240';
  const defaultMessage = encodeURIComponent(
    'Hello Fauji Properties, I am looking for property options in Jaggi Garden / Ambala. Please share details.'
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
      aria-label="Chat on WhatsApp with Fauji Properties"
    >
      <MessageCircle className="w-5 h-5 fill-white" />
      <span className="text-xs font-bold tracking-wide hidden sm:inline-block">
        WhatsApp Us
      </span>
    </a>
  );
};
