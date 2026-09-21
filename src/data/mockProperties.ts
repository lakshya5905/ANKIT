import { Property } from '../types/property';

export const INITIAL_MOCK_PROPERTIES: Property[] = [
  {
    id: 'fp-101',
    title: 'Luxury 3 BHK Independent House in Jaggi Garden',
    slug: 'luxury-3-bhk-independent-house-jaggi-garden-ambala',
    description: 'Immaculately maintained 3 BHK duplex home located in the prestigious Jaggi Garden enclave of Ambala. Built with high-grade construction standards, featuring marble flooring, modular kitchen with chimney, spacious private terrace, and secure covered car parking. Walking distance to local markets and schools with quiet, tree-lined surroundings.',
    propertyType: 'Independent House',
    status: 'Available',
    price: 8500000,
    priceDisplay: '₹85 Lakh',
    location: 'Jaggi Garden',
    city: 'Ambala',
    state: 'Haryana',
    areaSqFt: 1800,
    dimensions: '30 x 60 ft',
    areaGaj: 200,
    facing: 'North-East',
    bedrooms: 3,
    bathrooms: 3,
    parkingSpaces: 2,
    floors: 2,
    amenities: [
      'Gated Security',
      'Wide 30ft Road',
      'Modular Kitchen',
      'Private Terrace',
      'Corner Property',
      '24/7 Water Supply',
      'Rainwater Harvesting'
    ],
    featured: true,
    images: [
      {
        id: 'img-101-1',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/jaggi-house-front',
        altText: 'Modern 3 BHK independent house front facade in Jaggi Garden Ambala',
        isCover: true,
        order: 1
      },
      {
        id: 'img-101-2',
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/jaggi-house-living',
        altText: 'Spacious airy living room with warm lighting',
        isCover: false,
        order: 2
      },
      {
        id: 'img-101-3',
        url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/jaggi-house-kitchen',
        altText: 'Modern modular kitchen with granite countertops',
        isCover: false,
        order: 3
      },
      {
        id: 'img-101-4',
        url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/jaggi-house-bedroom',
        altText: 'Master bedroom with attached balcony',
        isCover: false,
        order: 4
      }
    ],
    createdAt: '2026-02-10T10:00:00.000Z',
    updatedAt: '2026-03-01T14:30:00.000Z'
  },
  {
    id: 'fp-102',
    title: 'Prime 150 Gaj Residential Plot in Jaggi Garden Extension',
    slug: 'prime-150-gaj-residential-plot-jaggi-garden-ambala',
    description: 'A prime, clear-title residential plot measuring 150 Gaj (1350 sq.ft) located in an already developed, peaceful neighborhood of Jaggi Garden. Direct frontage on a 30-foot metaled road with underground drainage, electricity poles in place, and surrounded by newly constructed military & civilian family homes.',
    propertyType: 'Residential Plot',
    status: 'Available',
    price: 4500000,
    priceDisplay: '₹45 Lakh',
    location: 'Jaggi Garden Extension',
    city: 'Ambala',
    state: 'Haryana',
    areaSqFt: 1350,
    dimensions: '25 x 54 ft',
    areaGaj: 150,
    facing: 'East',
    amenities: [
      'Registry & Mutation Ready',
      'Direct 30ft Road Frontage',
      'Electricity & Water Connection Point',
      'Vastu Compliant East Facing',
      'Immediate Construction Ready'
    ],
    featured: true,
    images: [
      {
        id: 'img-102-1',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/jaggi-plot-1',
        altText: 'Clean residential plot with wide access road in Jaggi Garden Ambala',
        isCover: true,
        order: 1
      },
      {
        id: 'img-102-2',
        url: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/jaggi-plot-surroundings',
        altText: 'Surrounding modern houses and clear boundary markers',
        isCover: false,
        order: 2
      }
    ],
    createdAt: '2026-02-15T09:00:00.000Z',
    updatedAt: '2026-02-28T11:20:00.000Z'
  },
  {
    id: 'fp-103',
    title: 'Modern 4 BHK Designer Villa in Model Town',
    slug: 'modern-4-bhk-designer-villa-model-town-ambala',
    description: 'An architectural statement villa designed for supreme comfort and family living in Model Town, Ambala. Features 4 expansive master suites, double-height foyer, Italian marble flooring, dedicated home theater room, landscaped front lawn, and servant quarter with separate access.',
    propertyType: 'Villa',
    status: 'Available',
    price: 16500000,
    priceDisplay: '₹1.65 Cr',
    location: 'Model Town',
    city: 'Ambala',
    state: 'Haryana',
    areaSqFt: 3150,
    dimensions: '45 x 70 ft',
    areaGaj: 350,
    facing: 'North',
    bedrooms: 4,
    bathrooms: 5,
    parkingSpaces: 3,
    floors: 2,
    amenities: [
      'Italian Marble Flooring',
      'Private Landscaped Lawn',
      'Double Height Ceiling',
      'Servant Quarters',
      'Automated Gate',
      'CCTV Surveillance',
      'Solar Rooftop Grid'
    ],
    featured: true,
    images: [
      {
        id: 'img-103-1',
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/model-town-villa-exterior',
        altText: 'Contemporary 4 BHK luxury villa with evening exterior lighting',
        isCover: true,
        order: 1
      },
      {
        id: 'img-103-2',
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/model-town-villa-interior',
        altText: 'Double height living space with designer furnishings',
        isCover: false,
        order: 2
      },
      {
        id: 'img-103-3',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/model-town-villa-dining',
        altText: 'Elegantly lit formal dining lounge',
        isCover: false,
        order: 3
      }
    ],
    createdAt: '2026-01-20T12:00:00.000Z',
    updatedAt: '2026-03-02T16:45:00.000Z'
  },
  {
    id: 'fp-104',
    title: 'High-Return Commercial Showroom Space on Jaggi Garden Main Road',
    slug: 'commercial-showroom-space-jaggi-garden-main-road-ambala',
    description: 'Strategic commercial plot & ground-floor showroom structure facing the bustling Jaggi Garden main thoroughfare. Exceptional visibility and high footfall zone, ideal for bank branch, clinic, retail showroom, or diagnostic center. High rental yield potential.',
    propertyType: 'Commercial Plot',
    status: 'Available',
    price: 12500000,
    priceDisplay: '₹1.25 Cr',
    location: 'Jaggi Garden Main Road',
    city: 'Ambala',
    state: 'Haryana',
    areaSqFt: 2250,
    dimensions: '30 x 75 ft',
    areaGaj: 250,
    facing: 'South-East',
    parkingSpaces: 6,
    floors: 1,
    amenities: [
      'Heavy Footfall Corridor',
      'Wide Parking Apron',
      'Three-Phase Commercial Power',
      'Clear Commercial NOC',
      'High Ceiling Heights'
    ],
    featured: false,
    images: [
      {
        id: 'img-104-1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/commercial-front',
        altText: 'Modern commercial storefront with wide parking apron',
        isCover: true,
        order: 1
      },
      {
        id: 'img-104-2',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/commercial-interior',
        altText: 'Open plan commercial floor plate',
        isCover: false,
        order: 2
      }
    ],
    createdAt: '2026-02-01T08:30:00.000Z',
    updatedAt: '2026-02-22T10:15:00.000Z'
  },
  {
    id: 'fp-105',
    title: 'Spacious 200 Gaj Corner Plot near Sector 9',
    slug: 'spacious-200-gaj-corner-plot-near-sector-9-ambala',
    description: 'Desirable two-side open corner plot (North and East open) located adjacent to Sector 9, Ambala. Very quiet residential neighborhood with lush green park right across the road. Ideal for constructing a multi-level family home with dual car entry.',
    propertyType: 'Residential Plot',
    status: 'Under Offer',
    price: 6800000,
    priceDisplay: '₹68 Lakh',
    location: 'Sector 9 Outer Ring',
    city: 'Ambala',
    state: 'Haryana',
    areaSqFt: 1800,
    dimensions: '36 x 50 ft',
    areaGaj: 200,
    facing: 'North-East',
    amenities: [
      'Two-Side Open Corner',
      'Park Facing Frontage',
      'Wide 40ft & 30ft Roads',
      'Pre-approved Residential Zoning',
      'Gated Colony Gate'
    ],
    featured: false,
    images: [
      {
        id: 'img-105-1',
        url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/sector-9-plot',
        altText: 'Residential corner plot with trees and open road frontage',
        isCover: true,
        order: 1
      }
    ],
    createdAt: '2026-01-12T15:00:00.000Z',
    updatedAt: '2026-03-05T09:40:00.000Z'
  },
  {
    id: 'fp-106',
    title: 'Affordable 2 BHK Ready-to-Move House on Babyal Road',
    slug: 'affordable-2-bhk-ready-to-move-house-babyal-road-ambala',
    description: 'Well-constructed, compact 2 BHK single-storey house on Babyal Road. Highly suitable for small families or retired personnel looking for low-maintenance living with easy access to Ambala Cantt railway station, civil hospital, and daily convenience shops.',
    propertyType: 'Independent House',
    status: 'Available',
    price: 4200000,
    priceDisplay: '₹42 Lakh',
    location: 'Babyal Road',
    city: 'Ambala',
    state: 'Haryana',
    areaSqFt: 1080,
    dimensions: '20 x 54 ft',
    areaGaj: 120,
    facing: 'South',
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    floors: 1,
    amenities: [
      'Vitrified Tile Flooring',
      'Covered Scooter/Car Parking',
      'Government Water Supply',
      'Inverter Power Backup Ready',
      'Rooftop Terrace with Water Tank'
    ],
    featured: false,
    images: [
      {
        id: 'img-106-1',
        url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/babyal-house-front',
        altText: 'Subtle clean single storey residential home front view',
        isCover: true,
        order: 1
      },
      {
        id: 'img-106-2',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
        publicId: 'fauji/babyal-house-living',
        altText: 'Comfortable family living area with tiled floors',
        isCover: false,
        order: 2
      }
    ],
    createdAt: '2026-02-18T14:10:00.000Z',
    updatedAt: '2026-03-04T12:00:00.000Z'
  }
];
