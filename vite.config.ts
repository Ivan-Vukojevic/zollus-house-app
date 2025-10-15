
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';
  import { visualizer } from 'rollup-plugin-visualizer';

  const ANALYZE = process.env.ANALYZE === '1' || process.env.ANALYZE === 'true';

  export default defineConfig(async () => {
  const { imagetools } = await import('vite-imagetools');
  return {
  // Base path: use '/' for root deployments (Vercel). GitHub Pages uses '/zollus-house-app/'.
  base: '/',
    plugins: [
      react(),
      imagetools(),
      ...(ANALYZE
        ? [
            visualizer({
              open: true,
              filename: 'dist/stats.html',
              template: 'treemap',
              gzipSize: true,
              brotliSize: true,
            }),
            // Emit raw JSON data alongside the HTML treemap for automated analysis
            visualizer({
              open: false,
              filename: 'dist/stats.json',
              template: 'raw-data',
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      // Vercel and many static hosts expect the default output directory 'dist'.
      // If you prefer 'build' keep it, but set the Vercel Output Directory to match.
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('scheduler')) {
                return 'vendor-react';
              }
              if (
                id.includes('framer-motion') ||
                id.includes('motion')
              ) {
                return 'vendor-motion';
              }
              // fallback vendor bucket
              return 'vendor';
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
  });