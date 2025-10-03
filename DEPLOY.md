# 🚀 Kerenstake Explorer - Vercel Deployment Guide

## Quick Deploy to Vercel

### Method 1: One-Click Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the framework settings
   - Click "Deploy"

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

## Build Settings (Auto-Configured)

The `vercel.json` file is already configured with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Manual Configuration (if needed)

If you're configuring manually in Vercel dashboard:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher (recommended)

## Environment Variables

No environment variables are required for basic deployment. If you need custom configuration:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add variables based on `.env.example`

## Post-Deployment

After successful deployment:

1. ✅ Check the deployment URL provided by Vercel
2. ✅ Test the explorer functionality
3. ✅ Connect a custom domain (optional):
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Troubleshooting

### Build Fails

If the build fails on Vercel:

1. Check the build logs in Vercel dashboard
2. Make sure `package.json` scripts are correct
3. Try building locally first: `npm run build`

### Preview Deployment

Every push to non-main branches creates a preview deployment automatically.

### Production Deployment

Pushes to `main` branch trigger production deployments.

## Performance Optimization

The app is already optimized with:
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Gzip compression
- ✅ Browser caching headers

## Support

For issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs
- Check GitHub repository issues

---

**Built with ❤️ using Vue 3 + Vite + TypeScript**
