# Modern Resume Builder

A fully responsive and modern resume builder web application built with React, TypeScript, and Tailwind CSS. Create professional resumes with real-time preview, AI suggestions, and PDF export capabilities.

## 🚀 Features

- **Modern UI/UX Design**: Clean, professional layout with glassmorphism effects and smooth animations
- **Fully Responsive**: Optimized for both desktop and mobile devices
- **Real-time Preview**: See your resume update instantly as you type
- **Dark Mode Support**: Toggle between light and dark themes
- **PDF Export**: Download your resume as a professional PDF
- **AI-Powered Suggestions**: Get smart content suggestions for summaries and job descriptions
- **Form Validation**: Built-in validation using Zod schema
- **Professional Templates**: Clean, ATS-friendly resume layout
- **Smooth Animations**: Enhanced user experience with Framer Motion

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Zod** - Schema validation
- **jsPDF & html2canvas** - PDF generation
- **Vite/Create React App** - Build tooling

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

## 🏃‍♂️ Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── InputField.tsx
│   ├── TextArea.tsx
│   ├── SectionCard.tsx
│   ├── ThemeToggle.tsx
│   └── ResumePreview.tsx
├── context/            # React context providers
│   └── ThemeContext.tsx
├── pages/              # Main application pages
│   ├── HomePage.tsx
│   └── ResumeBuilder.tsx
├── schema/             # Zod validation schemas
│   └── resumeSchema.ts
├── utils/              # Utility functions
│   ├── pdfExport.ts
│   └── aiSuggestions.ts
└── index.css           # Global styles
```

## 🎨 Key Components

### HomePage
- Hero section with gradient backgrounds
- Feature highlights
- Navigation to resume builder
- Responsive design with animations

### ResumeBuilder
- Form-based interface for resume data entry
- Real-time preview panel
- AI suggestion integration
- PDF export functionality
- Section management (add/remove items)

### ResumePreview
- Professional resume layout
- Print-ready formatting
- Dynamic content rendering
- Dark mode support

## 🤖 AI Features

The application includes placeholder AI suggestion functions:

- **Summary Generation**: AI-powered professional summary suggestions
- **Job Description Enhancement**: Smart job description improvements
- **Skills Suggestions**: Context-aware skill recommendations

*Note: These are placeholder functions. In a production environment, you would integrate with actual AI services like OpenAI GPT or similar.*

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🎯 Usage

1. **Fill Personal Information**: Start with basic contact details
2. **Add Professional Summary**: Write or use AI suggestions for your summary
3. **Add Experience**: Include your work history with AI-enhanced descriptions
4. **Add Education**: Include your educational background
5. **Add Skills**: Categorize your skills by type and proficiency level
6. **Preview**: Review your resume in real-time
7. **Export**: Download as PDF when ready

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 🌙 Theme Support

The application supports both light and dark themes:
- Automatic system preference detection
- Manual theme toggle
- Persistent theme selection
- Smooth transitions between themes

## 📄 PDF Export

PDF export functionality includes:
- High-quality rendering
- A4 format optimization
- Professional styling
- Cross-browser compatibility

## 🚀 Future Enhancements

- [ ] Multiple resume templates
- [ ] Cloud storage integration
- [ ] Resume sharing capabilities
- [ ] ATS optimization scoring
- [ ] Real AI integration
- [ ] Resume analytics
- [ ] Cover letter generator

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from modern resume templates
- Icons from Heroicons
- Fonts from Google Fonts (Inter)
- Color palette from Tailwind CSS

---

Built with ❤️ using React and TypeScript
