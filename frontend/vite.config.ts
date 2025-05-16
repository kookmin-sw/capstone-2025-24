import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const isLocal = process.env.VITE_LOCAL_DEV === 'true';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  server: isLocal
    ? {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'cert/localhost-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'cert/localhost.pem')),
        },
      }
    : {},
});

