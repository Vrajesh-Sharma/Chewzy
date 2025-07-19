# Chewzy 🍽️

Chewzy is a modern restaurant discovery and review platform built with React, TypeScript, and Supabase. The platform helps users explore local restaurants, read reviews, and make informed dining decisions.

## 🚀 Features

- **Restaurant Discovery**: Browse and explore local restaurants
- **Detailed Restaurant Pages**: View comprehensive information about each restaurant
- **Reviews and Ratings**: Read and submit restaurant reviews
- **Modern UI**: Built with Shadcn UI components for a sleek user experience
- **Responsive Design**: Fully responsive layout that works on all devices
- **Contact Form**: Easy way to get in touch with feedback or inquiries

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Database & Backend**: Supabase
- **Type Safety**: TypeScript
- **State Management**: React Hooks
- **Form Handling**: React Hook Form

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Vrajesh-Sharma/Chewzy.git
cd Chewzy/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Then edit `.env` with your Supabase credentials.

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── integrations/  # External service integrations
│   ├── hooks/         # Custom React hooks
│   ├── lib/          # Utility functions
│   └── assets/       # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Environment Variables

The following environment variables are required:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📄 Author

Made with love by **Vrajesh Sharma**