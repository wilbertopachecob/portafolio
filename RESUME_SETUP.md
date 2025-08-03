# Resume Setup Guide

## Overview
Your portfolio website now includes a downloadable PDF resume feature. The resume can be accessed from:
- The main hero section (About) via the "Download Resume" button
- The navigation bar (desktop only)
- The mobile menu

## Current Setup
- **Resume PDF**: `public/Engineer_Wilberto_Pacheco_Batista.pdf` (your actual resume)
- **Download filename**: `Engineer_Wilberto_Pacheco_Batista.pdf`
- **Accessible in**: English and Spanish

## How to Replace with Your Actual Resume

### Option 1: Replace the existing file
1. Create your resume as a PDF file
2. Name it `Engineer_Wilberto_Pacheco_Batista.pdf`
3. Replace the file at `public/Engineer_Wilberto_Pacheco_Batista.pdf`
4. The website will automatically use your new resume

### Option 2: Use a different filename
1. Place your resume PDF in the `public/` folder
2. Update the href attributes in the following files:
   - `src/components/About.vue` (line with `href="/Engineer_Wilberto_Pacheco_Batista.pdf"`)
   - `src/components/Navigation.vue` (line with `href="/Engineer_Wilberto_Pacheco_Batista.pdf"`)

### Option 3: Use a different download filename
To change the filename that users see when downloading:
1. Update the `download` attribute in:
   - `src/components/About.vue` (line with `download="Engineer_Wilberto_Pacheco_Batista.pdf"`)
   - `src/components/Navigation.vue` (line with `download="Engineer_Wilberto_Pacheco_Batista.pdf"`)

## Resume Best Practices
- Keep the file size under 2MB for faster downloads
- Use a professional format (PDF recommended)
- Include your contact information
- Highlight key achievements and skills
- Keep it concise (1-2 pages)
- Use consistent formatting

## Testing
After replacing the resume:
1. Run `yarn serve` to start the development server
2. Test the download functionality on both desktop and mobile
3. Verify the file downloads correctly
4. Check that the filename appears correctly

## Notes
- The resume is served from the `public/` folder, so it's accessible at the root URL
- The download attribute ensures the file downloads instead of opening in the browser
- The `target="_blank"` attribute opens the download in a new tab
- The feature works in both light and dark modes 