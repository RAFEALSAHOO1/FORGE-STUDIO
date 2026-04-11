// ─── Complete DesignForge Product Catalog ───────────────────────────────────

export interface Product {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  price: number
  deliveryDays: number
  popular?: boolean
  new?: boolean
  premium?: boolean
  tags: string[]
  sizes: string[]
  formats: string[]
  icon: string
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  color: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  products: string[] // product ids
}

// ─── ALL CATEGORIES ─────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  {
    id: 'posters',
    name: 'Posters',
    icon: '🖼️',
    description: 'Eye-catching posters for every occasion',
    color: '#89AACC',
    subcategories: [
      { id: 'event-posters', name: 'Event Posters', products: [] },
      { id: 'sale-posters', name: 'Sale / Offer Posters', products: [] },
      { id: 'party-posters', name: 'Party Posters', products: [] },
      { id: 'promo-posters', name: 'Promotional Posters', products: [] },
      { id: 'social-posters', name: 'Social Media Posters', products: [] },
    ],
  },
  {
    id: 'invitations',
    name: 'Invitations',
    icon: '💌',
    description: 'Beautiful invitations for life\'s special moments',
    color: '#f9a8d4',
    subcategories: [
      { id: 'wedding-inv', name: 'Wedding Invitations', products: [] },
      { id: 'birthday-inv', name: 'Birthday Invitations', products: [] },
      { id: 'engagement-inv', name: 'Engagement Invitations', products: [] },
      { id: 'event-inv', name: 'Event Invitations', products: [] },
      { id: 'digital-inv', name: 'Digital Invite Cards', products: [] },
    ],
  },
  {
    id: 'menus',
    name: 'Menu Cards',
    icon: '🍽️',
    description: 'Professional menus for restaurants & cafes',
    color: '#fbbf24',
    subcategories: [
      { id: 'restaurant-menu', name: 'Restaurant Menu', products: [] },
      { id: 'cafe-menu', name: 'Cafe Menu', products: [] },
      { id: 'bar-menu', name: 'Bar Menu', products: [] },
      { id: 'qr-menu', name: 'QR Menu Designs', products: [] },
      { id: 'digital-menu', name: 'Digital Menu Boards', products: [] },
    ],
  },
  {
    id: 'business-cards',
    name: 'Business Cards',
    icon: '💼',
    description: 'Premium cards that leave lasting impressions',
    color: '#a78bfa',
    subcategories: [
      { id: 'personal-cards', name: 'Personal Cards', products: [] },
      { id: 'corporate-cards', name: 'Corporate Cards', products: [] },
      { id: 'luxury-cards', name: 'Luxury Cards', products: [] },
      { id: 'creative-cards', name: 'Creative Cards', products: [] },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing & Business',
    icon: '🚀',
    description: 'Materials that grow your brand',
    color: '#34d399',
    subcategories: [
      { id: 'flyers', name: 'Flyers & Brochures', products: [] },
      { id: 'ads', name: 'Advertisement Designs', products: [] },
      { id: 'branding', name: 'Branding Assets', products: [] },
    ],
  },
  {
    id: 'social-media',
    name: 'Social Media Content',
    icon: '📱',
    description: 'Content that stops the scroll',
    color: '#fb7185',
    subcategories: [
      { id: 'instagram', name: 'Instagram / Digital', products: [] },
      { id: 'reels', name: 'Reels / Thumbnails', products: [] },
    ],
  },
  {
    id: 'events',
    name: 'Event & Personal',
    icon: '🎉',
    description: 'Designs for life\'s precious moments',
    color: '#f97316',
    subcategories: [
      { id: 'event-materials', name: 'Event Materials', products: [] },
      { id: 'personal-use', name: 'Personal Use', products: [] },
    ],
  },
  {
    id: 'corporate',
    name: 'Business Identity',
    icon: '🏢',
    description: 'Professional corporate identity materials',
    color: '#60a5fa',
    subcategories: [
      { id: 'corporate-designs', name: 'Corporate Designs', products: [] },
    ],
  },
  {
    id: 'packaging',
    name: 'Product & Packaging',
    icon: '🛍️',
    description: 'Packaging that sells your product',
    color: '#4ade80',
    subcategories: [
      { id: 'packaging-designs', name: 'Packaging Designs', products: [] },
    ],
  },
  {
    id: 'digital',
    name: 'Digital Products',
    icon: '💻',
    description: 'Templates and kits ready to use',
    color: '#c084fc',
    subcategories: [
      { id: 'templates', name: 'Templates', products: [] },
      { id: 'ui-kits', name: 'UI Kits', products: [] },
    ],
  },
]

// ─── ALL PRODUCTS ─────────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  // ── POSTERS ──────────────────────────────────────────────────────────────
  { id: 'event-poster-1', name: 'Concert Night Poster', category: 'posters', subcategory: 'event-posters', description: 'Bold concert/event poster with dramatic lighting and typography.', price: 29, deliveryDays: 3, popular: true, tags: ['concert', 'music', 'night', 'bold'], sizes: ['A4', 'A3', 'A2', '18×24"'], formats: ['PDF', 'PNG', 'SVG'], icon: '🎵' },
  { id: 'event-poster-2', name: 'Corporate Event Poster', category: 'posters', subcategory: 'event-posters', description: 'Clean professional event poster for corporate gatherings.', price: 29, deliveryDays: 2, tags: ['corporate', 'event', 'professional'], sizes: ['A4', 'A3'], formats: ['PDF', 'PNG'], icon: '🏛️' },
  { id: 'sale-poster-1', name: 'Grand Sale Announcement', category: 'posters', subcategory: 'sale-posters', description: 'Eye-catching sale poster with bold discounts display.', price: 24, deliveryDays: 2, popular: true, tags: ['sale', 'discount', 'retail'], sizes: ['A4', 'A3', 'Square'], formats: ['PDF', 'PNG'], icon: '🏷️' },
  { id: 'sale-poster-2', name: 'Flash Sale Banner', category: 'posters', subcategory: 'sale-posters', description: 'Urgency-driven flash sale design with countdown aesthetic.', price: 24, deliveryDays: 1, new: true, tags: ['flash sale', 'urgent', 'ecommerce'], sizes: ['Web Banner', 'A4'], formats: ['PNG', 'JPG'], icon: '⚡' },
  { id: 'party-poster-1', name: 'Birthday Bash Poster', category: 'posters', subcategory: 'party-posters', description: 'Vibrant birthday party announcement poster.', price: 29, deliveryDays: 2, tags: ['birthday', 'party', 'fun'], sizes: ['A4', 'A3', 'Square'], formats: ['PDF', 'PNG'], icon: '🎂' },
  { id: 'party-poster-2', name: 'New Year\'s Eve Party', category: 'posters', subcategory: 'party-posters', description: 'Glamorous New Year celebration poster.', price: 34, deliveryDays: 2, premium: true, tags: ['new year', 'party', 'glamour'], sizes: ['A4', 'A3'], formats: ['PDF', 'PNG'], icon: '🎆' },
  { id: 'promo-poster-1', name: 'Product Launch Poster', category: 'posters', subcategory: 'promo-posters', description: 'Clean product launch announcement with lifestyle aesthetic.', price: 39, deliveryDays: 3, tags: ['launch', 'product', 'brand'], sizes: ['A4', 'A3', 'Custom'], formats: ['PDF', 'PNG', 'AI'], icon: '🚀' },
  { id: 'social-poster-1', name: 'Instagram Post Poster', category: 'posters', subcategory: 'social-posters', description: 'Optimized square poster for Instagram feed.', price: 19, deliveryDays: 1, popular: true, tags: ['instagram', 'social', 'square'], sizes: ['1080×1080px'], formats: ['PNG', 'JPG'], icon: '📸' },

  // ── INVITATIONS ───────────────────────────────────────────────────────────
  { id: 'wedding-inv-1', name: 'Classic Wedding Suite', category: 'invitations', subcategory: 'wedding-inv', description: 'Timeless elegant wedding invitation with gold foil aesthetic.', price: 89, deliveryDays: 5, popular: true, premium: true, tags: ['wedding', 'classic', 'elegant', 'gold'], sizes: ['5×7"', 'A5'], formats: ['PDF', 'PNG'], icon: '💍' },
  { id: 'wedding-inv-2', name: 'Minimalist Wedding Card', category: 'invitations', subcategory: 'wedding-inv', description: 'Clean modern wedding invitation with botanical elements.', price: 69, deliveryDays: 4, new: true, tags: ['wedding', 'minimal', 'botanical'], sizes: ['5×7"', 'A5', 'Square'], formats: ['PDF', 'PNG'], icon: '🌿' },
  { id: 'birthday-inv-1', name: 'Kids Birthday Invitation', category: 'invitations', subcategory: 'birthday-inv', description: 'Colorful fun birthday invitation for children\'s parties.', price: 29, deliveryDays: 2, popular: true, tags: ['kids', 'birthday', 'fun', 'colorful'], sizes: ['5×7"', 'A5'], formats: ['PDF', 'PNG'], icon: '🎈' },
  { id: 'birthday-inv-2', name: 'Adult Milestone Birthday', category: 'invitations', subcategory: 'birthday-inv', description: 'Sophisticated invitation for milestone birthdays (30, 40, 50).', price: 39, deliveryDays: 3, tags: ['adult', 'milestone', 'sophisticated'], sizes: ['5×7"', 'A5'], formats: ['PDF', 'PNG'], icon: '🥂' },
  { id: 'engagement-inv-1', name: 'Romantic Engagement Card', category: 'invitations', subcategory: 'engagement-inv', description: 'Romantic engagement party invitation with soft watercolor.', price: 49, deliveryDays: 3, tags: ['engagement', 'romantic', 'watercolor'], sizes: ['5×7"', 'A5'], formats: ['PDF', 'PNG'], icon: '💑' },
  { id: 'event-inv-1', name: 'Corporate Gala Invitation', category: 'invitations', subcategory: 'event-inv', description: 'Premium corporate gala invitation with emboss look.', price: 59, deliveryDays: 4, premium: true, tags: ['corporate', 'gala', 'premium'], sizes: ['5×7"', 'A5', 'DL'], formats: ['PDF', 'PNG'], icon: '🎭' },
  { id: 'digital-inv-1', name: 'Animated Digital Invite', category: 'invitations', subcategory: 'digital-inv', description: 'WhatsApp/Email animated invitation with motion graphics.', price: 49, deliveryDays: 2, new: true, popular: true, tags: ['digital', 'animated', 'whatsapp', 'email'], sizes: ['Custom'], formats: ['MP4', 'GIF', 'PNG'], icon: '✨' },

  // ── MENU CARDS ────────────────────────────────────────────────────────────
  { id: 'restaurant-menu-1', name: 'Fine Dining Menu', category: 'menus', subcategory: 'restaurant-menu', description: 'Elegant fine dining menu with sophisticated typography.', price: 79, deliveryDays: 5, premium: true, tags: ['restaurant', 'fine dining', 'elegant'], sizes: ['A4 Portrait', 'A4 Landscape', 'DL'], formats: ['PDF', 'PNG'], icon: '🍷' },
  { id: 'restaurant-menu-2', name: 'Casual Bistro Menu', category: 'menus', subcategory: 'restaurant-menu', description: 'Warm rustic menu design for casual dining.', price: 59, deliveryDays: 4, popular: true, tags: ['bistro', 'casual', 'rustic'], sizes: ['A4', 'A5', 'Folded A4'], formats: ['PDF', 'PNG'], icon: '🍝' },
  { id: 'cafe-menu-1', name: 'Coffee Shop Menu Board', category: 'menus', subcategory: 'cafe-menu', description: 'Modern café menu with minimal typography and coffee tones.', price: 59, deliveryDays: 3, popular: true, tags: ['cafe', 'coffee', 'minimal', 'modern'], sizes: ['A2 Board', 'A3', 'A4'], formats: ['PDF', 'PNG'], icon: '☕' },
  { id: 'bar-menu-1', name: 'Cocktail Bar Menu', category: 'menus', subcategory: 'bar-menu', description: 'Dark luxurious bar menu with cocktail illustrations.', price: 69, deliveryDays: 4, tags: ['bar', 'cocktail', 'luxury', 'dark'], sizes: ['A4', 'DL', 'Square'], formats: ['PDF', 'PNG'], icon: '🍸' },
  { id: 'qr-menu-1', name: 'QR Code Digital Menu', category: 'menus', subcategory: 'qr-menu', description: 'Scannable QR menu linking to digital menu page.', price: 89, deliveryDays: 3, new: true, tags: ['qr', 'digital', 'contactless', 'hygiene'], sizes: ['Table Card', 'A4', 'Sticker'], formats: ['PDF', 'PNG', 'SVG'], icon: '📲' },
  { id: 'digital-menu-1', name: 'Digital Menu Board', category: 'menus', subcategory: 'digital-menu', description: 'TV/screen-optimized menu board with loop animations.', price: 99, deliveryDays: 5, premium: true, tags: ['digital', 'tv', 'screen', 'display'], sizes: ['1920×1080px', '4K'], formats: ['PNG', 'MP4'], icon: '📺' },

  // ── BUSINESS CARDS ────────────────────────────────────────────────────────
  { id: 'personal-card-1', name: 'Creative Professional Card', category: 'business-cards', subcategory: 'personal-cards', description: 'Standout personal card for creatives and freelancers.', price: 19, deliveryDays: 2, popular: true, tags: ['creative', 'personal', 'freelancer'], sizes: ['3.5×2"', 'UK Standard', 'EU Standard'], formats: ['PDF', 'PNG', 'AI'], icon: '🎨' },
  { id: 'corporate-card-1', name: 'Executive Corporate Card', category: 'business-cards', subcategory: 'corporate-cards', description: 'Authoritative corporate business card for executives.', price: 24, deliveryDays: 2, popular: true, tags: ['executive', 'corporate', 'authoritative'], sizes: ['3.5×2"', 'EU Standard'], formats: ['PDF', 'PNG', 'AI'], icon: '👔' },
  { id: 'luxury-card-1', name: 'Black Metal Card Design', category: 'business-cards', subcategory: 'luxury-cards', description: 'Ultra-luxury black card with emboss and foil elements.', price: 49, deliveryDays: 4, premium: true, tags: ['luxury', 'black', 'metal', 'premium', 'foil'], sizes: ['3.5×2"', 'Custom'], formats: ['PDF', 'PNG', 'AI'], icon: '🖤' },
  { id: 'creative-card-1', name: 'Die-Cut Unique Shape Card', category: 'business-cards', subcategory: 'creative-cards', description: 'Custom die-cut shaped business card that turns heads.', price: 39, deliveryDays: 5, new: true, tags: ['die-cut', 'unique', 'creative', 'shape'], sizes: ['Custom Shape'], formats: ['PDF', 'AI'], icon: '✂️' },

  // ── MARKETING ─────────────────────────────────────────────────────────────
  { id: 'biz-flyer-1', name: 'Business Promotional Flyer', category: 'marketing', subcategory: 'flyers', description: 'Professional business flyer for services and products.', price: 24, deliveryDays: 2, popular: true, tags: ['business', 'flyer', 'professional'], sizes: ['A5', 'A4', 'DL'], formats: ['PDF', 'PNG'], icon: '📄' },
  { id: 'event-flyer-1', name: 'Event Announcement Flyer', category: 'marketing', subcategory: 'flyers', description: 'Bold event flyer designed for maximum street impact.', price: 24, deliveryDays: 2, tags: ['event', 'announcement', 'street'], sizes: ['A5', 'A4'], formats: ['PDF', 'PNG'], icon: '📢' },
  { id: 'product-brochure-1', name: 'Product Brochure Trifold', category: 'marketing', subcategory: 'flyers', description: 'Elegant trifold brochure showcasing products or services.', price: 49, deliveryDays: 4, popular: true, tags: ['brochure', 'trifold', 'product'], sizes: ['A4 Trifold', 'DL Trifold'], formats: ['PDF', 'PNG'], icon: '📑' },
  { id: 'social-ad-1', name: 'Social Media Ad Pack', category: 'marketing', subcategory: 'ads', description: 'Complete ad pack for Facebook, Instagram, and Twitter.', price: 59, deliveryDays: 3, popular: true, new: true, tags: ['social media', 'ads', 'facebook', 'instagram'], sizes: ['1080×1080', '1080×1920', '1200×628'], formats: ['PNG', 'JPG'], icon: '📊' },
  { id: 'banner-ad-1', name: 'Web Banner Ad Set', category: 'marketing', subcategory: 'ads', description: 'Google Display Network banner ads in all standard sizes.', price: 69, deliveryDays: 3, tags: ['banner', 'web', 'google', 'display'], sizes: ['728×90', '300×250', '300×600', '160×600'], formats: ['PNG', 'GIF'], icon: '🖥️' },
  { id: 'logo-1', name: 'Primary Logo Design', category: 'marketing', subcategory: 'branding', description: 'Custom logo with 3 unique concepts, unlimited revisions.', price: 149, deliveryDays: 7, popular: true, premium: true, tags: ['logo', 'brand', 'identity'], sizes: ['Vector', 'All sizes'], formats: ['AI', 'SVG', 'PNG', 'PDF'], icon: '✦' },
  { id: 'brand-kit-1', name: 'Full Brand Identity Kit', category: 'marketing', subcategory: 'branding', description: 'Complete brand kit: logo, colors, typography, stationery.', price: 299, deliveryDays: 10, premium: true, tags: ['brand', 'kit', 'identity', 'complete'], sizes: ['All', 'Vector'], formats: ['AI', 'SVG', 'PNG', 'PDF', 'Figma'], icon: '🎯' },
  { id: 'color-palette-1', name: 'Brand Color Palette', category: 'marketing', subcategory: 'branding', description: 'Professionally curated brand color palette with guidelines.', price: 39, deliveryDays: 2, tags: ['color', 'palette', 'brand'], sizes: ['Digital'], formats: ['PDF', 'PNG', 'ASE'], icon: '🎨' },

  // ── SOCIAL MEDIA ──────────────────────────────────────────────────────────
  { id: 'ig-post-1', name: 'Instagram Feed Post', category: 'social-media', subcategory: 'instagram', description: 'Aesthetic Instagram post design, feed-optimized.', price: 19, deliveryDays: 1, popular: true, tags: ['instagram', 'post', 'aesthetic'], sizes: ['1080×1080px'], formats: ['PNG', 'JPG'], icon: '📸' },
  { id: 'carousel-1', name: 'Instagram Carousel Pack (5)', category: 'social-media', subcategory: 'instagram', description: 'Swipeable 5-slide carousel for engagement and storytelling.', price: 49, deliveryDays: 2, popular: true, tags: ['carousel', 'instagram', 'slides'], sizes: ['1080×1080px'], formats: ['PNG'], icon: '🎠' },
  { id: 'story-1', name: 'Instagram Story Templates (10)', category: 'social-media', subcategory: 'instagram', description: 'Pack of 10 matching story templates for brand consistency.', price: 49, deliveryDays: 2, popular: true, tags: ['story', 'instagram', 'template', 'pack'], sizes: ['1080×1920px'], formats: ['PNG', 'JPG'], icon: '📱' },
  { id: 'highlight-1', name: 'Story Highlight Covers (15)', category: 'social-media', subcategory: 'instagram', description: '15 matching highlight cover icons for Instagram profile.', price: 29, deliveryDays: 1, popular: true, new: true, tags: ['highlight', 'covers', 'icons', 'instagram'], sizes: ['1080×1080px'], formats: ['PNG'], icon: '🔵' },
  { id: 'reel-cover-1', name: 'Reel Cover Thumbnails (5)', category: 'social-media', subcategory: 'reels', description: 'Eye-catching reel cover thumbnails to improve click rates.', price: 29, deliveryDays: 1, tags: ['reel', 'thumbnail', 'instagram', 'cover'], sizes: ['1080×1080px'], formats: ['PNG', 'JPG'], icon: '🎬' },
  { id: 'yt-thumbnail-1', name: 'YouTube Thumbnail (3 Pack)', category: 'social-media', subcategory: 'reels', description: 'High-CTR YouTube thumbnails with bold text and imagery.', price: 39, deliveryDays: 2, popular: true, tags: ['youtube', 'thumbnail', 'CTR'], sizes: ['1280×720px'], formats: ['PNG', 'JPG'], icon: '▶️' },

  // ── EVENT & PERSONAL ─────────────────────────────────────────────────────
  { id: 'wedding-card-1', name: 'Wedding Card Suite', category: 'events', subcategory: 'event-materials', description: 'Complete wedding stationery: invite, RSVP, info card.', price: 129, deliveryDays: 7, premium: true, tags: ['wedding', 'suite', 'complete', 'stationery'], sizes: ['5×7"', 'A5'], formats: ['PDF', 'PNG'], icon: '💒' },
  { id: 'save-date-1', name: 'Save the Date Card', category: 'events', subcategory: 'event-materials', description: 'Announcement card to mark your special date early.', price: 29, deliveryDays: 2, popular: true, tags: ['save the date', 'wedding', 'announcement'], sizes: ['5×7"', 'A5', 'Postcard'], formats: ['PDF', 'PNG'], icon: '📅' },
  { id: 'thankyou-1', name: 'Thank You Cards (Set)', category: 'events', subcategory: 'event-materials', description: 'Elegant thank you cards for weddings, events, gifts.', price: 24, deliveryDays: 2, tags: ['thank you', 'gratitude', 'cards'], sizes: ['A6', '4×6"', 'Square'], formats: ['PDF', 'PNG'], icon: '🙏' },
  { id: 'rsvp-1', name: 'RSVP Card Design', category: 'events', subcategory: 'event-materials', description: 'Matching RSVP card for wedding or event invitations.', price: 19, deliveryDays: 2, tags: ['rsvp', 'event', 'wedding'], sizes: ['A6', '4×6"'], formats: ['PDF', 'PNG'], icon: '✉️' },
  { id: 'greeting-1', name: 'Custom Greeting Card', category: 'events', subcategory: 'personal-use', description: 'Personalized greeting card for any occasion.', price: 19, deliveryDays: 1, popular: true, tags: ['greeting', 'personal', 'custom'], sizes: ['A6', '5×7"', 'Square'], formats: ['PDF', 'PNG'], icon: '💝' },
  { id: 'festival-1', name: 'Festival Wishes Design', category: 'events', subcategory: 'personal-use', description: 'Festive greetings for Diwali, Christmas, Eid, and more.', price: 19, deliveryDays: 1, tags: ['festival', 'wishes', 'holiday', 'greeting'], sizes: ['Square', 'Story', 'Post'], formats: ['PNG', 'JPG'], icon: '🪔' },
  { id: 'photo-card-1', name: 'Photo Greeting Card', category: 'events', subcategory: 'personal-use', description: 'Card featuring your photo with custom text and design.', price: 24, deliveryDays: 2, tags: ['photo', 'personal', 'custom'], sizes: ['A6', '5×7"'], formats: ['PDF', 'PNG'], icon: '🖼️' },

  // ── BUSINESS IDENTITY ─────────────────────────────────────────────────────
  { id: 'letterhead-1', name: 'Corporate Letterhead', category: 'corporate', subcategory: 'corporate-designs', description: 'Professional letterhead template matching your brand.', price: 34, deliveryDays: 2, popular: true, tags: ['letterhead', 'corporate', 'stationery'], sizes: ['A4', 'Letter'], formats: ['PDF', 'DOCX', 'PNG'], icon: '📋' },
  { id: 'invoice-1', name: 'Custom Invoice Template', category: 'corporate', subcategory: 'corporate-designs', description: 'Branded invoice template with your logo and colors.', price: 29, deliveryDays: 2, tags: ['invoice', 'business', 'template'], sizes: ['A4', 'Letter'], formats: ['PDF', 'DOCX', 'XLSX'], icon: '🧾' },
  { id: 'id-card-1', name: 'Employee ID Card Design', category: 'corporate', subcategory: 'corporate-designs', description: 'Professional ID card with photo and barcode placement.', price: 34, deliveryDays: 3, tags: ['id card', 'employee', 'corporate', 'badge'], sizes: ['CR80 (Credit card)', 'Custom'], formats: ['PDF', 'PNG'], icon: '🪪' },
  { id: 'email-sig-1', name: 'HTML Email Signature', category: 'corporate', subcategory: 'corporate-designs', description: 'Clickable HTML email signature for Outlook/Gmail.', price: 29, deliveryDays: 2, new: true, tags: ['email', 'signature', 'html', 'clickable'], sizes: ['Digital'], formats: ['HTML', 'PNG'], icon: '📧' },

  // ── PACKAGING ─────────────────────────────────────────────────────────────
  { id: 'product-label-1', name: 'Product Label Design', category: 'packaging', subcategory: 'packaging-designs', description: 'Custom product label for bottles, jars, and packaging.', price: 49, deliveryDays: 4, popular: true, tags: ['label', 'product', 'packaging'], sizes: ['Custom', 'Round', 'Rectangle'], formats: ['PDF', 'AI', 'PNG'], icon: '🏷️' },
  { id: 'box-design-1', name: 'Product Box Design', category: 'packaging', subcategory: 'packaging-designs', description: 'Complete box packaging design with dielines.', price: 89, deliveryDays: 6, premium: true, tags: ['box', 'packaging', 'dieline'], sizes: ['Custom'], formats: ['AI', 'PDF'], icon: '📦' },
  { id: 'sticker-1', name: 'Custom Sticker Design', category: 'packaging', subcategory: 'packaging-designs', description: 'Fun or professional sticker designs for any purpose.', price: 24, deliveryDays: 2, popular: true, tags: ['sticker', 'custom', 'fun', 'branding'], sizes: ['Circle', 'Square', 'Custom Shape'], formats: ['PDF', 'AI', 'PNG'], icon: '✨' },
  { id: 'tag-1', name: 'Product Tag Design', category: 'packaging', subcategory: 'packaging-designs', description: 'Hang tags and price tags for retail products.', price: 24, deliveryDays: 2, tags: ['tag', 'hang tag', 'retail', 'price'], sizes: ['Custom'], formats: ['PDF', 'AI', 'PNG'], icon: '🎫' },

  // ── DIGITAL PRODUCTS ──────────────────────────────────────────────────────
  { id: 'editable-template-1', name: 'Canva-Ready Template Pack', category: 'digital', subcategory: 'templates', description: 'Fully editable Canva template pack for your brand.', price: 39, deliveryDays: 2, popular: true, new: true, tags: ['canva', 'editable', 'template', 'diy'], sizes: ['All social sizes'], formats: ['Canva Link', 'PNG'], icon: '🎨' },
  { id: 'social-kit-1', name: 'Social Media Kit (50 Templates)', category: 'digital', subcategory: 'ui-kits', description: 'Complete 50-piece social media kit for the whole year.', price: 99, deliveryDays: 3, premium: true, tags: ['social media', 'kit', 'bundle', '50 pieces'], sizes: ['All social'], formats: ['Canva', 'PNG', 'PSD'], icon: '📦' },
  { id: 'brand-kit-digital-1', name: 'Digital Brand Kit', category: 'digital', subcategory: 'ui-kits', description: 'Brand guidelines + all assets in one Notion/PDF system.', price: 149, deliveryDays: 5, premium: true, tags: ['brand kit', 'guidelines', 'notion', 'complete'], sizes: ['Digital'], formats: ['PDF', 'Notion', 'Figma'], icon: '📐' },
]

// ─── HELPER FUNCTIONS ──────────────────────────────────────────────────────
export function getProductsByCategory(categoryId: string): Product[] {
  return PRODUCTS.filter(p => p.category === categoryId)
}

export function getProductsBySubcategory(subcategoryId: string): Product[] {
  return PRODUCTS.filter(p => p.subcategory === subcategoryId)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.popular).slice(0, 8)
}

export function getNewProducts(): Product[] {
  return PRODUCTS.filter(p => p.new)
}

export function getPremiumProducts(): Product[] {
  return PRODUCTS.filter(p => p.premium)
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase()
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q)
  )
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id)
}
