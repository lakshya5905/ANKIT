import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { useRouteParams, useNavigate } from '../../routes/router';
import { useProperties } from '../../hooks/useProperties';
import { useUI } from '../../hooks/useUI';
import { cloudinaryService } from '../../services/cloudinaryService';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Property, PropertyType, PropertyStatus, FacingDirection, PropertyImage } from '../../types/property';
import {
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Plus,
  Trash2,
  Star,
  Upload,
  CheckCircle2
} from 'lucide-react';

export const AdminPropertyFormPage: React.FC = () => {
  const { id } = useRouteParams();
  const navigate = useNavigate();
  const { properties, addProperty, updateProperty, getPropertyById } = useProperties();
  const { showToast } = useUI();

  const isEditing = Boolean(id);

  // Form states
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Residential Plot');
  const [status, setStatus] = useState<PropertyStatus>('Available');
  const [featured, setFeatured] = useState(false);
  const [price, setPrice] = useState('');
  const [priceDisplay, setPriceDisplay] = useState('');
  const [location, setLocation] = useState('Jaggi Garden');
  const [city, setCity] = useState('Ambala');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [facing, setFacing] = useState<FacingDirection>('East');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [parkingSpaces, setParkingSpaces] = useState('');
  const [floors, setFloors] = useState('');
  const [amenitiesInput, setAmenitiesInput] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<PropertyImage[]>([]);
  
  // Image URL input helper
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let isMounted = true;
    if (isEditing && id) {
      getPropertyById(id).then((existing) => {
        if (!isMounted || !existing) return;
        setTitle(existing.title);
        setPropertyType(existing.propertyType);
        setStatus(existing.status);
        setFeatured(existing.featured);
        setPrice(existing.price.toString());
        setPriceDisplay(existing.priceDisplay || '');
        setLocation(existing.location);
        setCity(existing.city);
        setAreaSqFt(existing.areaSqFt.toString());
        setDimensions(existing.dimensions || '');
        setFacing(existing.facing || 'East');
        setBedrooms(existing.bedrooms !== undefined ? existing.bedrooms.toString() : '');
        setBathrooms(existing.bathrooms !== undefined ? existing.bathrooms.toString() : '');
        setParkingSpaces(existing.parkingSpaces !== undefined ? existing.parkingSpaces.toString() : '');
        setFloors(existing.floors !== undefined ? existing.floors.toString() : '');
        setAmenitiesInput(existing.amenities?.join(', ') || '');
        setDescription(existing.description);
        setImages(existing.images || []);
      });
    } else {
      // Default placeholder photo for quick creation
      setImages([
        {
          id: 'img-1',
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          publicId: 'mock-1',
          altText: 'Property front view',
          isCover: true,
          order: 0
        }
      ]);
    }
    return () => {
      isMounted = false;
    };
  }, [isEditing, id]);

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    const newImg: PropertyImage = {
      id: `img-${Date.now()}`,
      url: newImageUrl.trim(),
      publicId: `url-${Date.now()}`,
      altText: `${title || 'Property'} photo`,
      isCover: images.length === 0,
      order: images.length
    };
    setImages([...images, newImg]);
    setNewImageUrl('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploaded = await cloudinaryService.uploadImage(file, images.length + 1);
      if (images.length === 0) {
        uploaded.isCover = true;
      }
      setImages((prev) => [...prev, uploaded]);
      showToast('Image uploaded successfully', 'success');
    } catch (err: any) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSetCover = (imgId: string) => {
    setImages(
      images.map((img) => ({
        ...img,
        isCover: img.id === imgId
      }))
    );
  };

  const handleRemoveImage = (imgId: string) => {
    const updated = images.filter((img) => img.id !== imgId);
    if (updated.length > 0 && !updated.some((i) => i.isCover)) {
      updated[0].isCover = true;
    }
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Valid numeric price in INR is required';
    }
    if (!location.trim()) newErrors.location = 'Location/Colony is required';
    if (!areaSqFt || isNaN(Number(areaSqFt)) || Number(areaSqFt) <= 0) {
      newErrors.areaSqFt = 'Valid plot or built-up area in sq.ft is required';
    }
    if (!description.trim()) newErrors.description = 'Description is required';
    if (images.length === 0) newErrors.images = 'Please provide at least one photo';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('Please fix the errors in the form', 'error');
      return;
    }

    setIsSaving(true);
    setErrors({});

    const amenitiesList = amenitiesInput
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const propertyPayload: Partial<Property> = {
      title: title.trim(),
      propertyType,
      status,
      featured,
      price: Number(price),
      priceDisplay: priceDisplay.trim() || `₹${(Number(price) / 100000).toFixed(2)} Lakh`,
      location: location.trim(),
      city: city.trim(),
      state: 'Haryana',
      areaSqFt: Number(areaSqFt),
      dimensions: dimensions.trim() || undefined,
      facing,
      bedrooms: bedrooms ? Number(bedrooms) : undefined,
      bathrooms: bathrooms ? Number(bathrooms) : undefined,
      parkingSpaces: parkingSpaces ? Number(parkingSpaces) : undefined,
      floors: floors ? Number(floors) : undefined,
      amenities: amenitiesList,
      description: description.trim(),
      images
    };

    try {
      if (isEditing && id) {
        await updateProperty(id, propertyPayload);
        showToast('Property updated successfully', 'success');
      } else {
        await addProperty(propertyPayload as any);
        showToast('New property listing published!', 'success');
      }
      navigate('/admin/properties');
    } catch (err: any) {
      setErrors({ form: err.message || 'Failed to save property listing' });
      showToast('Error saving listing', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AdminLayout
      pageTitle={isEditing ? 'Edit Property Listing' : 'Create New Property'}
      actionButton={
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/admin/properties')}
          leftIcon={<ArrowLeft className="w-4 h-4 mr-1" />}
        >
          Cancel
        </Button>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-left pb-16 max-w-5xl">
        
        {errors.form && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm">
            {errors.form}
          </div>
        )}

        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#0f383c] pb-3 border-b border-stone-100">
            1. Core Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
            <div className="sm:col-span-8">
              <Input
                label="Property Listing Title"
                placeholder="e.g. 150 Gaj Residential Plot in Jaggi Garden"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
                required
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#0f383c]"
              >
                <option value="Residential Plot">Residential Plot</option>
                <option value="Commercial Plot">Commercial Plot</option>
                <option value="Independent House">Independent House</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Agricultural Land">Agricultural Land</option>
              </select>
            </div>

            <div className="sm:col-span-4">
              <Input
                label="Price (INR Numbers Only)"
                type="number"
                placeholder="e.g. 4500000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                error={errors.price}
                required
              />
            </div>

            <div className="sm:col-span-4">
              <Input
                label="Price Display Label"
                placeholder="e.g. ₹45 Lakh (Negotiable)"
                value={priceDisplay}
                onChange={(e) => setPriceDisplay(e.target.value)}
                helperText="How price appears in titles"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Availability Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#0f383c]"
              >
                <option value="Available">Available</option>
                <option value="Under Offer">Under Offer</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-[#0f383c] focus:ring-[#0f383c]"
              />
              <span className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                Feature this property on Homepage showcase
              </span>
            </label>
          </div>
        </div>

        {/* Section 2: Location & Physical Dimensions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#0f383c] pb-3 border-b border-stone-100">
            2. Location & Dimensions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
              <Input
                label="Colony / Area"
                placeholder="e.g. Jaggi Garden"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                error={errors.location}
                required
              />
            </div>

            <div>
              <Input
                label="City"
                placeholder="Ambala"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div>
              <Input
                label="Area (in Sq.Ft)"
                type="number"
                placeholder="e.g. 1350 (approx 150 Gaj)"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(e.target.value)}
                error={errors.areaSqFt}
                required
              />
            </div>

            <div>
              <Input
                label="Dimensions"
                placeholder="e.g. 30 x 45 ft"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Vastu Facing
              </label>
              <select
                value={facing}
                onChange={(e) => setFacing(e.target.value as FacingDirection)}
                className="w-full px-4 py-3 bg-white rounded-xl text-sm border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#0f383c]"
              >
                <option value="East">East</option>
                <option value="North">North</option>
                <option value="North-East">North-East</option>
                <option value="West">West</option>
                <option value="South">South</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
            </div>

            <div>
              <Input
                label="Bedrooms (Optional)"
                type="number"
                placeholder="e.g. 3"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Bathrooms (Optional)"
                type="number"
                placeholder="e.g. 2"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>

            <div>
              <Input
                label="Parking Spaces (Optional)"
                type="number"
                placeholder="e.g. 2"
                value={parkingSpaces}
                onChange={(e) => setParkingSpaces(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Amenities & Description */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#0f383c] pb-3 border-b border-stone-100">
            3. Details & Amenities
          </h2>

          <div>
            <Input
              label="Amenities & Features (Comma separated)"
              placeholder="e.g. 30 Ft Wide Road, Gated Street, Clear Title, Municipal Water, Sewerage"
              value={amenitiesInput}
              onChange={(e) => setAmenitiesInput(e.target.value)}
              helperText="Separate multiple amenities with commas"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Full Property Description
            </label>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property, accessibility, registry status, nearby schools, hospital, and investment potential..."
              className="w-full px-4 py-3 bg-white rounded-xl text-sm text-slate-900 border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#0f383c] transition-colors leading-relaxed"
              required
            />
            {errors.description && (
              <p className="mt-1.5 text-xs text-rose-600">{errors.description}</p>
            )}
          </div>
        </div>

        {/* Section 4: Property Gallery Images */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col gap-5">
          <h2 className="text-base font-bold uppercase tracking-wider text-[#0f383c] pb-3 border-b border-stone-100">
            4. Photos & Media
          </h2>

          {errors.images && (
            <p className="text-xs text-rose-600">{errors.images}</p>
          )}

          {/* Upload or Add by URL */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 flex gap-2">
              <input
                type="text"
                placeholder="Paste image URL (e.g. https://...)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-stone-50 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#0f383c]"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAddImageUrl}
                leftIcon={<Plus className="w-4 h-4 mr-0.5" />}
              >
                Add URL
              </Button>
            </div>

            <div className="sm:col-span-4">
              <label className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-sm font-semibold border border-stone-300 bg-white hover:bg-stone-50 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-slate-600" />
                <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {images.map((img) => (
              <div
                key={img.id}
                className="relative group rounded-2xl overflow-hidden aspect-[4/3] border border-stone-200 bg-stone-100"
              >
                <img
                  src={img.url}
                  alt={img.altText}
                  className="w-full h-full object-cover"
                />

                {img.isCover && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#0f383c] text-white text-[10px] font-bold uppercase tracking-wider">
                    Cover
                  </span>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!img.isCover && (
                    <button
                      type="button"
                      onClick={() => handleSetCover(img.id)}
                      className="p-1.5 rounded-lg bg-white/90 text-slate-900 text-xs font-semibold hover:bg-white"
                      title="Set as cover image"
                    >
                      Set Cover
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img.id)}
                    className="p-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                    title="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate('/admin/properties')}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSaving}
            leftIcon={<Save className="w-4 h-4 mr-1 text-emerald-400" />}
          >
            {isEditing ? 'Save Changes' : 'Publish Property'}
          </Button>
        </div>

      </form>
    </AdminLayout>
  );
};
