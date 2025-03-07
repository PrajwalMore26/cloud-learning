import { Storage } from '@google-cloud/storage';
import path from 'path';

// Initialize GCP client (auto-detects credentials from .env)
export const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: path.resolve(process.cwd(), process.env.GOOGLE_APPLICATION_CREDENTIALS || ''),
});

export const bucket = storage.bucket('praj-image-learning');

