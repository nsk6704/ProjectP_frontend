# Charitam - Placement Management System

A modern web application built with Next.js for managing student placements, designed with a brutalist aesthetic and powerful features for students, placement coordinators, and administrators.

## 🚀 Features

### For Students
- **Dashboard**: Overview of placement statistics and opportunities
- **Profile Management**: Complete academic and personal information
- **Job Applications**: Apply for placement opportunities
- **Application Tracking**: Monitor application status in real-time
- **Resume Builder**: Create and manage professional resumes

### For Student Placement Coordinators (SPC)
- **Company Management**: Add and manage recruiting companies
- **Opportunity Creation**: Post new placement opportunities
- **Student Management**: Oversee student profiles and applications
- **Analytics**: Track placement statistics and success rates
- **Announcement System**: Communicate with students

### For Administrators
- **System Overview**: Complete system analytics and insights
- **User Management**: Manage students, coordinators, and permissions
- **Report Generation**: Generate comprehensive placement reports
- **Settings Configuration**: System-wide configuration management

## 🛠 Tech Stack

- **Framework**: [Next.js 15.5.0](https://nextjs.org/) with React 19.1.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with brutalist design system
- **Authentication**: [Clerk](https://clerk.com/) for secure user management
- **UI Components**: [Radix UI](https://www.radix-ui.com/) with custom styling
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode

## 🎨 Design Philosophy

Charitam features a unique **brutalist design** approach with:
- Bold, high-contrast colors
- Heavy black borders and dramatic shadows
- Geometric layouts with intentional imperfections
- Playful rotations and transformations
- Accessible, readable typography

## 📁 Project Structure

```
charitam/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.js            # Root layout with providers
│   ├── page.js              # Landing page
│   ├── not-found.js         # Custom 404 page
│   ├── onboarding/          # User role selection
│   ├── student/             # Student dashboard and features
│   ├── spc/                 # SPC dashboard and management
│   ├── admin/               # Admin panel
│   └── sign-in/             # Authentication pages
├── components/
│   ├── ui/                  # Reusable UI components
│   └── theme-provider.jsx   # Theme context provider
├── lib/
│   └── utils.js             # Utility functions
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Clerk account for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd charitam
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 User Roles & Access

### Student Access
- Complete profile with academic details
- Browse and apply for opportunities
- Track application status
- Manage resume and documents

### SPC (Student Placement Coordinator) Access
- Manage company partnerships
- Create and manage job postings
- Review student applications
- Generate placement reports

### Admin Access
- Full system oversight
- User management and permissions
- System analytics and reporting
- Configuration management

## 🎨 Customization

### Theme Configuration

Charitam uses a custom brutalist theme defined in `globals.css`. Key design tokens:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  /* ... more variables */
}
```

### Component Styling

Components use Tailwind CSS with custom utility classes for the brutalist aesthetic:
- `border-4 border-black` for heavy borders
- `shadow-[8px_8px_0px_0px_black]` for dramatic shadows
- `rotate-[-2deg]` for playful rotations
- `font-black` for bold typography

## 📱 Responsive Design

Charitam is fully responsive with:
- Mobile-first design approach
- Adaptive layouts for tablet and desktop
- Touch-friendly interactive elements
- Optimized performance across devices

## 🔒 Security

- **Authentication**: Secure user authentication with Clerk
- **Authorization**: Role-based access control
- **Data Protection**: Secure handling of sensitive student data
- **Environment Variables**: Secure configuration management

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically on every push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🏗 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Integration with external job boards
- [ ] AI-powered resume optimization
- [ ] Automated interview scheduling

---

**Charitam** - Built with ❤️ using Next.js and modern web technologies by Saketh and Kushagra - the 2 Wise Men.