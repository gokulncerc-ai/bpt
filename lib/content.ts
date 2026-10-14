export const contact = {
  institution:
    "P K DAS COLLEGE OF PHYSIOTHERAPY",

  address:
    "Vaniamkulam, Ottapalam, Palakkad Dist, Kerala - 679522",

  admissionHotline: "+917511115588",

  admissionHotlineHref:
    "tel: 0466 2344700",

  enquiryNumbers: [
    "0466 2344700",
    "+917511115588",
  ],

  email:
    "office@pkdascollegeofphysiotherapy.com",

  mapEmbedSrc:
    "https://maps.google.com/maps?q=10.7828475,76.3269766&z=17&output=embed",

  mapLinkHref:
    "https://www.google.com/maps/search/?api=1&query=10.7828475,76.3269766",
};

import { deptIconPaths } from "../components/DeptIcons";

export type Department = {
  name: string;
  icon: keyof typeof deptIconPaths;
  text: string;
};

export const departments: Department[] = [
  {
    name: "Anatomy Museum",
    icon: "bone",
    text: "Trains students across all branches of human anatomy using traditional and innovative methods with charts, bones, organs, specimens and slides supporting projector led, smart class coaching.",
  },

  {
    name: "Physiology Museum",
    icon: "pulse",
    text: "Devoted to training and education in physiology, pushing the boundaries of scientific discovery with specimens, charts and diagrammatic representations of the human system.",
  },

  {
    name: "Microbiology Lab",
    icon: "microscope",
    text: "Uses mechanical devices and structured movement approaches to restore normal musculoskeletal function, reduce pain from disease or injury, and promote mobility kept current with modern developments.",
  },

  {
    name: "Exercise Therapy Lab",
    icon: "figure",
    text: "Focuses on improving strength, mobility and function through tailored physical exercises using modern equipment for rehabilitation and prevention.",
  },

  {
    name: "Massage Therapy & Manipulation Lab",
    icon: "hands",
    text: "Manual and instrument assisted manipulation techniques including activator and drop table methods for therapeutic, targeted pain management.",
  },

  {
    name: "Electrotherapy Lab",
    icon: "bolt",
    text: "Central to managing pain and paralysis promoting muscle relaxation, reducing spasm, preventing disuse atrophy and enhancing local blood circulation.",
  },

  {
    name: "Cardiology Lab",
    icon: "heart",
    text: "Equipped with the essential tools and apparatus for both emergency response and the treatment of cardiac conditions in physiotherapeutic care.",
  },

  {
    name: "Orthopaedic Lab",
    icon: "joint",
    text: "Physiotherapy care for joint pain, injuries, surgeries and replacements with training in orthosis and prosthesis, and a focus on prevention and education.",
  },

  {
    name: "Laser Therapy Lab",
    icon: "laser",
    text: "Low-Level Laser Therapy (LLLT) relieves pain, reduces inflammation and accelerates healing — stimulating cellular repair without heat, sound or vibration.",
  },
];

export const highlights = [
  {
    n: "01",
    title: "KUHS Affiliated",
    text: "Recognised under the Kerala University of Health Sciences.",
  },

  {
    n: "02",
    title: "Hospital-Linked Training",
    text: "Clinical exposure via a superspeciality hospital & advanced clinical setup.",
  },

  {
    n: "03",
    title: "Modern Laboratories",
    text: "Nine dedicated labs covering the full physiotherapy curriculum.",
  },

  {
    n: "04",
    title: "Experienced Faculty",
    text: "Guided by experienced medical & physiotherapy professionals.",
  },
];
export const events = [
  {
    name: "Kayaking Activity",
    text: "Our students participated in an exciting kayaking activity, encouraging teamwork, confidence, adventure and active participation beyond the classroom.",
  },
  {
    name: "Musical Event",
    text: "Students showcased their musical talents at the college fest, creating an energetic and memorable celebration filled with music, creativity and enthusiasm.",
  },
  {
    name: "DJ Night with Agam Band",
    text: "The college fest came alive with an electrifying DJ night featuring Agam Band, along with spectacular fire and foam effects that created an unforgettable evening of music, energy and celebration.",
  },
  {
    name: "Music Band Wins Prize 2025",
    text: "Our college music band delivered an outstanding performance at the 2025 Intercollegiate Music Competition and secured a prize, earning recognition among colleges across South India.",
  },
  {
    name: "Free Medical Camp for Students",
    text: "A free medical camp was organised at the college to provide health check-ups and basic medical care for students, promoting health awareness and overall well-being.",
  },
  {
    name: "First-Year Medical Event Winners 2022",
    text: "Our first-year students delivered an outstanding performance at the 2022 medical event competition, securing the winning prize and bringing pride to the college.",
  },
  {
    name: "Women's Day Special Kayaking 2023",
    text: "To celebrate International Women’s Day, our students participated in a special kayaking activity in 2023, promoting confidence, teamwork, fitness and an adventurous spirit.",
  },
  {
    name: "Med Fest Aaravam 2024",
    text: "Med Fest Aaravam 2024 was a vibrant celebration of student talent, creativity and camaraderie, featuring exciting medical, cultural and entertainment events.",
  },
  {
    name: "Music Fest 2025",
    text: "The 2025 Music Fest brought the campus alive with captivating performances, showcasing the musical talents, creativity and enthusiasm of students in a vibrant celebration of music and culture.",
  },
];