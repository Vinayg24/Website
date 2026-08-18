export interface AwardItem {
  year: string
  title: string
  organization: string
  category: string
}

export interface EquipmentItem {
  category: 'Cameras' | 'Lenses' | 'Drones & Stabilization' | 'Lighting & Audio'
  name: string
  specs: string
}

export interface AboutStudioData {
  studioName: string
  tagline: string
  founderName: string
  founderTitle: string
  founderQuote: string
  experienceYears: number
  weddingsCovered: number
  countriesDocumented: number
  awardsWon: number
  storyParagraphs: string[]
  mission: string
  vision: string
  awards: AwardItem[]
  equipment: EquipmentItem[]
}

export const aboutStudioData: AboutStudioData = {
  studioName: 'Shree Radha Krishna Studio',
  tagline: 'Master Visual Artists & Royal Wedding Cinematographers',
  founderName: 'Ajeet Sharma',
  founderTitle: 'Founder & Creative Director',
  founderQuote: 'We believe photography is not just about recording a moment; it is about immortalizing the soul, grandeur, and deep emotion of human celebration into timeless fine art.',
  experienceYears: 15,
  weddingsCovered: 500,
  countriesDocumented: 18,
  awardsWon: 25,
  storyParagraphs: [
    'Founded over 15 years ago in Jaipur, Rajasthan—the heartland of royal heritage and architectural splendor—Shree Radha Krishna Studio has evolved into India’s premier luxury wedding photography and cinematography house.',
    'Our studio combines traditional Indian heritage values with Hollywood-grade cinema optics, utilizing 8K RED V-Raptor cameras, medium-format Hasselblad bodies, anamorphic lenses, and DGCA-certified FPV drones. We have documented royal palace celebrations across Udaipur, Jaipur, Jodhpur, and destination weddings across Europe, the Middle East, and Asia.',
    'With a dedicated team of master photojournalists, cinema directors, lighting engineers, and fine-art retouchers, we treat every wedding as an individual cinematic masterpiece.'
  ],
  mission: 'To create breathtaking, emotionally resonant visual heirlooms that capture the authentic spirit, elegance, and grand tradition of life’s most meaningful celebrations.',
  vision: 'To redefine global luxury wedding photography through cutting-edge optical technology, fine-art storytelling, and impeccable client service.',
  awards: [
    { year: '2024', title: 'Best Luxury Wedding Cinematographer', organization: 'International Wedding Awards', category: 'Royal Destination Cinema' },
    { year: '2023', title: 'Top 10 Indian Wedding Photographers', organization: 'Vogue India Heritage Issue', category: 'Fine Art Photojournalism' },
    { year: '2022', title: 'Fearless Photographer Excellence Award', organization: 'Fearless Photographers', category: 'Candid Moments' },
    { year: '2021', title: 'Best FPV Drone Aerial Cinematography', organization: 'Global Drone Cinema Fest', category: 'Heritage Fly-Through' }
  ],
  equipment: [
    { category: 'Cameras', name: 'RED V-Raptor 8K VV', specs: '8K 120FPS Anamorphic Cinema Master' },
    { category: 'Cameras', name: 'Sony FX6 & FX3 Cinema', specs: 'Full-Frame 4K Dual Native ISO Cinema Rigs' },
    { category: 'Cameras', name: 'Hasselblad H6D-100c', specs: '100MP Medium Format Studio Body' },
    { category: 'Lenses', name: 'Cooke Anamorphic Prime Set', specs: '25mm, 32mm, 50mm, 75mm, 100mm T2.0' },
    { category: 'Lenses', name: 'Sony G-Master Prime Suite', specs: '24mm, 35mm, 50mm, 85mm, 135mm f/1.2 & f/1.4' },
    { category: 'Drones & Stabilization', name: 'DJI Inspire 3 8K FPV', specs: 'Full-Frame 8K RAW Cinema Drone' },
    { category: 'Drones & Stabilization', name: 'DJI Ronin 4D & RS3 Pro', specs: '4-Axis Gimbal Stabilization' },
    { category: 'Lighting & Audio', name: 'Profoto B10X Duo Studio', specs: '500Ws Battery Studio Flash' },
    { category: 'Lighting & Audio', name: 'Sennheiser AVX Wireless Suite', specs: 'Multi-Channel Digital Audio Recorders' }
  ]
}
