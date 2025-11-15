declare module "@env" {
  export const EXPO_PUBLIC_YOUR_REACT_NATIVE_SUPABASE_PUBLISHABLE_KEY: string;
  export const EXPO_PUBLIC_YOUR_REACT_NATIVE_SUPABASE_URL: string;
  // Add all your EXPO_PUBLIC_ variables here
}

// Also add types for process.env (for Expo's built-in env)
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_YOUR_REACT_NATIVE_SUPABASE_PUBLISHABLE_KEY: string;
    EXPO_PUBLIC_YOUR_REACT_NATIVE_SUPABASE_URL: string;
  }
}
