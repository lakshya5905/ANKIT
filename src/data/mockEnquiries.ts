import { Enquiry } from '../types/enquiry';

export const INITIAL_MOCK_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-01',
    propertyId: 'fp-101',
    propertyTitle: 'Luxury 3 BHK Independent House in Jaggi Garden',
    name: 'Major Rajesh Sharma (Retd.)',
    phone: '9896012345',
    email: 'rajesh.sharma@example.com',
    message: 'Interested in scheduling an in-person site visit this Sunday morning. Wanted to verify registry status and water supply hours.',
    status: 'New',
    source: 'property_detail',
    createdAt: '2026-03-18T10:30:00.000Z'
  },
  {
    id: 'enq-02',
    propertyId: 'fp-102',
    propertyTitle: 'Prime 150 Gaj Residential Plot in Jaggi Garden Extension',
    name: 'Gurpreet Singh',
    phone: '9812345678',
    email: 'gurpreet.singh@example.com',
    message: 'Looking to purchase a plot in Jaggi Garden for self-construction later this year. What is the negotiation scope on the 150 Gaj plot?',
    status: 'Contacted',
    source: 'homepage_contact',
    createdAt: '2026-03-17T15:45:00.000Z'
  },
  {
    id: 'enq-03',
    name: 'Anita Verma',
    phone: '9416098765',
    email: 'anita.verma@example.com',
    message: 'We are seeking a 2 or 3 BHK independent house under ₹60 Lakhs within 5 km of Jaggi Garden or Ambala Cantt.',
    status: 'New',
    source: 'contact_page',
    createdAt: '2026-03-19T09:15:00.000Z'
  }
];
