import { PropertyImage } from '../types/property';

export interface ICloudinaryService {
  uploadImage(file: File, order?: number): Promise<PropertyImage>;
}

class MockCloudinaryService implements ICloudinaryService {
  async uploadImage(file: File, order: number = 1): Promise<PropertyImage> {
    // Artificial small upload latency
    await new Promise((r) => setTimeout(r, 600));

    const objectUrl = URL.createObjectURL(file);
    const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    return {
      id,
      url: objectUrl,
      publicId: `mock-fauji/${file.name.replace(/\.[^/.]+$/, '')}`,
      altText: file.name.replace(/\.[^/.]+$/, ''),
      isCover: order === 1,
      order
    };
  }
}

export const cloudinaryService: ICloudinaryService = new MockCloudinaryService();
