export interface ServiceItem {
  id: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
  icon: string
  features: string[]
  whatsIncluded: string[]
  deliverables: string[]
  idealFor: string
  timeline: string
  tag: string
  optionalAddons: string[]
  faqs: { question: string; answer: string }[]
}

export const servicesData: ServiceItem[] = [
  {
    id: 'wedding-photography',
    title: 'Wedding Photography',
    subtitle: 'Royal & Candid Celebrations',
    description: 'Bespoke wedding photography capturing royal rituals, emotional candid moments, and timeless portraits.',
    fullDescription: 'Our Wedding Photography service turns your most cherished day into an enduring visual legacy. Utilizing multi-camera Sony FX & Hasselblad setups, our master photojournalists capture raw emotions, intricate attire, and grand rituals with cinematic lighting.',
    icon: 'camera',
    features: ['Lead Master Photographer & Crew', 'Full Ritual & Candid Coverage', 'Color Graded Ultra-HD Gallery', 'Custom Italian Leather Album'],
    whatsIncluded: [
      '1 Lead Master Photographer & 3 Senior Photojournalists',
      'Unrestricted multi-day coverage (Baraat, Pheras, Reception)',
      'High-end studio flash & ambient golden hour portraiture',
      'Advanced color grading & magazine-grade beauty retouching'
    ],
    deliverables: [
      '800+ Ultra-HD Color Graded Digital Photos',
      'Handcrafted Italian Leather Heirloom Album (40 Pages)',
      '48-Hour Instant Teaser Preview Gallery for Social Sharing',
      'Private Encrypted Cloud Storage Vault (1 Year Access)'
    ],
    idealFor: 'Grand destination weddings, palace celebrations, and couples desiring fine-art photojournalism.',
    timeline: '3 - 4 Weeks',
    tag: 'Bestseller',
    optionalAddons: ['8K FPV Drone Aerial Fly-Throughs', 'Same-Day Edit Teaser Video', 'Custom Acrylic Glass Album Prints'],
    faqs: [
      {
        question: 'How far in advance should we book for wedding dates?',
        answer: 'We recommend reserving your shoot dates 6 to 12 months in advance, especially for royal peak wedding seasons (October through March).'
      },
      {
        question: 'Do you travel internationally for destination weddings?',
        answer: 'Yes, our core master crew is fully equipped with valid passports and travel visas for Europe, Middle East, Southeast Asia, and global destinations.'
      }
    ]
  },
  {
    id: 'pre-wedding-shoots',
    title: 'Pre Wedding Shoots',
    subtitle: 'Cinematic Storytelling & Romance',
    description: 'Bespoke romantic pre-wedding photo & film sessions at exotic international & heritage locations.',
    fullDescription: 'Celebrate your love story in breathtaking destinations. We conceptualize personalized themes, moodboards, wardrobe styling, and drone aerials to create magazine-worthy romantic portraits and teaser films.',
    icon: 'heart',
    features: ['Concept & Moodboard Styling', 'Location Scouting & Permits', 'Drone Aerial Highlights', 'Cinematic Teaser Trailer'],
    whatsIncluded: [
      'Lead Creative Director & Senior Cinematographer',
      'Full-day multi-location shoot (up to 3 outfit changes)',
      'Location scouting, permit coordination, and timing logs',
      '4K FPV drone aerial coverage'
    ],
    deliverables: [
      '60+ High-Resolution Master Edited Photos',
      '2-Minute Cinematic Teaser Trailer Film (4K HDR)',
      '9:16 Vertical Reel Edit synced with custom soundtrack',
      'Digital Cloud Access Vault'
    ],
    idealFor: 'Couples wanting breathtaking romantic films at heritage forts, desert dunes, or overseas destinations.',
    timeline: '1 - 2 Weeks',
    tag: 'Popular',
    optionalAddons: ['Hair & Makeup Artist Crew', 'Vintage Sports Car Rental', 'Stylized Wardrobe Rental'],
    faqs: [
      {
        question: 'Can you help us choose pre-wedding shoot locations in Rajasthan or abroad?',
        answer: 'Absolutely. We provide curated location catalogs ranging from Udaipur palaces and Amer Fort to Dubai desert dunes and Amalfi Coast villas.'
      }
    ]
  },
  {
    id: 'cinematic-wedding-films',
    title: 'Cinematic Wedding Films',
    subtitle: '4K Feature-Length Cinema',
    description: 'Hollywood-grade cinematic wedding films, highlight teasers, and sound-engineered documentaries.',
    fullDescription: 'We shoot wedding cinema like feature films. Using anamorphic lenses, steady-cam rigs, and professional audio mastering, we document speeches, vows, and grand celebrations into an unforgettable movie experience.',
    icon: 'film',
    features: ['4K Anamorphic Cinema Rigs', 'Professional Audio & Vow Capture', 'Director’s Cut & Teaser Edits', 'Custom USB & Streaming Vault'],
    whatsIncluded: [
      '2 Cinema Directors & 2 Steadicam Operators',
      'Uncompressed 4K multi-camera audio recording (vows & speeches)',
      'Custom music scoring and sound design mastering',
      'Anamorphic cinema lens setup'
    ],
    deliverables: [
      'Feature-Length Director’s Cut Film (25 - 45 Minutes)',
      '3-Minute High-Energy Teaser Film',
      'Full Ritual & Vow Documentary Video',
      'Deluxe Engraved Wooden USB Drive in Presentation Box'
    ],
    idealFor: 'Couples looking for Hollywood-grade wedding movies with theatrical scoring and emotional storytelling.',
    timeline: '4 - 6 Weeks',
    tag: 'Featured',
    optionalAddons: ['Raw 4K Footage Hard Drive Archive', 'Live Web Streaming for Overseas Guests'],
    faqs: [
      {
        question: 'Do you record audio during vows and speeches?',
        answer: 'Yes, we use wireless lapel microphones and multi-channel audio recorders to capture crystal-clear vows, speeches, and ambient musical scoring.'
      }
    ]
  },
  {
    id: 'fashion-photography',
    title: 'Fashion Photography',
    subtitle: 'High-Fashion & Lookbooks',
    description: 'Editorial fashion shoots, designer lookbooks, and high-impact model portfolio productions.',
    fullDescription: 'Crafted for fashion houses, couture designers, and models. We provide studio flash setups, high-end beauty retouching, and creative directional lighting that elevates fashion lines to vogue standards.',
    icon: 'sparkles',
    features: ['Studio & On-Location Lighting', 'High-End Vogue Beauty Retouch', 'Creative Model Directing', 'Commercial Licensing'],
    whatsIncluded: ['Fashion Director & Studio Crew', 'Profoto Studio Flash Lighting', 'High-End Skin Retouching'],
    deliverables: ['High-Res Print Files', 'Web-Optimized Lookbook Gallery', 'Commercial Licensing Rights'],
    idealFor: 'Couture designers, fashion brands, magazines, and commercial model portfolios.',
    timeline: '1 - 2 Weeks',
    tag: 'Editorial',
    optionalAddons: ['Model Casting Services', 'Hair & Makeup Team'],
    faqs: [{ question: 'Do commercial rights come included?', answer: 'Yes, full digital and print commercial licensing is included with all fashion lookbook packages.' }]
  },
  {
    id: 'commercial-brand-shoots',
    title: 'Commercial & Brand Shoots',
    subtitle: 'Corporate Cinema & Ad Campaigns',
    description: 'High-converting commercial photography and video campaigns for luxury brands and enterprises.',
    fullDescription: 'Transform brand perception with powerful visual assets. We produce corporate films, advertising key visuals, and executive headshots engineered to resonate across digital and print media.',
    icon: 'layout',
    features: ['Ad Campaign Production', 'Executive Leadership Headshots', 'High-Res Print & Billboard Files', 'Full Commercial Rights'],
    whatsIncluded: ['Commercial Producer & Film Crew', 'ARRI & RED Cinema Camera Rigs', 'Billboard-Grade Processing'],
    deliverables: ['4K Commercial Ad Cut', 'Social Media Cutdowns (15s & 30s)', 'High-Res Print Key Visuals'],
    idealFor: 'Luxury hotels, corporate enterprises, lifestyle brands, and ad agencies.',
    timeline: '2 - 3 Weeks',
    tag: 'Commercial',
    optionalAddons: ['Voiceover Recording & Licensing', 'Subtitling & Translations'],
    faqs: [{ question: 'What video formats do you supply?', answer: 'We deliver 16:9 4K Master cuts alongside 9:16 vertical cuts for Instagram, TikTok, and Youtube Shorts.' }]
  },
  {
    id: 'product-photography',
    title: 'Product Photography',
    subtitle: '360° Studio & E-Commerce Art',
    description: 'Macro detail studio product photography and video teasers for e-commerce and luxury brands.',
    fullDescription: 'Capture intricate textures, metallic reflections, and jewelry details with specialized macro lenses and studio softboxes designed to drive customer engagement and high conversion rates.',
    icon: 'sun',
    features: ['Macro Lens Precision', 'Pure White & Stylized Backgrounds', 'Color Accentuation & Reflection Control', 'Web & High-Res Export'],
    whatsIncluded: ['Macro Lens Studio Setup', 'Color Matching & Reflection Removal', 'Pure White & Mood Shots'],
    deliverables: ['Amazon/Shopify Ready JPEG/PNG', 'High-Res Master TIFF Files', '360° Video Preview'],
    idealFor: 'Jewelry brands, cosmetics, e-commerce stores, and luxury product lines.',
    timeline: '1 Week',
    tag: 'Studio',
    optionalAddons: ['Stylized Prop Sourcing', '3D Model Render Support'],
    faqs: [{ question: 'Can we send products via courier to your studio?', answer: 'Yes, clients routinely ship jewelry and products directly to our secure Jaipur studio facility.' }]
  },
  {
    id: 'event-coverage',
    title: 'Event Coverage',
    subtitle: 'VIP Galas & Live Conventions',
    description: 'Real-time multi-photographer coverage for corporate conventions, award galas, and VIP events.',
    fullDescription: 'Comprehensive event documentation delivered with speed and precision. Includes live photo booth options, instant social media delivery feeds, and crisp highlights.',
    icon: 'brush',
    features: ['Multi-Photographer Roster', 'Same-Day Preview Gallery', 'Keynote & Gala Highlights', 'VIP Red Carpet Setup'],
    whatsIncluded: ['Multi-Photographer Team', 'On-site Photo Editor', 'Press & PR Feed Delivery'],
    deliverables: ['Same-Day Press Preview Highlights', 'Complete Color-Graded Event Vault', 'Social Media Clips'],
    idealFor: 'Award galas, conventions, product launches, and corporate celebrations.',
    timeline: '3 - 5 Days',
    tag: 'Live Events',
    optionalAddons: ['Live Photo Booth with Instant Prints', 'Same-Day Video Highlight Edit'],
    faqs: [{ question: 'How quickly can press photos be delivered?', answer: 'We can deliver curations within 2 hours during live events for press releases and immediate social posts.' }]
  },
  {
    id: 'drone-photography',
    title: 'Drone Photography & Videography',
    subtitle: '4K FPV & Aerial Cinematography',
    description: 'Licensed 4K aerial photography and FPV drone cinematic shots for weddings, estates, and films.',
    fullDescription: 'Experience sweeping bird’s-eye perspectives. Our DGCA-certified FPV drone pilots capture smooth 4K aerial fly-throughs, venue landscapes, and grand outdoor wedding entries.',
    icon: 'palette',
    features: ['Licensed FPV & Cinema Pilots', '4K 60FPS Smooth Aerial Video', 'High-Res Aerial Orthomosaics', 'Safe Weather Flight Protocols'],
    whatsIncluded: ['DGCA-Certified FPV Pilot & Spotter', 'DJI Inspire 3 & Avata 2 Rigs', '4K HDR Cinema Capture'],
    deliverables: ['Edited 4K Aerial Video Clips', 'High-Resolution Aerial Ortho Photos', 'Raw 60FPS Video Files'],
    idealFor: 'Destination weddings, palace estates, commercial real estate, and tourism films.',
    timeline: '1 - 2 Weeks',
    tag: '4K Aerial',
    optionalAddons: ['3D Aerial Mapping Render', 'Live HDMI Feed to Event Screens'],
    faqs: [{ question: 'Are your drone pilots certified and insured?', answer: 'Yes, all our drone operators carry DGCA pilot licenses and adhere to safe flight altitude protocols.' }]
  },
  {
    id: 'reels-social-media',
    title: 'Reels & Social Media Content',
    subtitle: 'Viral Short-Form Cinema',
    description: 'Trending vertical reels, TikTok clips, and short-form video content optimized for social growth.',
    fullDescription: 'Engage audiences with high-energy 9:16 vertical cinema. We film, color grade, and edit fast-paced reels with custom music overlays, sound effects, and kinetic typography.',
    icon: 'frame',
    features: ['9:16 Vertical 4K Capture', 'Trending Transition & Audio Sync', 'Fast 48-Hour Turnaround', 'Content Calendar Packages'],
    whatsIncluded: ['Mobile Cinema Operator', 'Vertical 4K Camera Rig', 'Trending Sound & Typography Editing'],
    deliverables: ['5 to 10 High-Energy Reels', 'Custom Audio & Subtitle Overlays', 'Instagram/TikTok Ready File Formats'],
    idealFor: 'Couples wanting fast wedding reels, influencers, and brands targeting Instagram growth.',
    timeline: '48 Hours',
    tag: 'Trending',
    optionalAddons: ['Monthly Content Calendar Management', 'On-Location Live Reel Posting'],
    faqs: [{ question: 'How quickly will we receive our wedding reels?', answer: 'Our mobile reel team delivers completed, edited reels within 24 to 48 hours during your event.' }]
  }
]
