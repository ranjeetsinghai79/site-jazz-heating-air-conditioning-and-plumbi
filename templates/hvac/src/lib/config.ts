import type { SiteConfig, BrandStoryChapter } from "@core/web/types"

export const config: SiteConfig & { brandStoryChapters: BrandStoryChapter[] } = {
  business: {
    name: "Jazz Heating, Air Conditioning and Plumbing",
    tagline: "Comfort Flows. We Make It So.",
    phone: "(925) 678-5456",
    phoneHref: "tel:+19256785456",
    email: "info@jazzhvac.com",
    address: "2158 Rheem Dr, Pleasanton, CA 94588",
    city: "Pleasanton",
    serviceAreas: ["Pleasanton", "Dublin", "Livermore", "San Ramon", "Danville", "Walnut Creek"],
    license: "CA C20, C36, C46",
    since: "2007",
    google_rating: "4.9",
    review_count: "200+",
    emergency: true,
    social: {
      google: "https://google.com",
      yelp: "https://yelp.com",
      facebook: "https://facebook.com",
    },
    theme: "navy",
    niche: "hvac",
  },

  services: [
    { icon: "thermometer",  title: "AC Repair & Installation", desc: "Expert technicians diagnose and fix all AC brands. Same-day service available for urgent breakdowns.", urgent: true },
    { icon: "flame",        title: "Heating Services",         desc: "Reliable repair, maintenance, and installation for furnaces, heat pumps, and all heating systems.", urgent: false },
    { icon: "droplets",     title: "Plumbing Solutions",       desc: "From leak repair to water heater installs—comprehensive plumbing for residential and commercial.", urgent: false },
    { icon: "zap",          title: "24/7 Emergency",           desc: "Round-the-clock rapid response for urgent HVAC and plumbing emergencies across the Tri-Valley.", urgent: true },
    { icon: "shield-check", title: "Maintenance Plans",        desc: "Annual tune-ups that extend system life, improve efficiency, and prevent costly breakdowns.", urgent: false },
    { icon: "wrench",       title: "New System Installation",  desc: "Professional installation of HVAC systems and plumbing fixtures. We help you choose the right unit.", urgent: false },
  ],

  testimonials: [
    { name: "Sarah L.", location: "Pleasanton, CA", stars: 5, text: "AC went out on the hottest day of the year. Jazz responded in under an hour—fixed by lunchtime. Professional and fair priced." },
    { name: "David R.", location: "Dublin, CA",      stars: 5, text: "Had a persistent leak other plumbers couldn't fix. Jazz found it immediately and the repair has held up perfectly." },
    { name: "Emily P.", location: "Livermore, CA",   stars: 5, text: "New furnace installation from quote to finish was smooth and stress-free. Team was knowledgeable and finished ahead of schedule." },
  ],

  trustBadges: [
    "NATE Certified",
    "CA Licensed C20 C36 C46",
    "24/7 Emergency Service",
    "Licensed & Insured",
    "Free Estimates",
    "17 Years Experience",
  ],

  stats: [
    { value: "17+", label: "Years in Business" },
    { value: "4.9★", label: "Google Rating" },
    { value: "24/7", label: "Emergency Available" },
    { value: "200+", label: "5-Star Reviews" },
  ],

  reasons: [
    { icon: "clock",        title: "1-Hour Response",     desc: "We dispatch within the hour for emergencies across Pleasanton, Dublin, Livermore, and the Tri-Valley." },
    { icon: "shield-check", title: "Triple Licensed",     desc: "CA C20, C36, and C46 licensed—covering HVAC, plumbing, and refrigeration. One call covers it all." },
    { icon: "dollar-sign",  title: "Upfront Pricing",     desc: "We quote before we start. No hidden fees. You know the price before we touch anything." },
    { icon: "star",         title: "17 Years Local",      desc: "Family-owned since 2007 in the Tri-Valley. We know these neighborhoods and build long-term relationships." },
  ],

  brandStoryChapters: [
    {
      index: "01",
      label: "Our Beginning",
      headline: "Born in the Tri-Valley",
      body: "Jazz was founded in 2007 by local technicians who believed the Tri-Valley deserved better HVAC service—faster response, honest pricing, and technicians who treated your home like their own.",
      bg: "var(--brand-bg)",
      fg: "var(--brand-text)",
    },
    {
      index: "02",
      label: "Our Standard",
      headline: "The 1-Hour Promise",
      body: "When your AC fails in a Pleasanton summer or your heat goes out in winter, every minute counts. We built our operations around one commitment: be there within the hour, every time.",
      bg: "var(--brand-surface)",
      fg: "var(--brand-text)",
    },
    {
      index: "03",
      label: "Our Promise",
      headline: "No Surprises. Just Results.",
      body: "We quote before we start and explain every step. With triple licensing covering HVAC, plumbing, and refrigeration, Jazz is the one call that handles it all.",
      bg: "var(--brand-accent)",
      fg: "#ffffff",
    },
  ],
}

// Backward compatibility exports for old-format template components
export const BUSINESS = config.business
export const SERVICES = config.services
export const TESTIMONIALS = config.testimonials.map(t => ({ ...t, rating: t.stars }))
export const TRUST_BADGES = config.trustBadges
