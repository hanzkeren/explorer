# Theme Customization Guide

## Overview
PingPub Explorer menggunakan sistem tema minimalis modern dengan warna solid (tanpa transparansi). Tema ini dibangun menggunakan **Tailwind CSS** dan **DaisyUI** dengan palet warna yang dapat dikustomisasi melalui CSS variables dan Tailwind config.

## Struktur Tema

### 1. File Konfigurasi Utama

- **tailwind.config.js** - Konfigurasi warna, animasi, dan tema DaisyUI
- **src/style.css** - CSS variables, global styles, dan animasi
- **Komponen Vue** - Implementasi styling di level komponen

## Cara Mengubah Warna

### Metode 1: CSS Variables (Recommended)

Edit file `src/style.css` pada bagian CSS Variables:

```css
:root {
  /* Text Colors */
  --text-main: #171717;           /* Warna teks utama */
  --text-secondary: #737373;      /* Warna teks sekunder */

  /* Background Colors */
  --bg-active: #f5f5f5;          /* Background untuk item aktif */
  --bg-hover: #fff;           /* Background saat hover */

  /* Border & Accent */
  --border-color: #e5e5e5;       /* Warna border default */
  --accent-primary: #00d4aa;     /* Warna aksen utama (neon teal) */
  --accent-secondary: #00e5ff;   /* Warna aksen sekunder (cyan) */

  /* Border Radius */
  --radius: 8px;                 /* Border radius default */
}

/* Dark Theme */
html.dark,
html[data-theme='dark'] {
  --text-main: #f5f5f5;
  --text-secondary: #a3a3a3;
  --bg-active: #171717;
  --bg-hover: #262626;
  --border-color: #404040;
  --accent-primary: #00d4aa;
  --accent-secondary: #00e5ff;
}
```

### Metode 2: Tailwind Config

Edit file `tailwind.config.js` untuk mengubah palet warna DaisyUI:

```javascript
daisyui: {
  themes: [
    {
      light: {
        primary: '#00d4aa',        // Warna primary (tombol, link)
        secondary: '#00e5ff',      // Warna secondary
        accent: '#ffd700',         // Warna accent (kuning)
        neutral: '#171717',        // Warna neutral
        'base-100': '#ffffff',     // Background utama
        'base-200': '#f5f5f5',     // Background sekunder
        'base-300': '#e5e5e5',     // Background tertiary
        'base-content': '#171717', // Warna teks pada base
        info: '#00e5ff',           // Info color
        success: '#00d4aa',        // Success color
        warning: '#ffd700',        // Warning color
        error: '#ff4757',          // Error color
      },
    },
    {
      dark: {
        primary: '#00d4aa',
        secondary: '#00e5ff',
        accent: '#ffd700',
        neutral: '#171717',
        'base-100': '#fff',
        'base-200': '#171717',
        'base-300': '#262626',
        'base-content': '#f5f5f5',
        info: '#00e5ff',
        success: '#00d4aa',
        warning: '#ffd700',
        error: '#ff4757',
      },
    },
  ],
}
```

## Preset Palet Warna

### 1. Neon Teal (Default)
```css
--accent-primary: #00d4aa;
--accent-secondary: #00e5ff;
```

### 2. Neon Purple
```css
--accent-primary: #b47aff;
--accent-secondary: #d6a5ff;
```

### 3. Bright Yellow
```css
--accent-primary: #ffd700;
--accent-secondary: #ffed4e;
```

### 4. Electric Blue
```css
--accent-primary: #0080ff;
--accent-secondary: #00b4ff;
```

### 5. Neon Green
```css
--accent-primary: #00ff88;
--accent-secondary: #00ffaa;
```

## Mengubah Typography

### Font Family

Edit di `src/style.css`:

```css
body {
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

Atau edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      // Tambahkan font custom:
      // heading: ['Montserrat', 'sans-serif'],
    },
  },
}
```

### Font Sizes

Edit heading sizes di `src/style.css`:

```css
h1 { @apply text-3xl md:text-4xl; }    /* Ubah ukuran sesuai kebutuhan */
h2 { @apply text-2xl md:text-3xl; }
h3 { @apply text-xl md:text-2xl; }
h4 { @apply text-lg md:text-xl; }
```

### Font Weights

Heading menggunakan `font-bold` secara default. Untuk mengubah:

```css
h1, h2, h3, h4, h5, h6 {
  @apply font-bold;  /* Ubah ke font-semibold atau font-extrabold */
}
```

## Animasi & Transitions

### Mengubah Durasi Animasi

Edit di `src/style.css`:

```css
/* Global transition speed */
* {
  @apply transition-colors duration-200 ease-in-out;
  /* Ubah duration-200 ke duration-300 untuk lebih lambat */
}

/* Button hover animation */
.btn {
  @apply transition-all duration-200;
  /* Ubah sesuai kebutuhan */
}
```

### Custom Animations

Tambahkan animasi baru di `tailwind.config.js`:

```javascript
theme: {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in-out',
      'slide-up': 'slideUp 0.3s ease-out',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
  },
}
```

Gunakan di komponen:
```html
<div class="animate-fade-in">Content</div>
```

### Menonaktifkan Animasi

Jika ingin UI lebih statis, edit `src/style.css`:

```css
/* Hapus atau comment bagian ini */
* {
  /* @apply transition-colors duration-200 ease-in-out; */
}

.btn {
  /* @apply hover:scale-105 active:scale-95; */
}
```

## Border & Radius

### Mengubah Border Radius Global

Edit `tailwind.config.js`:

```javascript
daisyui: {
  themes: [
    {
      light: {
        '--rounded-box': '0.5rem',   // Card radius
        '--rounded-btn': '0.5rem',   // Button radius
        '--rounded-badge': '0.375rem', // Badge radius
      },
    },
  ],
}
```

Atau gunakan nilai:
- `0.25rem` - Sharp corners
- `0.5rem` - Medium (default)
- `1rem` - Rounded
- `9999px` - Fully rounded (pill shape)

### Mengubah Border Width

Edit di `src/style.css` atau komponen:

```css
/* Border 2px (default) */
.card {
  @apply border-2;
}

/* Ubah ke border-1 untuk lebih tipis */
.card {
  @apply border;
}
```

## Hover Effects

### Card Hover

Edit di `src/style.css`:

```css
.card {
  @apply hover:border-[var(--accent-primary)];
  /* Tambahkan hover effects lain: */
  /* @apply hover:shadow-lg; */
  /* @apply hover:-translate-y-1; */
}
```

### Button Hover

```css
.btn {
  @apply hover:scale-105 active:scale-95;
  /* Atau gunakan shadow: */
  /* @apply hover:shadow-lg; */
}
```

## Responsive Design

Tema sudah responsif dengan breakpoints Tailwind:
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

Contoh penggunaan:

```html
<div class="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>
```

## Custom Components

### Membuat Button Custom

```html
<button class="btn btn-primary hover:bg-[#00b894] transition-all duration-300">
  Custom Button
</button>
```

### Membuat Card Custom

```html
<div class="bg-base-100 rounded-lg border-2 border-[var(--border-color)] hover:border-primary p-4">
  Custom Card
</div>
```

## Dark Mode

Theme switching sudah terintegrasi. User bisa toggle antara light/dark mode.

Untuk mengubah dark mode colors:
1. Edit `src/style.css` bagian `html.dark`
2. Edit `tailwind.config.js` bagian `dark` theme

## Testing Changes

Setelah mengubah tema:

1. **Restart dev server:**
```bash
npm run dev
```

2. **Clear cache jika diperlukan:**
```bash
rm -rf node_modules/.vite
npm run dev
```

3. **Build untuk production:**
```bash
npm run build
```

## Tips & Best Practices

1. **Gunakan CSS Variables** untuk nilai yang sering berubah
2. **Hindari inline styles** - gunakan Tailwind classes
3. **Test di light & dark mode** sebelum deploy
4. **Maintain high contrast** untuk accessibility
5. **Keep animations subtle** - jangan berlebihan
6. **Test responsive** di mobile, tablet, dan desktop

## Troubleshooting

### Warna tidak berubah
- Restart dev server
- Clear browser cache
- Check apakah menggunakan `!important` di tempat lain

### Animasi tidak jalan
- Check browser support untuk CSS animations
- Verify Tailwind config sudah include file yang benar

### Border tidak muncul
- Check contrast dengan background color
- Increase border width ke `border-2`

## Contoh Implementasi

### Switch ke Yellow Accent Theme

1. Edit `src/style.css`:
```css
:root {
  --accent-primary: #ffd700;
  --accent-secondary: #ffed4e;
}
```

2. Edit `tailwind.config.js`:
```javascript
primary: '#ffd700',
secondary: '#ffed4e',
```

3. Restart server dan test!

---

**Need Help?** Check dokumentasi Tailwind CSS dan DaisyUI:
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [DaisyUI Themes](https://daisyui.com/docs/themes/)
