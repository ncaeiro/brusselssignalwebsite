# Brussels Signal - Deployment Guide

## Build Information
- **Build Date**: January 5, 2026
- **Deployment URL**: https://www.nunocaeiro.com/brusselssignal/website/
- **Base Path**: `/brusselssignal/website/`

## What's Included

### 1. Favicon
- Location: `dist/images/favicon.jpeg`
- Properly configured in `index.html` with correct paths

### 2. Open Graph & SEO Meta Tags
All meta tags are configured in `dist/index.html`:
- SEO meta tags (description, keywords, author)
- Open Graph tags for social media sharing
- Twitter Card tags for Twitter sharing
- Open Graph image: `featured-article.png`

### 3. Build Output
The `dist` folder contains the complete production build:
- `dist/index.html` - Main HTML file with all meta tags
- `dist/assets/` - Compiled JavaScript and CSS files
- `dist/images/` - All images including favicon and OG image
- `dist/fonts/` - Font files

## Deployment Instructions

### Upload to Web Server
Upload the contents of the `dist` folder to your web server at:
```
https://www.nunocaeiro.com/brusselssignal/website/
```

### Directory Structure on Server
```
/brusselssignal/website/
├── index.html
├── assets/
│   ├── index-ixYtJ7vP.js
│   ├── index-DfFtp8ID.css
│   └── [font files]
├── images/
│   ├── favicon.jpeg
│   ├── featured-article.png
│   └── [all other images]
└── fonts/
    └── [font files]
```

## Features Implemented

### Recent Updates
1. ✅ Watch carousel now displays 10 video articles
2. ✅ Category pages limited to 20 articles maximum
3. ✅ "View All" buttons scroll to top of page
4. ✅ Watch carousel badges show podcast series or "VIDEO" label
5. ✅ Favicon added (favicon.jpeg)
6. ✅ Open Graph image configured for social sharing
7. ✅ SEO meta tags added
8. ✅ Author page template implemented (matching design mockup)
9. ✅ Clickable author names throughout the site
10. ✅ Author page with search functionality and article filtering
11. ✅ Author profile photos integrated for all journalists
12. ✅ Authors page updated with real photos and clickable links
13. ✅ MegaMenu authors section with photos and direct links
14. ✅ Newsletters promotional page created (separate from existing newsletter page)

### Author Page Features
- Dark blue header with author photo, name, and bio
- Real author profile photos for all journalists
- Search bar to filter articles by title or summary
- Article count display (showing X of Y articles)
- Grid layout displaying all articles by the author
- Clickable author names with photos in:
  - **Article detail pages** (regular, premium, video)
  - Category pages
  - Commentary section on home page
  - Authors page grid
  - MegaMenu dropdown
- Author photos display in article headers
- Hover effects on clickable author names
- URL structure: `/author/author-name-slug`
- 8 author photos included in build

### Newsletter Promotional Page Features
- New promotional page at `/newsletters-promo` route
- Separate from existing `/newsletters` page (both pages maintained)
- **All newsletter navigation now points to the new promotional page:**
  - Top navigation "Newsletters" button
  - HomePage newsletter top banner (Brussels Calling image)
  - HomePage newsletter side box "Subscribe Now" button
  - HomePage footer newsletter banner
- Two main sections with 2 newsletters each (prototype):
  - **Observer Newsletters** - For general European affairs enthusiasts
    - Brussels Calling (Daily briefing at 08:30 CET)
    - Signal Horizon (Weekly strategic analysis, Friday mornings)
  - **Decision-maker Newsletters** - For professionals and decision makers
    - Brussels Calling (Daily briefing at 08:30 CET)
    - Signal Horizon (Weekly strategic analysis, Friday mornings)
- Each newsletter card includes:
  - Newsletter image with frequency badge (Daily/Weekly)
  - Title and description
  - Feature list with checkmarks
  - Email subscription form
  - Delivery schedule information
- "Why Subscribe" benefits section
- Final CTA section with subscription and plans links
- Responsive design for mobile, tablet, and desktop
- Color-coded badges: Red (Daily), Blue (Weekly)

### Configuration
- Base path is configured in `vite.config.ts` as `/brusselssignal/website/`
- All asset paths are relative and will work correctly when deployed

## Testing After Deployment
1. Visit: https://www.nunocaeiro.com/brusselssignal/website/
2. Check favicon appears in browser tab
3. Test social sharing (Facebook, Twitter) to verify Open Graph image
4. Test navigation between pages
5. Verify all images load correctly
6. Test author page functionality:
   - **Click on author name/photo in article detail pages**
   - Click on author names in Commentary section
   - Click on author names in Category pages
   - Click on authors in MegaMenu dropdown
   - Click on authors in Authors page
   - Test search functionality on author pages
   - Verify article filtering works correctly
   - Verify author photos display correctly in all locations
   - Check verified badge appears on author pages
   - Test hover effects on author names
7. Test newsletters promotional page:
   - Visit: https://www.nunocaeiro.com/brusselssignal/website/newsletters-promo
   - Verify Observer Newsletters section displays correctly
   - Verify Decision-maker Newsletters section displays correctly
   - Test email subscription forms (both Observer and Decision-maker)
   - Verify newsletter images and badges display properly
   - Test responsive layout on mobile, tablet, and desktop
   - Click "Subscribe Now" and "View Plans" buttons in CTA section
   - Verify existing /newsletters page still works independently

## Rebuild Instructions
If you need to rebuild:
```bash
npm run build
```

The build output will be in the `dist` folder, ready for deployment.
