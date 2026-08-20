# LLPM Website - Next Steps

The Next.js website is ready to deploy! Here's what to do next:

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. **Repository name:** `llpm-website`
3. **Description:** Life Long Property Management website
4. **Public or Private:** Your choice (both work with Vercel)
5. Click **Create repository**

## Step 2: Push Code to GitHub

After creating the repo, GitHub will show you commands. In your terminal, from the llpm-website folder:

```bash
git remote add origin https://github.com/LLPMtech/llpm-website.git
git branch -M main
git push -u origin main
```

(Replace `LLPMtech` with your actual GitHub username)

## Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Click **"Add New..." → "Project"**
3. Click **"Import Git Repository"**
4. Select the `llpm-website` repo
5. Click **"Import"**
6. Vercel will auto-detect Next.js settings
7. Click **"Deploy"**

**That's it!** Your site will be live at a Vercel URL like `llpm-website.vercel.app`

## Step 4: Connect Your Domain

Once deployed:

1. Go to your Vercel project dashboard
2. Click **Settings → Domains**
3. Add your domain: `lifelongpropertymanagement.com`
4. Vercel will give you DNS records to add to your domain registrar
5. DNS updates take 24-48 hours to propagate

## Step 5: Add Your Application PDF

The Apply page has a placeholder link. To add your actual PDF:

1. Save your application PDF to `/public/application.pdf`
2. Edit `/src/app/apply/page.tsx`
3. Change this line:
   ```tsx
   href="#"
   ```
   to:
   ```tsx
   href="/application.pdf"
   ```
4. Commit and push to GitHub
5. Vercel auto-deploys on every push

## Step 6: Customize Your Content

Edit these files to update your information:

### Homepage
- **File:** `src/app/page.tsx`
- Update company stats, descriptions, CTAs

### Properties List
- **File:** `src/app/properties/page.tsx`
- Look for the `properties` array (around line 23)
- Add/edit your properties there
- Format:
  ```tsx
  {
    id: '1',
    name: 'Property Name',
    address: 'Address',
    type: 'Retail' | 'Office' | 'Warehouse' | 'Flex',
    size: '5,000 SF',
    available: true,
    description: 'Description',
  }
  ```

### Contact Info
- **File:** `src/app/components/Footer.tsx`
- Update phone, email, address
- **File:** `src/app/contact/page.tsx`
- Update office hours

### Tenant Portal
- **File:** `src/app/tenant-portal/page.tsx`
- The Commercial Cafe link is already set to https://www.commercialcafe.com
- Update as needed

## Step 7: Run Locally Before Pushing

To test changes before deploying:

```bash
npm run dev
```

Open http://localhost:3000 in your browser. Changes auto-reload.

## Making Updates

Workflow:
1. Edit files locally
2. Test with `npm run dev`
3. Commit: `git add . && git commit -m "Your message"`
4. Push: `git push`
5. Vercel auto-deploys (takes 1-2 minutes)

## Common Updates

### Change colors
Edit `/src/app/globals.css` - search for your color codes:
- Navy: `#1f3a5f`
- Rust Orange: `#c85a17`
- Gold: `#f5a623`

### Add a new page
Create folder `/src/app/newpage/` and file `/page.tsx` inside it.

### Add an image
Place image in `/public/` and reference it:
```tsx
import Image from 'next/image';
<Image src="/image-name.jpg" alt="Description" width={300} height={200} />
```

## TODO Before Launch

- [ ] Set up GitHub account and create repo
- [ ] Deploy to Vercel and get live URL
- [ ] Add your application PDF to `/public/`
- [ ] Update property listings in `src/app/properties/page.tsx`
- [ ] Update contact info (phone, email, address)
- [ ] Test all pages and links
- [ ] Point your domain to Vercel
- [ ] Remove old Wix site once everything is working

## Need Help?

If you get stuck:
1. Check Vercel deployment logs for errors
2. Verify code saved correctly locally
3. Clear browser cache and restart dev server
4. Check terminal for TypeScript/build errors

---

**Once you have GitHub set up, you can push the code and Vercel will handle the rest.**
