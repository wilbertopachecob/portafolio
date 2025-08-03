#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// SEO Configuration
const SEO_CONFIG = {
  baseUrl: 'https://wilbertopachecob.github.io/portafolio/',
  title: 'Wilberto Pacheco Batista - Software Engineer & Full Stack Developer',
  description: 'Professional portfolio of Wilberto Pacheco Batista, a skilled Software Engineer and Full Stack Web Developer specializing in Vue.js, React, Node.js, and modern web technologies.',
  keywords: 'software engineer, web developer, full stack developer, Vue.js, React, Node.js, JavaScript, TypeScript, portfolio, frontend, backend, AWS, cloud computing',
  author: 'Wilberto Pacheco Batista',
  lastmod: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
  sections: [
    { id: 'about', priority: 1.0, changefreq: 'monthly' },
    { id: 'experience', priority: 0.9, changefreq: 'monthly' },
    { id: 'skills', priority: 0.8, changefreq: 'monthly' },
    { id: 'education', priority: 0.7, changefreq: 'yearly' },
    { id: 'languages', priority: 0.6, changefreq: 'yearly' },
    { id: 'certifications', priority: 0.7, changefreq: 'monthly' }
  ]
};

// Generate sitemap.xml
function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>${SEO_CONFIG.baseUrl}</loc>
    <lastmod>${SEO_CONFIG.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${SEO_CONFIG.baseUrl}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${SEO_CONFIG.baseUrl}?lang=es"/>
  </url>`;

  const sectionUrls = SEO_CONFIG.sections.map(section => `
  <!-- ${section.id.charAt(0).toUpperCase() + section.id.slice(1)} Section -->
  <url>
    <loc>${SEO_CONFIG.baseUrl}#${section.id}</loc>
    <lastmod>${SEO_CONFIG.lastmod}</lastmod>
    <changefreq>${section.changefreq}</changefreq>
    <priority>${section.priority}</priority>
  </url>`).join('');

  const sitemapEnd = `
</urlset>`;

  const fullSitemap = sitemap + sectionUrls + sitemapEnd;
  
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), fullSitemap);
  console.log('✅ Sitemap generated successfully');
}

// Generate robots.txt
function generateRobotsTxt() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap location
Sitemap: ${SEO_CONFIG.baseUrl}sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

# Block common bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Block access to admin areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /temp/`;

  fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robotsTxt);
  console.log('✅ Robots.txt generated successfully');
}

// Generate manifest.json
function generateManifest() {
  const manifest = {
    name: SEO_CONFIG.title,
    short_name: "WP Portfolio",
    description: SEO_CONFIG.description,
    start_url: "/portafolio/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#007bff",
    orientation: "portrait-primary",
    scope: "/portafolio/",
    lang: "en",
    categories: ["business", "productivity", "education"],
    icons: [
      {
        src: "favicon-geometric.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable"
      },
      {
        src: "favicon.ico",
        sizes: "16x16 32x32",
        type: "image/x-icon"
      }
    ],
    screenshots: [
      {
        src: "favicon-geometric.svg",
        sizes: "1280x720",
        type: "image/svg+xml",
        form_factor: "wide",
        label: "Portfolio Homepage"
      }
    ]
  };

  fs.writeFileSync(
    path.join(__dirname, '../public/manifest.json'), 
    JSON.stringify(manifest, null, 2)
  );
  console.log('✅ Manifest.json generated successfully');
}

// Generate structured data
function generateStructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": SEO_CONFIG.author,
    "jobTitle": "Software Engineer",
    "description": "Full Stack Web Developer with expertise in Vue.js, React, Node.js, and modern web technologies",
    "url": SEO_CONFIG.baseUrl,
    "image": `${SEO_CONFIG.baseUrl}favicon-geometric.svg`,
    "sameAs": [
      "https://github.com/wilbertopachecob",
      "https://linkedin.com/in/wilbertopachecobatista"
    ],
    "knowsAbout": [
      "Vue.js",
      "React", 
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Full Stack Development",
      "Web Development",
      "Cloud Computing",
      "AWS"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "alumniOf": {
      "@type": "Organization", 
      "name": "University of Havana"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Wilberto Pacheco Batista Portfolio",
    "url": SEO_CONFIG.baseUrl,
    "description": SEO_CONFIG.description,
    "author": {
      "@type": "Person",
      "name": SEO_CONFIG.author
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SEO_CONFIG.baseUrl}?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const structuredData = {
    person: personSchema,
    website: websiteSchema
  };

  fs.writeFileSync(
    path.join(__dirname, '../src/assets/structured-data.json'),
    JSON.stringify(structuredData, null, 2)
  );
  console.log('✅ Structured data generated successfully');
}

// Main function
function main() {
  console.log('🚀 Starting SEO optimization...\n');
  
  try {
    generateSitemap();
    generateRobotsTxt();
    generateManifest();
    generateStructuredData();
    
    console.log('\n🎉 SEO optimization completed successfully!');
    console.log('\n📋 Generated files:');
    console.log('  - public/sitemap.xml');
    console.log('  - public/robots.txt');
    console.log('  - public/manifest.json');
    console.log('  - src/assets/structured-data.json');
    
  } catch (error) {
    console.error('❌ Error during SEO optimization:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  generateSitemap,
  generateRobotsTxt,
  generateManifest,
  generateStructuredData,
  SEO_CONFIG
}; 