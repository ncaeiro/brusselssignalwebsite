export interface EventGuest {
  name: string;
  title?: string;
}

export interface EventVideo {
  url: string;
  title: string;
  thumbnailUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'Upcoming' | 'Past Event';
  imageUrl: string;
  guests: EventGuest[];
  carouselImages: string[];
  videos: EventVideo[];
}

const BASE = import.meta.env.BASE_URL;

export const EVENTS_DATA: Event[] = [
  {
    id: 'brussels-signal-launch-event',
    title: 'Brussels Signal Launch Event',
    date: 'January 15, 2025',
    time: '18:00 - 21:00 CET',
    location: 'Brussels Press Club, Rue Froissart 95, 1040 Brussels',
    description: 'Join us for the official launch of Brussels Signal, featuring panel discussions on the future of European journalism and networking opportunities with journalists, policymakers, and fellow readers passionate about independent European news.',
    type: 'Past Event',
    imageUrl: BASE + 'images/events/launch-event.jpg',
    guests: [
      { name: 'Patrick Egan', title: 'Publisher, Founder & CEO, Remedia Europe' },
      { name: 'Krzysztof Mularczyk', title: 'Editor-in-Chief, Brussels Signal' },
    ],
    carouselImages: [],
    videos: [],
  },
  {
    id: 'eu-policy-debate-migration',
    title: 'EU Policy Debate: The Future of Migration',
    date: 'February 20, 2025',
    time: '19:00 - 21:30 CET',
    location: 'European Parliament, Brussels',
    description: 'An in-depth debate on European migration policy with MEPs, policy experts, and civil society representatives. The discussion will explore the tensions between humanitarian obligations, border security, and the political pressures reshaping the EU\'s approach to migration.',
    type: 'Upcoming',
    imageUrl: BASE + 'images/events/migration-debate.jpg',
    guests: [
      { name: 'Carl Deconinck', title: 'Senior Reporter, Brussels Signal' },
    ],
    carouselImages: [],
    videos: [],
  },
  {
    id: 'investigative-journalism-workshop',
    title: 'Investigative Journalism Workshop',
    date: 'March 10, 2025',
    time: '14:00 - 18:00 CET',
    location: 'Brussels Signal Headquarters',
    description: 'A hands-on workshop for aspiring investigative journalists covering EU institutions, data journalism, and FOIA requests. Participants will learn practical techniques for uncovering information, working with sources, and holding European institutions to account.',
    type: 'Upcoming',
    imageUrl: BASE + 'images/events/journalism-workshop.avif',
    guests: [
      { name: 'Claire Lemaire', title: 'Investigative Reporter, Brussels Signal' },
      { name: 'Chris Gattringer', title: 'Data Journalist, Brussels Signal' },
    ],
    carouselImages: [],
    videos: [],
  },
];
