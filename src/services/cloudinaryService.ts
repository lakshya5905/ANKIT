import { PropertyImage } from '../types/property';

export interface ICloudinaryService {
  uploadImage(file: File, order?: number): Promise<PropertyImage>;
}

class RealCloudinaryService implements ICloudinaryService {
  async uploadImage(file: File, order: number = 1): Promise<PropertyImage> {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary configuration missing in environment variables.');
    }
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Cloudinary upload failed (${response.status}): ${errText}`);
    }

    const data = await response.json();
    const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    return {
      id,
      url: data.secure_url,
      publicId: data.public_id,
      altText: file.name.replace(/\.[^/.]+$/, ''),
      isCover: order === 1,
      order,
    };
  }
}

export const cloudinaryService: ICloudinaryService = new RealCloudinaryService();
