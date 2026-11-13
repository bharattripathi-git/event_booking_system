import connectDB from "./config/db.js";
import dotenv from "dotenv";
import Event from "./models/Event.js";

dotenv.config();

const events = [
  {
    _id: "evt01",
    name: "Bareilly Music Fest",
    category: "Concert",
    image: "/images/events/evt01.svg",
    date: "2026-08-14",
    time: "6:00 PM",
    venue: "Rampur Garden Ground, Bareilly",
    price: 499,
    description:
      "An evening of live bands, local artists and high-energy performances. Bareilly Music Fest returns for its 5th edition with a bigger stage and more artists than ever.",
    organizer: "Bareilly Events Co.",
    schedule: [
      { time: "5:00 PM", activity: "Gate opens + registration" },
      { time: "6:00 PM", activity: "Opening act" },
      { time: "8:00 PM", activity: "Headline performance" },
      { time: "10:00 PM", activity: "Closing + after-party" },
    ],
  },
  {
    _id: "evt02",
    name: "GenAI Full Stack Bootcamp",
    category: "Workshop",
    image: "/images/events/evt02.svg",
    date: "2026-08-02",
    time: "10:00 AM",
    venue: "Invertis University, Bareilly",
    price: 0,
    description:
      "A hands-on workshop covering React, Node, MongoDB and GenAI APIs. Free entry for students, seats are limited so register early.",
    organizer: "Invertis Tech Club",
    schedule: [
      { time: "10:00 AM", activity: "Intro to full stack + GenAI" },
      { time: "12:00 PM", activity: "Hands-on project build" },
      { time: "2:00 PM", activity: "Q&A + networking" },
    ],
  },
  {
    _id: "evt03",
    name: "Startup Pitch Night",
    category: "Networking",
    image: "/images/events/evt03.svg",
    date: "2026-08-20",
    time: "5:30 PM",
    venue: "IIA Auditorium, Bareilly",
    price: 199,
    description:
      "Local founders pitch their startups in front of investors and mentors, followed by a networking session.",
    organizer: "Bareilly Startup Hub",
    schedule: [
      { time: "5:30 PM", activity: "Registration + welcome" },
      { time: "6:00 PM", activity: "Pitch rounds" },
      { time: "8:00 PM", activity: "Networking + snacks" },
    ],
  },
  {
    _id: "evt04",
    name: "Horror Short Film Screening",
    category: "Film",
    image: "/images/events/evt04.svg",
    date: "2026-08-09",
    time: "7:00 PM",
    venue: "City Cinema Hall, Bareilly",
    price: 149,
    description:
      "A special screening of Hindi/Hinglish horror shorts by local creators, followed by a creator meet-and-greet.",
    organizer: "Bareilly Filmmakers Circle",
    schedule: [
      { time: "7:00 PM", activity: "Screening begins" },
      { time: "8:30 PM", activity: "Creator Q&A" },
    ],
  },
  {
    _id: "evt05",
    name: "Diwali Food Carnival",
    category: "Festival",
    image: "/images/events/evt05.svg",
    date: "2026-11-08",
    time: "4:00 PM",
    venue: "Civil Lines Ground, Bareilly",
    price: 99,
    description:
      "Street food stalls, live music and family activities for a Diwali carnival. Something for every age group.",
    organizer: "Bareilly Cultural Society",
    schedule: [
      { time: "4:00 PM", activity: "Stalls open" },
      { time: "6:30 PM", activity: "Live music" },
      { time: "9:00 PM", activity: "Fireworks closing" },
    ],
  },
  {
    _id: "evt06",
    name: "Inter-College Coding Hackathon",
    category: "Workshop",
    image: "/images/events/evt06.svg",
    date: "2026-09-05",
    time: "9:00 AM",
    venue: "Invertis University, Bareilly",
    price: 0,
    description:
      "24hr hackathon, teams of up to 4. Prizes for best web app, best AI project and best design.",
    organizer: "Invertis Tech Club",
    schedule: [
      { time: "9:00 AM", activity: "Team check-in" },
      { time: "10:00 AM", activity: "Hacking begins" },
      { time: "9:00 AM (Day 2)", activity: "Submissions close" },
      { time: "11:00 AM (Day 2)", activity: "Judging + prizes" },
    ],
  },
];

// wipe old events and insert fresh sample data
const seedDB = async () => {
  await connectDB();
  await Event.deleteMany({});
  await Event.insertMany(events);
  console.log("Events seeded");
  process.exit();
};

seedDB();
