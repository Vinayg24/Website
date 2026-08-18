export interface TestimonialItem {
  id: string
  clientName: string
  avatarUrl: string
  rating: number
  eventOrProject: string
  location: string
  reviewText: string
  verifiedGoogleReview: boolean
  date: string
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: 't1',
    clientName: 'Ananya & Dev Malhotra',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    eventOrProject: 'Royal Destination Wedding',
    location: 'Udaipur City Palace',
    reviewText: 'Shree Radha Krishna Studio turned our 3-day royal wedding into an absolute masterpiece. The anamorphic cinema film left our family in tears of joy. Every single frame feels like a Vogue print!',
    verifiedGoogleReview: true,
    date: 'November 2024',
  },
  {
    id: 't2',
    clientName: 'Sanjana & Rohan Kapoor',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    eventOrProject: 'Destination Pre-Wedding Shoot',
    location: 'Amalfi Coast, Italy',
    reviewText: 'Working with Vikram and his crew along the Amalfi Coast was an unforgettable experience. They brought 8K cinema drones and Hasselblad rigs onto our yacht, delivering our trailer film in record time!',
    verifiedGoogleReview: true,
    date: 'October 2024',
  },
  {
    id: 't3',
    clientName: 'Natasha & Karan Singhania',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    eventOrProject: 'Palace Wedding & Reception',
    location: 'Oberoi Udaivilas, Udaipur',
    reviewText: 'The attention to lighting detail, vow audio capture, and candid photojournalism was beyond what we ever imagined. The handcrafted Italian leather album is now our prized family heirloom.',
    verifiedGoogleReview: true,
    date: 'December 2024',
  },
  {
    id: 't4',
    clientName: 'Rhea & Aditya Oberoi',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    eventOrProject: '3-Day Heritage Wedding',
    location: 'Fairmont Hotel, Jaipur',
    reviewText: 'From our Haldi marigold splashes to the midnight fireworks reception, the team was discreet, professional, and endlessly creative. They captured pure magic without ever feeling intrusive.',
    verifiedGoogleReview: true,
    date: 'January 2025',
  },
]
