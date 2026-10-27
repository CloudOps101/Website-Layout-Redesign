// Central content for the PGCCDC site. Text comes from the current website,
// reorganised to match the approved structure. Edit copy here, not in components.

import type { StaticImageData } from "next/image";

import bloodPressure from "@/assets/img/blood-pressure.webp";
import fitnessClass from "@/assets/img/fitness-class.webp";
import radioStudio from "@/assets/img/radio-studio.webp";
import filmSet from "@/assets/img/film-set.webp";
import familyCooking from "@/assets/img/family-cooking.webp";
import doctorChild from "@/assets/img/doctor-child.webp";
import entrepreneurCoaching from "@/assets/img/entrepreneur-coaching.webp";
import teamHands from "@/assets/img/team-hands.webp";

export const org = {
  name: "Prince George's County Community Development Corporation",
  short: "PGCCDC",
  tagline: "Engagement. Activism. Service.",
  motto: "For the Community. By the Community.",
  summary:
    "PGCCDC was created to give residents a real voice through engagement, empowerment, and entrepreneurship, with a focus on building healthier, stronger neighborhoods from the inside out.",
  mission:
    "PGCCDC exists because Prince George's County residents deserve a real voice in decisions about their health, their neighborhoods, and their future. We connect residents to better health outcomes, healthy food access, and fitness opportunities, alongside economic and educational programs that open doors to real opportunity.",
  address: { line1: "11720 Capstan Drive", line2: "Upper Marlboro, MD 20772" },
  mapQuery: "11720 Capstan Drive, Upper Marlboro, MD 20772",
  phone: "202-413-6431",
  phoneHref: "tel:+12024136431",
  email: "tolsonbanner@princegeorges-countycdc.org",
  emailHref:
    "mailto:tolsonbanner@princegeorges-countycdc.org?cc=byeldell%40princegeorges-countycdc.org&subject=Reaching%20Out%20After%20Visiting%20the%20Website",
  generalEmail: "info@ppgccdc.com",
  contactName: "Tolson Banner",
  contactRole: "Executive Director",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/muzikxposeradio.1/" },
    { label: "Instagram", href: "https://www.instagram.com/muzikxposeradio/" },
  ],
  listenLive: "https://muzikxpose.net/listen-live",
};

export type NavItem = { label: string; href: string; description?: string };

export const programs = [
  {
    slug: "medical-innovation-districts",
    href: "/programs/medical-innovation-districts",
    title: "Medical Innovation Districts",
    short: "MIDs",
    tag: "Economic & health development",
    summary:
      "A healthcare hub, free workforce training and 2,430+ career-level jobs with local hiring, powered by clean, on-site energy.",
    image: bloodPressure,
    alt: "A health worker checking an older man's blood pressure",
  },
  {
    slug: "health-wellness-fitness",
    href: "/programs/health-wellness-fitness",
    title: "Health, Wellness & Fitness",
    short: "Health & Wellness",
    tag: "Healthier neighborhoods",
    summary:
      "Health education on cardiovascular health, diabetes and brain health, plus locally sourced, organic food for better nutrition.",
    image: fitnessClass,
    alt: "A group fitness class lifting light dumbbells together",
  },
  {
    slug: "muzik-xpose-radio",
    href: "/programs/muzik-xpose-radio",
    title: "Muzik Xpose' Radio",
    short: "Muzik Xpose' Radio",
    tag: "Voice of the County",
    summary:
      "The Nation's premier Black Muzik streaming network and home of the Health Notes podcast.",
    image: radioStudio,
    alt: "A studio microphone in front of a radio broadcast desk",
  },
  {
    slug: "artist-in-residence",
    href: "/programs/artist-in-residence",
    title: "Artist in Residence",
    short: "Artist in Residence",
    tag: "Film & storytelling",
    summary:
      "Filmmaker-in-Residence Monty Ross and the documentary “Let Me Put This BUG In Your Ear: The John ‘Peterbug’ Matthews Story.”",
    image: filmSet,
    alt: "A film crew setting up cameras and lights on a set",
  },
] as const;

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Signature Programs", href: "/programs" },
  { label: "Strategic Partnerships", href: "/partnerships" },
  { label: "Contact", href: "/contact" },
];

export const municipalities = [
  "Oxon Hill",
  "Laurel",
  "Capitol Heights",
  "Bowie",
  "Forestville",
  "Largo",
  "Seat Pleasant",
  "Upper Marlboro",
  "Greenbelt",
  "Hyattsville",
  "College Park",
  "District Heights",
];

export const pillars = [
  {
    title: "Engagement",
    text: "Bringing county residents into the conversations that shape the programs and policies affecting their well-being.",
  },
  {
    title: "Empowerment",
    text: "Connecting families to health education, healthy food and fitness resources in their own neighborhoods.",
  },
  {
    title: "Entrepreneurship",
    text: "Economic and educational programs, like coaching first-time entrepreneurs, that open doors to real opportunity.",
  },
];

export const priorities: { title: string; text: string; image: StaticImageData; alt: string }[] = [
  {
    title: "Nutrition close to home",
    text: "Connecting families to nutrition education and healthy food resources in their own neighborhoods.",
    image: familyCooking,
    alt: "A family cooking a healthy meal together in their kitchen",
  },
  {
    title: "Health partnerships",
    text: "Partnering with local recreation centers and healthcare organizations on cardiovascular health, diabetes prevention, and brain health education.",
    image: doctorChild,
    alt: "A doctor speaking with a young patient during a check-up",
  },
  {
    title: "First-time founders",
    text: "Coaching a first-time entrepreneur through their first business plan.",
    image: entrepreneurCoaching,
    alt: "Three women reviewing a business plan on a laptop",
  },
  {
    title: "A seat at the table",
    text: "Bringing county residents into conversations that shape the programs and policies that affect their well-being.",
    image: teamHands,
    alt: "Community members joining hands in a show of unity",
  },
];

// Archived profiles (removed from the site, kept for later) live in ./archive.ts
export const leadership = [
  {
    name: "Michael Tolson Banner, MBA",
    role: "Executive Director",
    initials: "TB",
    bio: [
      "Michael Tolson Banner has been a community-oriented and civic-minded resident of Prince George's County for over 20 years. He attended Langston University and graduated magna cum laude from Clark Atlanta University with a BA in Communications. He went on to earn an MBA from Howard University's Graduate School of Business and holds a Series 7 license as a stockbroker.",
      "Banner currently serves as National Construction Contract Administrator with NTERSECTION, LLC, and has also worked as a Senior Contracts Specialist with several federal agencies. He is the creator of MuzikXpose.net, a digital Black streaming music and news network showcasing the lifestyles of Prince George's County and Black America. Banner is also a recent graduate of the Prince George's County Neighborhood Planning Academy.",
    ],
  },
];

export const board = [
  {
    name: "Alma McPherson",
    initials: "AM",
    bio: "Alma McPherson holds a Bachelor of Science from the University of the District of Columbia and a Master of Science from Howard University. She has built a distinguished career in early childhood education and health care, spending more than 20 years serving children with disabilities and the families of returning citizens. She has devoted much of her career to expanding access to STEM education for young learners. She has also worked in public and mental health settings, advocating for policy change at the state and federal levels.",
  },
  {
    name: "John “Petersburg” Matthews",
    initials: "JM",
    bio: "John “Petersburg” Matthews studied sociology at the University of the District of Columbia and attended the Oklahoma Technical Institute. Guided by the Booker T. Washington philosophy of equipping young people with a marketable trade, he taught leather goods and shoe repair in DC public schools for more than 20 years. He has also been a community and political activist for over two decades. Today he leads the Petersburg Shoe Academy, which teaches entrepreneurial skills to young adults across the DMV.",
  },
  {
    name: "Linwood Ferguson, CPA",
    initials: "LF",
    bio: "Linwood Ferguson holds a Bachelor's degree in Business from Howard University and a Master's degree in Business, with a concentration in economic development, from the University of Maryland. He is a Certified Public Accountant. He began his career as a financial analyst and consultant with several Big 8 accounting firms, then moved into higher education, teaching accounting at local universities.",
  },
];

