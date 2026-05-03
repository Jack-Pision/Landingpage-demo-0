# FORGED

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> Minimal Men's Accessories Portfolio Website
>
> "Made for men who say less, carry more."

## Overview

FORGED is an open-source, premium e-commerce portfolio template designed for minimal luxury brands. The editorial design language emphasizes white space, sharp typography, and product-first photography without gradients or decorative excess.

**Live Demo:** [https://forged-demo.vercel.app](https://forged-demo.vercel.app)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero animation, category links, featured products |
| **Collection** | `/collection` | Product grid with category filtering |
| **Story** | `/story` | Brand story with value pillars |

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [GSAP 3](https://greensock.com/gsap/) + [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll:** [Lenis](https://lenis.studiofreight.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** Inline SVG

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Jack-Pision/forged-accessories-website.git

# Navigate to project
cd forged-accessories-website

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000`

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FAFAFA` | Site background |
| `--bg-secondary` | `#F0F0F0` | Cards, sections |
| `--text-primary` | `#0A0A0A` | Headings |
| `--text-secondary` | `#1A1A1A` | Body text |
| `--text-muted` | `#888888` | Captions, labels |
| `--border` | `#CCCCCC` | Dividers, borders |
| `--accent` | `#D4A96A` | Gold accent, CTAs |

### Typography
| Role | Font | Weights |
|------|------|---------|
| Display | Cormorant Garamond | 300, 400 |
| Body/UI | DM Sans | 300, 400 |
| Mono/Labels | DM Mono | 300 |

## Features

- GSAP letter-by-letter animations
- Working cart with Zustand state
- Fully responsive (mobile-first)
- Product drawer with quick add
- Category filtering
- Optimized for Vercel edge
- Easy to customize

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── collection/        # Collection page
│   └── story/             # Story page
├── components/            # React components
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── ProductDrawer.tsx
│   ├── CartDrawer.tsx
│   └── ...
├── data/
│   └── products.ts        # Product data
├── store/
│   └── cartStore.ts       # Cart state
├── public/images/         # Product images
└── next.config.ts         # Build config
```

## Customization

### 1. Replace Images
Add your product images to `public/images/` following the naming convention in `IMAGE_MANIFEST.md`.

### 2. Update Products
Edit `data/products.ts` to add your own products:

```typescript
{
  id: "your-product",
  name: "Product Name",
  category: "wallet", // wallet | eyewear | bracelet
  price: 99,
  currency: "€",
  description: "Your description",
  image: "/images/your-product.png",
  featured: true,
  tags: ["minimal", "leather"]
}
```

### 3. Update Brand Info
- Site title: `app/layout.tsx`
- Footer brand: `components/Footer.tsx`
- Colors: `app/globals.css`

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Manual
```bash
npm run build
# Upload dist/ folder to your hosting
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Credits

**Template by [Jack Pision](https://www.linkedin.com/in/jack-pision-201764377)**

- [LinkedIn](https://www.linkedin.com/in/jack-pision-201764377)
- [GitHub](https://github.com/Jack-Pision)
- [X/Twitter](https://x.com/Jack_pision)

---

## License

MIT License — see [LICENSE](LICENSE) file for details.

Feel free to use this template for personal or commercial projects. Attribution appreciated but not required.
