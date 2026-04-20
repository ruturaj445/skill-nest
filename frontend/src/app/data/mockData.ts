export interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  postedBy: string;
  applicants: number;
  status?: "open" | "in-progress" | "completed";
}

export interface User {
  id: string;
  name: string;
  role: "student" | "client";
  creditScore: number;
  level: "Beginner" | "Intermediate" | "Pro";
  tasksCompleted: number;
  tasksApplied: number;
  rating: number;
  lateSubmissions: number;
  xp: number;
  badges: string[];
}

export const currentUser: User = {
  id: "1",
  name: "Alex Rivera",
  role: "student",
  creditScore: 450,
  level: "Intermediate",
  tasksCompleted: 23,
  tasksApplied: 8,
  rating: 4.8,
  lateSubmissions: 2,
  xp: 2340,
  badges: ["Starter", "Rising Talent", "Fast Learner"],
};

export const tasks: Task[] = [
  {
    id: "1",
    title: "Design a simple logo for a coffee shop",
    description: "Looking for a minimalist logo design for a new coffee shop. Should include a coffee cup element and clean typography.",
    budget: 50,
    difficulty: "Beginner",
    category: "Design",
    postedBy: "Sarah's Cafe",
    applicants: 12,
    status: "open",
  },
  {
    id: "2",
    title: "Write 5 Instagram captions for a fitness brand",
    description: "Need creative and engaging captions for Instagram posts. Should be motivational and align with a healthy lifestyle brand.",
    budget: 30,
    difficulty: "Beginner",
    category: "Content Writing",
    postedBy: "FitLife Studio",
    applicants: 8,
  },
  {
    id: "3",
    title: "Create a simple React contact form",
    description: "Build a contact form component in React with name, email, and message fields. Should include basic validation.",
    budget: 75,
    difficulty: "Intermediate",
    category: "Development",
    postedBy: "TechStartup Inc",
    applicants: 15,
  },
  {
    id: "4",
    title: "Edit 10-minute YouTube video",
    description: "Looking for someone to edit a vlog-style YouTube video. Basic cuts, transitions, and background music needed.",
    budget: 60,
    difficulty: "Intermediate",
    category: "Video Editing",
    postedBy: "Creative Vlogger",
    applicants: 6,
  },
  {
    id: "5",
    title: "Data entry: Organize 200 contacts into spreadsheet",
    description: "Simple data entry task. Copy information from business cards into a Google Sheets template.",
    budget: 25,
    difficulty: "Beginner",
    category: "Data Entry",
    postedBy: "Marketing Agency",
    applicants: 20,
  },
  {
    id: "6",
    title: "Design social media graphics pack (5 posts)",
    description: "Create 5 Instagram post designs for a skincare brand. Templates and brand colors will be provided.",
    budget: 80,
    difficulty: "Intermediate",
    category: "Design",
    postedBy: "GlowSkin Co",
    applicants: 18,
  },
  {
    id: "7",
    title: "Translate 2-page document from English to Spanish",
    description: "Need a simple document translated. Must be fluent in both languages. About 500 words total.",
    budget: 35,
    difficulty: "Beginner",
    category: "Translation",
    postedBy: "Global Business",
    applicants: 9,
  },
  {
    id: "8",
    title: "Build a landing page mockup in Figma",
    description: "Design a modern landing page for a SaaS product. Should include hero section, features, and CTA.",
    budget: 100,
    difficulty: "Intermediate",
    category: "UI/UX Design",
    postedBy: "CloudApp Team",
    applicants: 11,
  },
];

export const myAppliedTasks: Task[] = [
  {
    id: "9",
    title: "Proofread blog post (800 words)",
    description: "Review and edit a blog post about digital marketing trends.",
    budget: 20,
    difficulty: "Beginner",
    category: "Writing",
    postedBy: "Marketing Blog",
    applicants: 5,
    status: "in-progress",
  },
  {
    id: "10",
    title: "Create 3 icon designs",
    description: "Design three simple icons for a mobile app.",
    budget: 40,
    difficulty: "Beginner",
    category: "Design",
    postedBy: "App Developer",
    applicants: 7,
    status: "in-progress",
  },
];

export const completedTasks: Task[] = [
  {
    id: "11",
    title: "Write product descriptions (5 items)",
    description: "Created engaging product descriptions for an e-commerce store.",
    budget: 45,
    difficulty: "Beginner",
    category: "Writing",
    postedBy: "Online Store",
    applicants: 0,
    status: "completed",
  },
  {
    id: "12",
    title: "Color correct 15 photos",
    description: "Adjusted lighting and color balance for product photos.",
    budget: 55,
    difficulty: "Intermediate",
    category: "Photo Editing",
    postedBy: "E-commerce Brand",
    applicants: 0,
    status: "completed",
  },
];

export const leaderboard = [
  { rank: 1, name: "Emma Chen", creditScore: 890, xp: 8900, level: "Pro" },
  { rank: 2, name: "Marcus Johnson", creditScore: 780, xp: 7800, level: "Pro" },
  { rank: 3, name: "Alex Rivera", creditScore: 450, xp: 2340, level: "Intermediate" },
  { rank: 4, name: "Sofia Rodriguez", creditScore: 420, xp: 2100, level: "Intermediate" },
  { rank: 5, name: "Liam O'Connor", creditScore: 380, xp: 1900, level: "Intermediate" },
  { rank: 6, name: "Zara Patel", creditScore: 310, xp: 1550, level: "Beginner" },
  { rank: 7, name: "Noah Kim", creditScore: 290, xp: 1450, level: "Beginner" },
  { rank: 8, name: "Isabella Santos", creditScore: 270, xp: 1350, level: "Beginner" },
];

export const teams = [
  {
    id: "1",
    name: "Design Wizards",
    members: ["Alex Rivera", "Emma Chen", "Sofia Rodriguez"],
    activeTasks: 3,
    completedTasks: 12,
  },
  {
    id: "2",
    name: "Code Crafters",
    members: ["Marcus Johnson", "Liam O'Connor"],
    activeTasks: 2,
    completedTasks: 8,
  },
];

export const clientTasks: Task[] = [
  {
    id: "c1",
    title: "Design a simple logo for a coffee shop",
    description: "Looking for a minimalist logo design for a new coffee shop.",
    budget: 50,
    difficulty: "Beginner",
    category: "Design",
    postedBy: "You",
    applicants: 12,
  },
  {
    id: "c2",
    title: "Build a landing page mockup in Figma",
    description: "Design a modern landing page for a SaaS product.",
    budget: 100,
    difficulty: "Intermediate",
    category: "UI/UX Design",
    postedBy: "You",
    applicants: 8,
  },
];

export const applicants = [
  { id: "1", name: "Emma Chen", creditScore: 890, rating: 4.9, appliedAt: "2 hours ago" },
  { id: "2", name: "Sofia Rodriguez", creditScore: 420, rating: 4.7, appliedAt: "5 hours ago" },
  { id: "3", name: "Zara Patel", creditScore: 310, rating: 4.5, appliedAt: "1 day ago" },
];
