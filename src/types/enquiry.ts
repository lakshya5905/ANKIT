export type EnquiryStatus = 'New' | 'Contacted' | 'Closed';

export type EnquirySource = 'homepage_contact' | 'contact_page' | 'property_detail';

export interface Enquiry {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  status: EnquiryStatus;
  source: EnquirySource;
  createdAt: string;
}

export interface EnquiryFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  source?: EnquirySource;
}
