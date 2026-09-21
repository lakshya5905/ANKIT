export type PropertyType = 
  | 'Residential Plot' 
  | 'Commercial Plot' 
  | 'Independent House' 
  | 'Villa' 
  | 'Apartment' 
  | 'Agricultural Land';

export type PropertyStatus = 'Available' | 'Under Offer' | 'Sold';

export type FacingDirection = 
  | 'North' 
  | 'South' 
  | 'East' 
  | 'West' 
  | 'North-East' 
  | 'North-West' 
  | 'South-East' 
  | 'South-West';

export interface PropertyImage {
  id: string;
  url: string;
  publicId: string;
  altText: string;
  isCover: boolean;
  order: number;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  price: number;
  priceDisplay: string;
  location: string;
  city: string;
  state: string;
  areaSqFt: number;
  dimensions?: string;
  areaGaj?: number;
  facing?: FacingDirection;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  floors?: number;
  amenities: string[];
  featured: boolean;
  images: PropertyImage[];
  createdAt: string;
  updatedAt: string;
  createdById?: string;
}

export interface PropertyFilterCriteria {
  searchQuery?: string;
  location?: string;
  propertyType?: PropertyType | 'Any type' | '';
  minPrice?: number;
  maxPrice?: number;
  budgetRange?: string;
  minBedrooms?: number;
  facing?: FacingDirection | 'Any' | '';
  status?: PropertyStatus | 'All' | '';
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';
}
