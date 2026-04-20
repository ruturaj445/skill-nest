# SkillNest - Student-First Freelancing Platform 🎯

A modern, premium UI/UX platform designed for students aged 16-25 to learn, practice, and earn through micro freelance tasks.

## ✨ Features

### Authentication & Onboarding
- **Dual Role System**: Students and Clients
- Simple signup/login flow with role selection
- Clean, modern authentication UI

### Student Dashboard
- **Credit Score System**: Visual representation with progress tracking
  - Formula: `(Tasks × 10) + (Rating × 5) - (Late × 3)`
  - Dynamic level progression (Beginner → Intermediate → Pro)
- **Skill Journey Tracker**: Learn → Practice → Earn → Level Up
- **Task Management**: View applied and completed tasks
- **Gamification**: Badges, XP, and achievement system

### Client Dashboard
- **Task Posting**: Easy-to-use form for creating new tasks
- **Applicant Management**: View and hire students
- **Escrow System**: Mock payment security with "Payment Secured" badges
- **Real-time Stats**: Active tasks, applicants, completed work

### Micro-Task Marketplace
- **Advanced Filtering**: Search by keyword, category, difficulty
- **Task Cards**: Beautiful card-based UI with all relevant info
- **Featured Tasks**: Highlighted beginner-friendly opportunities
- **Sorting Options**: Recent, budget, applicants

### Task Detail Page
- **Comprehensive View**: Full description, requirements, competition level
- **AI Task Assistant**: Click "Get AI Help" for:
  - Step-by-step breakdowns
  - Quick tips and suggestions
  - Success checklist
  - Interactive chat for questions
- **Escrow Information**: Payment security details
- **One-click Apply**: Simple application process

### Team Collaboration
- **Create/Join Teams**: Work together on tasks
- **Team Benefits**: 20% bonus credits on team tasks
- **Team Dashboard**: Track active and completed team projects
- **Leaderboard**: See top performers with credit scores

### Gamification Elements
- **Credit Score**: Primary metric for student success
- **Badges**: Starter, Rising Talent, Fast Learner, Pro, Expert
- **Levels**: Beginner, Intermediate, Pro
- **XP System**: Experience points for leveling up
- **Progress Bars**: Visual feedback on skill development

## 🎨 Design System

### Color Theme
- **Primary**: Purple to Blue gradient (`from-purple-600 to-blue-600`)
- **Accent Colors**: 
  - Green (Success, Beginner)
  - Blue (Intermediate)
  - Purple (Advanced)
  - Amber (Pro tier)

### UI Components
- Card-based layouts with soft shadows
- Rounded corners (xl, 2xl)
- Smooth animations (Framer Motion)
- Gradient backgrounds and buttons
- Custom scrollbar with brand colors

### Typography
- Clean, readable font hierarchy
- Bold headings for impact
- Medium weight for emphasis
- Proper line-height for readability

## 🚀 Tech Stack

- **React** with TypeScript
- **React Router** for navigation
- **Motion (Framer Motion)** for animations
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Sonner** for toast notifications

## 📱 Pages

1. **Landing** (`/`) - Authentication with role selection
2. **Student Dashboard** (`/student`) - Student overview and stats
3. **Client Dashboard** (`/client`) - Client task management
4. **Marketplace** (`/marketplace`) - Browse all available tasks
5. **Task Detail** (`/task/:id`) - Detailed task view with AI assistant
6. **Teams** (`/teams`) - Team collaboration and leaderboard

## 🎯 Key Flows

### Student Journey
1. Sign up as a student
2. View dashboard with credit score and progress
3. Browse marketplace for tasks
4. Click on task → View details
5. Get AI help to understand requirements
6. Apply for task
7. Complete task → Earn credits → Level up

### Client Journey
1. Sign up as a client
2. Post a new task with details
3. View applicants with credit scores
4. Hire a student
5. Payment secured in escrow
6. Release payment upon completion

## 💡 Unique Features

1. **AI Task Assistant**: Breaks down tasks into manageable steps for beginners
2. **Credit Score Formula**: Transparent scoring system
3. **Skill Journey Visualization**: Clear path from learning to earning
4. **Team Collaboration**: Work together for bonus rewards
5. **Escrow System**: Build trust with secure payments
6. **Gamification**: Make freelancing fun and engaging

## 🎨 Design Inspiration

Styled after modern SaaS products like:
- Stripe (clean, minimal)
- Notion (organized, intuitive)
- Linear (premium, smooth animations)

## 📊 Mock Data

The platform includes comprehensive mock data:
- 8+ sample tasks across various categories
- User profiles with credit scores
- Team information
- Leaderboard rankings
- Applicant data

Perfect for demos, hackathons, and presentations!

---

Built with ❤️ for students ready to start their freelancing journey
