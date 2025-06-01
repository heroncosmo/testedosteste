#!/bin/bash

# Ensure environment variables are available
echo "Setting up environment variables..."
export VITE_SUPABASE_URL=${VITE_SUPABASE_URL:-"https://jeiuatygpnisjxlemgpe.supabase.co"}
export VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY:-"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplaXVhdHlncG5pc2p4bGVtZ3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwOTQzNzYsImV4cCI6MjA2MzY3MDM3Nn0.MDEn6jlAr5gOQj-3zDyXih7jcsvKaZX9bVG6sse-BkA"}

# Run the build
echo "Starting build process..."
npm run build 