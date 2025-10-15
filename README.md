
# Zollus House — React/Vite Static Site

This project is a modern, responsive static website built with React, Vite, and TypeScript for the Zollus House showcase.

## Features

- ⚡ Fast Vite + React + TypeScript stack  
- 🎨 Tailwind CSS with shadcn/ui components
- 📱 Responsive design for all devices
- 🖼️ **Performance Optimized Images**:
  - AVIF/WebP formats with fallbacks
  - Responsive srcsets for all screen sizes  
  - fetchPriority and runtime preloading
  - Intrinsic dimensions to prevent CLS
- 🚀 **Production Optimizations**:
  - Manual vendor chunking for better caching
  - Lazy-loaded gallery components
  - Framer Motion animations
- 📬 Contact form (Formspree integration)
- 🛡️ Security: Latest Vite 6.3.6 (vulnerabilities patched)
- 📝 Clean, accessible markup

## Getting Started

Clone the repo and install dependencies:

```sh
npm install
```

Run the development server:

```sh
npm run dev
```

Build for production:

```sh
npm run build
```

The production build will be output to the `dist/` directory.

## Deployment

- You can deploy the contents of `dist/` to any static hosting service (e.g., Netlify, Hostinger, Vercel, IONOS, MyDataKnox, etc.).
- No deployment plugins or CI/CD configs are included by default.
- For custom domains, follow your host's instructions for DNS and upload.

## Customization

- Update the Formspree endpoint in `src/components/ContactForm.tsx` to change the contact form receiver.
- Edit images in `src/assets/` as needed.

## Responsive images (imagetools)

We use `vite-imagetools` to generate responsive image variants and feed them to a small `<ResponsivePicture />` helper.

- Generate width-based variants during import:
   - Example: `import heroVariants from "./assets/hero/hero-background.webp?w=640;960;1280;1920;2560&format=webp;webp;webp;webp;webp&as=object";`
   - For AVIF: duplicate with `format=avif;...` and import as another object.
- In components, pass the generated variants to `ResponsivePicture`:
   - `sources={[ { type: 'image/avif', srcSet: buildSrcSet(heroAvif, 'w') }, { type: 'image/webp', srcSet: buildSrcSet(heroWebp, 'w') } ]}`
   - Always provide a fallback `imgSrc` (the default asset) and a `sizes` string describing rendered width.

Where it’s applied now:
- Hero and contact backgrounds in `src/App.tsx` (AVIF first, then WebP).
- First row of images in `DesktopGallery` and `MobileGridGallery` for above-the-fold savings.

Notes:
- The imagetools plugin is added in `vite.config.ts` via an async config function.
- Type declarations for imagetools query imports live in `src/imagetools.d.ts`.
- Prefer AVIF + WebP; browsers that don’t support them will fall back to the `img` element’s `imgSrc`.

## License

This project is for demo/preview purposes. Contact the author for reuse or commercial licensing.

3. Build for production
   npm run build

4. Preview the production build locally
   npx vite preview --port 5173

GitHub Pages preview
- The project is configured to publish to GitHub Pages under the `zollus-house-app` repo.
- Vite `base` is set to `/zollus-house-app/` for correct asset paths when published.

Notes and guidance
- Contact forms are wired to Formspree. The Formspree form ID is public by design; if you need secret handling or custom processing, use a serverless proxy.

This README does not reference Figma-specific tooling or exports. If you want information about any design-exported assets or how they are referenced in the project, tell me and I can add a short section explaining that without requiring Figma.

Contact
- If you want a custom README (more details, deployment guide, or client-facing copy), tell me what tone and details you want and I'll craft it.
