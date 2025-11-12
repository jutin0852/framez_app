# Framez

A modern mobile social application built with React Native that allows users to share moments through posts with images and text. Inspired by Instagram's clean design, Framez provides a seamless experience for creating, viewing, and managing posts in real-time.

## Demo

**Video Demo:** https://drive.google.com/file/d/1CmEgzx8KjVyesy-GJF5eySugJ9t1T5uf/view?usp=sharing
**Live App (Android):** [Try on Appetize.io](#)  

## Features

### Authentication
- Secure user registration and login
- Persistent sessions across app restarts
- Protected routes with automatic redirection
- Session management and logout functionality

### Posts
- Create posts with text content and optional images
- Real-time feed displaying posts from all users
- Image upload and storage
- Expandable text with "Show more/less" functionality
- Instant updates when new posts are created or deleted

### Profile
- Personal profile displaying user information and avatar
- View all posts created by the logged-in user
- Post count tracking
- Profile editing capabilities

### User Interface
- Clean, Instagram-inspired design
- Smooth animations and transitions
- Responsive layout for all device sizes
- Adaptive theming support
- Loading states and error handling

## Tech Stack

### Frontend
- **React Native** - Cross-platform mobile framework for iOS and Android
- **Expo SDK 52** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript for better code quality
- **NativeWind** - Tailwind CSS integration for React Native styling

### Backend - Supabase
- **Authentication** - User management and secure sessions
- **PostgreSQL Database** - Relational data storage with real-time capabilities
- **Storage** - Cloud storage for user-uploaded images
- **Real-time Subscriptions** - Live updates for posts feed

### State Management
- **React Context API** - Global authentication state

### Additional Libraries
- **expo-image-picker** - Camera and gallery image selection
- **@supabase/supabase-js** - Supabase JavaScript client

## Why Supabase?

Supabase was chosen as the backend solution for several key reasons:

### Real-time Capabilities
Supabase provides built-in PostgreSQL real-time subscriptions, allowing the app to instantly update the feed when users create or delete posts without requiring manual refresh or polling. This creates a responsive, live experience similar to modern social platforms.

### Integrated Authentication
Supabase Auth offers a complete authentication system out of the box, including secure user registration, login, session management, and JWT-based authentication. This eliminates the need to build custom authentication logic and ensures security best practices.

### Cloud Storage
Supabase Storage provides a seamless solution for handling user-uploaded images with built-in CDN delivery, image optimization, and security policies. Images are stored efficiently and served quickly to users.

### Row Level Security (RLS)
PostgreSQL's Row Level Security, integrated with Supabase, allows fine-grained access control at the database level. This ensures users can only access and modify data they're authorized to, providing security without complex backend logic.

### Type Safety and Developer Experience
Supabase generates TypeScript types directly from the database schema, providing excellent developer experience with autocomplete and type checking. The JavaScript client library is intuitive and well-documented.

### Cost Effective
Supabase offers a generous free tier suitable for development and small-scale production deployments, making it ideal for this project while providing a clear path to scale.

## Supabase Features Used

### 1. Authentication (Supabase Auth)

**Implementation:**
- Email/password authentication

**Benefits:**
- No need to build custom authentication backend
- Secure password hashing and storage
- Built-in email verification support
- Session management handled automatically

## Project Structure

```
framez/
├── app/                          # Expo Router app directory
│   ├── (auth)/                  # Authentication screens
│   │   ├── login.tsx            # Login screen
│   │   └── signup.tsx           # Registration screen
│   ├── (tabs)/                  # Main application tabs
│   │   ├── index.tsx            # Home feed
│   │   ├── create.tsx           # Create post screen
│   │   └── profile.tsx          # User profile
│   └── _layout.tsx              # Root layout with auth protection
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components
│   │   ├── Avatar.tsx           # User avatar component
│   │   ├── Button.tsx           # Custom button component
│   │   └── Spinner.tsx          # Loading spinner
│   ├── Post.tsx                 # Post display component
│   └── themed-view.tsx          # Themed container
├── context/                      # React Context providers
│   └── AuthContext.tsx          # Authentication state management
├── services/                     # API service layer
│   ├── authService.ts           # Authentication operations
│   ├── postService.ts           # Post CRUD operations
│   ├── userService.ts           # User data operations
│   └── imageService.ts          # Image upload and retrieval
├── types/                        # TypeScript type definitions
│   └── types.ts                 # Shared types and interfaces
├── supabase/                     # Supabase configuration
│   └── client.ts                # Supabase client setup
├── constants/                    # Application constants
├── assets/                       # Static assets (images, fonts)
├── .env                         # Environment variables
├── app.json                     # Expo configuration
├── eas.json                     # EAS Build configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript configuration
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 18 or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **Expo CLI** (will be installed with dependencies)
- **iOS Simulator** (Mac only, with Xcode) or **Android Emulator** (with Android Studio)
- **Supabase Account** (free at supabase.com)

### Installation Steps

**Step 1: Clone the Repository**

```bash
git clone https://github.com/jutin0852/framez_app
cd framez
```

**Step 2: Install Dependencies**

```bash
npm install
```

This will install all required packages including:
- React Native and Expo dependencies
- Supabase client library
- Navigation libraries
- UI components and utilities


```env
EEXPO_PUBLIC_YOUR_REACT_NATIVE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_C-Hx1Lhi5U9GhxNEQgdCLw_FIf9NH7R
EXPO_PUBLIC_YOUR_REACT_NATIVE_SUPABASE_URL=https://udgmnwpzgwttxjtnrfit.supabase.co



After the app loads, test the following:

1. **Sign Up**: Create a new account with email and password
2. **Login**: Log in with your credentials
3. **Create Post**: Add a text post
4. **Upload Image**: Create a post with an image
5. **View Feed**: See your post appear in the feed
6. **Profile**: Check your profile shows your posts
7. **Logout**: Sign out and verify you're redirected to login

If all steps work, your installation is complete.
