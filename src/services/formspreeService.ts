import { EnquiryFormData } from '../types/enquiry';

export interface IFormspreeService {
  sendEnquiry(data: EnquiryFormData): Promise<void>;
}

class FormspreeService implements IFormspreeService {
  async sendEnquiry(data: EnquiryFormData): Promise<void> {
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      throw new Error('Formspree endpoint not configured in environment variables.');
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Formspree request failed (${response.status}): ${text}`);
    }
  }
}

export const formspreeService: IFormspreeService = new FormspreeService();
