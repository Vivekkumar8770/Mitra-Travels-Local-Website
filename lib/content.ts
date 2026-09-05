export type TourPackage = {
  id?: number;
  slug: string;
  country: "India" | "Nepal";
  title: string;
  duration: string;
  summary: string;
  route: string;
  highlights: string[];
  itinerary: { day: string; title: string; details: string }[];
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
  active: boolean;
  imageUrl: string;
};

export type BlogPost = {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  publishedAt: string;
  active: boolean;
  imageUrl?: string;
};

export const packages: TourPackage[] = [
  {
    slug: "kathmandu-pokhara-discovery",
    country: "Nepal",
    title: "Nepal Tour Package from Raxaul: Kathmandu & Pokhara",
    duration: "5 Days / 4 Nights",
    summary: "A comfortable Nepal tour package from Raxaul combining Kathmandu's sacred landmarks with Pokhara's lakeside calm and Himalayan views.",
    route: "Raxaul → Kathmandu → Pokhara → Raxaul",
    highlights: ["Pashupatinath Temple", "Pokhara lakeside", "Private vehicle", "Custom hotel options"],
    itinerary: [
      { day: "Day 1", title: "Raxaul to Kathmandu", details: "Border assistance, private transfer and hotel check-in. Pashupatinath Darshan if time permits." },
      { day: "Day 2", title: "Kathmandu sightseeing", details: "Visit Pashupatinath, Guhyeshwari, Swayambhunath, Boudhanath and Budhanilkantha." },
      { day: "Day 3", title: "Kathmandu to Pokhara", details: "Scenic drive to Pokhara with planned refreshment stops and hotel check-in." },
      { day: "Day 4", title: "Pokhara sightseeing", details: "Explore Davis Falls, Gupteshwar Cave, Bindabasini Temple and Phewa Lake." },
      { day: "Day 5", title: "Return to Raxaul", details: "Comfortable private transfer to Raxaul with border drop assistance." },
    ],
    inclusions: ["Private vehicle for the complete tour", "Fuel, bhansaar, yatayaat and road taxes", "Driver stay", "Customisable hotel category"],
    exclusions: ["Personal expenses", "Meals unless mentioned in the quote", "Entry tickets and activity charges"],
    featured: true,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1558799401-1dc8f3f3a7f4?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "muktinath-pilgrimage-journey",
    country: "Nepal",
    title: "Muktinath Pilgrimage Journey",
    duration: "6 Days / 5 Nights",
    summary: "A carefully planned spiritual road journey through Pokhara and Jomsom to the revered Muktinath Temple.",
    route: "Raxaul → Pokhara → Jomsom → Muktinath → Pokhara → Raxaul",
    highlights: ["Muktinath Darshan", "Jomsom overnight stay", "Mountain road support", "Private vehicle"],
    itinerary: [
      { day: "Day 1", title: "Raxaul to Pokhara", details: "Pickup from Raxaul and transfer to Pokhara for an overnight stay." },
      { day: "Day 2", title: "Pokhara sightseeing", details: "Explore Pokhara's major temples, caves, waterfall and lakeside." },
      { day: "Day 3", title: "Pokhara to Jomsom", details: "Mountain transfer via Beni and Marpha with carefully planned breaks." },
      { day: "Day 4", title: "Muktinath Darshan", details: "Early drive for temple Darshan, then return toward Pokhara." },
      { day: "Day 5", title: "Leisure in Pokhara", details: "Flexible day for rest, local exploration or optional activities." },
      { day: "Day 6", title: "Return to Raxaul", details: "Private transfer and border drop." },
    ],
    inclusions: ["Private vehicle", "Driver accommodation", "Road taxes and vehicle permits", "Trip coordination"],
    exclusions: ["Muktinath personal permits unless quoted", "Meals", "Personal expenses and entry fees"],
    featured: true,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "nepal-grand-circuit",
    country: "Nepal",
    title: "Nepal Grand Circuit",
    duration: "8 Days / 7 Nights",
    summary: "A complete Nepal experience covering heritage, wildlife, pilgrimage and mountain landscapes at your pace.",
    route: "Raxaul → Chitwan → Lumbini → Pokhara → Kathmandu → Raxaul",
    highlights: ["Chitwan", "Lumbini", "Pokhara", "Kathmandu"],
    itinerary: [
      { day: "Days 1–2", title: "Chitwan & Lumbini", details: "Begin with Chitwan, then continue to Lord Buddha's birthplace at Lumbini." },
      { day: "Days 3–5", title: "Pokhara experience", details: "Scenic transfer, sightseeing and time to enjoy the lakeside city." },
      { day: "Days 6–7", title: "Kathmandu heritage", details: "Visit the valley's leading temples, stupas and cultural landmarks." },
      { day: "Day 8", title: "Return to Raxaul", details: "Private vehicle transfer and border assistance." },
    ],
    inclusions: ["Private vehicle", "Route planning", "Driver stay", "Vehicle permits and taxes"],
    exclusions: ["Meals and personal expenses", "Entry fees", "Activities not listed in the final quote"],
    featured: false,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "sikkim-darjeeling-escape",
    country: "India",
    title: "Sikkim & Darjeeling Escape",
    duration: "6 Days / 5 Nights",
    summary: "Tea gardens, Himalayan viewpoints and peaceful monasteries in one private, customisable hill journey.",
    route: "NJP → Gangtok → Darjeeling → NJP",
    highlights: ["Gangtok", "Tsomgo Lake", "Darjeeling", "Tiger Hill"],
    itinerary: [
      { day: "Days 1–3", title: "Gangtok & surroundings", details: "Arrival transfer, local sightseeing and a planned excursion based on permits and weather." },
      { day: "Days 4–5", title: "Darjeeling", details: "Tea gardens, heritage viewpoints and a relaxed hill-town experience." },
      { day: "Day 6", title: "Departure", details: "Private transfer to NJP or Bagdogra." },
    ],
    inclusions: ["Private transfers", "Selected hotel category", "Driver charges", "Trip coordination"],
    exclusions: ["Meals unless mentioned", "Personal expenses", "Special permits and activity charges"],
    featured: true,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "varanasi-spiritual-trail",
    country: "India",
    title: "Varanasi Spiritual Trail",
    duration: "4 Days / 3 Nights",
    summary: "A meaningful visit to Kashi's ghats, temples and the evening Ganga Aarti with comfortable private transfers.",
    route: "Varanasi → Sarnath → Varanasi",
    highlights: ["Kashi Vishwanath", "Ganga Aarti", "Sarnath", "Private sightseeing"],
    itinerary: [
      { day: "Day 1", title: "Arrival in Varanasi", details: "Pickup, hotel check-in and evening Ganga Aarti." },
      { day: "Day 2", title: "Temple & ghat tour", details: "Early boat ride followed by prominent temples and heritage lanes." },
      { day: "Day 3", title: "Sarnath excursion", details: "Explore Sarnath and enjoy a relaxed evening in Varanasi." },
      { day: "Day 4", title: "Departure", details: "Private transfer to the railway station or airport." },
    ],
    inclusions: ["Private vehicle", "Local sightseeing", "Driver charges", "Custom hotel options"],
    exclusions: ["Boat ride and entry fees", "Meals", "Personal expenses"],
    featured: false,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85",
  },
  {
    slug: "ayodhya-prayagraj-pilgrimage",
    country: "India",
    title: "Ayodhya & Prayagraj Pilgrimage",
    duration: "4 Days / 3 Nights",
    summary: "A comfortable spiritual circuit connecting Ayodhya's sacred sites with Prayagraj's Triveni Sangam.",
    route: "Ayodhya → Prayagraj → Ayodhya",
    highlights: ["Shri Ram Mandir", "Hanuman Garhi", "Triveni Sangam", "Private vehicle"],
    itinerary: [
      { day: "Days 1–2", title: "Ayodhya Darshan", details: "Visit Shri Ram Mandir, Hanuman Garhi and the main sacred landmarks." },
      { day: "Day 3", title: "Prayagraj", details: "Private excursion to Triveni Sangam and key pilgrimage sites." },
      { day: "Day 4", title: "Departure", details: "Assisted departure transfer based on your train or flight timing." },
    ],
    inclusions: ["Private vehicle", "Driver charges", "Route support", "Custom accommodation"],
    exclusions: ["Meals", "Entry or boating charges", "Personal expenses"],
    featured: false,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1400&q=85",
  },
];

export const blogPosts: BlogPost[] = [
  { slug: "best-time-to-visit-nepal", title: "Best Time to Visit Nepal: A Simple Seasonal Guide", excerpt: "Choose the right month for temple visits, Himalayan views and comfortable road travel.", content: "Nepal offers a different experience in every season. October to December is popular for clear mountain views, while February to April brings pleasant weather and colourful landscapes. Monsoon travel can be beautiful, but mountain routes may need extra flexibility. The best time for your trip depends on the route, activities and comfort level of your group.", category: "Nepal Travel", publishedAt: "2026-08-20", active: true, imageUrl: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1400&q=85" },
  { slug: "muktinath-road-trip-guide", title: "What to Know Before a Muktinath Road Trip", excerpt: "Practical planning tips for permits, altitude, overnight halts and mountain-road conditions.", content: "A Muktinath road journey rewards careful planning. Travellers should allow time for changing road conditions, carry warm layers and discuss permit requirements before departure. An overnight halt around Jomsom helps create a safer, more comfortable itinerary. Always keep medicines, identity documents and some flexible time in your schedule.", category: "Travel Guide", publishedAt: "2026-08-12", active: true, imageUrl: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1400&q=85" },
  { slug: "india-nepal-border-checklist", title: "India–Nepal Border Travel Checklist", excerpt: "A quick checklist to help families prepare for a smooth cross-border holiday from Raxaul.", content: "Keep valid identification for every traveller, confirm hotel details and share your expected border arrival time with the tour coordinator. Carry essential medicines, light snacks and a small amount of local currency. Vehicle paperwork and route permits should be confirmed as part of your final travel quote.", category: "Travel Tips", publishedAt: "2026-08-02", active: true, imageUrl: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1400&q=85" },
];

export const faqs = [
  { question: "Can I customise a package?", answer: "Yes. Every itinerary can be adjusted around your dates, pickup point, group size, hotel preference and travel pace." },
  { question: "Do you accept online payment on this website?", answer: "No. This website is for information and enquiries. Our team shares the final quote and booking process directly with you." },
  { question: "Where does Mitra Travels operate from?", answer: "We are based in Raxaul, Bihar, and specialise in India and Nepal tours, Raxaul to Nepal taxi service and convenient border assistance." },
  { question: "Do you provide car rental in Raxaul?", answer: "Yes. We arrange reliable cars and private vehicles in Raxaul for local travel, transfers, Nepal visits and customised India tours." },
  { question: "Can you arrange a Janakpur or Pokhara tour from Raxaul?", answer: "Yes. Our team can plan Janakpur tours, Pokhara tour packages and other Nepal yatras from Raxaul with transport, hotels, permits and route support." },
  { question: "Are hotels included in every package?", answer: "Hotel inclusion depends on the selected quote. We provide both vehicle-only and vehicle-plus-hotel options." },
  { question: "How will I receive my quotation?", answer: "After you submit an enquiry, our team will contact you by phone or WhatsApp and share a customised quotation." },
];

export const contact = {
  phone: "+91 75458 59616",
  phoneRaw: "+917545859616",
  email: "contact@mitratravels.com",
  address: "Block Road, Raxaul, East Champaran, Bihar – 845305",
};
