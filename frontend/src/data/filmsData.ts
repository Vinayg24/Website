export interface FilmItem {
  id: string
  title: string
  coupleOrClient: string
  location: string
  year: string
  category: string
  thumbnailUrl: string
  videoUrl: string
  duration: string
  shortStory: string
  featuredBadge: string
  cameraGear: string
  director: string
  tags: string[]
}

export const featuredFilmsData: FilmItem[] = [
  {
    id: 'film-1',
    title: 'Ananya & Dev: The Royal Udaipur Affair',
    coupleOrClient: 'Ananya Malhotra & Dev Singhania',
    location: 'City Palace & Taj Lake Palace, Udaipur',
    year: '2024',
    category: 'Royal Wedding Film',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-together-in-a-park-41551-large.mp4',
    duration: '4:15 Cinema Cut',
    shortStory: 'A timeless 3-day royal palace celebration along Lake Pichola featuring golden hour portraits, custom live orchestration, and 8K anamorphic cinematography.',
    featuredBadge: '8K Anamorphic',
    cameraGear: 'RED V-Raptor 8K & Sony FX6 Cinema',
    director: 'Lead Director Vikram S.',
    tags: ['Royal Wedding', 'Udaipur', 'Palace Cinema', 'Anamorphic'],
  },
  {
    id: 'film-2',
    title: 'Sanjana & Rohan: Italian Coast Romance',
    coupleOrClient: 'Sanjana Kapoor & Rohan Varma',
    location: 'Amalfi Coast & Capri, Italy',
    year: '2024',
    category: 'Destination Pre-Wedding',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-smiling-and-walking-in-a-forest-41552-large.mp4',
    duration: '3:30 Teaser Film',
    shortStory: 'Cinematic pre-wedding romance captured across sun-drenched cliffside Italian villas, vintage sports cars, and private yacht cruises.',
    featuredBadge: '4K HDR',
    cameraGear: 'Sony FX3 & DJI Ronin RS3',
    director: 'Senior Director Rahul M.',
    tags: ['Destination', 'Italy', 'Amalfi Coast', 'Romance'],
  },
  {
    id: 'film-3',
    title: 'Natasha & Karan: The Grand Chandelier Symphony',
    coupleOrClient: 'Natasha & Karan Singhania',
    location: 'Oberoi Udaivilas, Udaipur',
    year: '2024',
    category: 'Sangeet & First Dance Film',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-having-their-first-dance-41549-large.mp4',
    duration: '5:10 Full Film',
    shortStory: 'An emotional, breathtaking first dance ceremony illuminated by crystal chandeliers and golden pyro fountains in the grand ballroom.',
    featuredBadge: 'FPV Aerials',
    cameraGear: 'Sony FX6 & DJI Inspire 3 FPV',
    director: 'Creative Director Ajeet S.',
    tags: ['First Dance', 'Sangeet', 'Udaipur', 'FPV Drone'],
  },
]
