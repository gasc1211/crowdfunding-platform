'use server'

import { createClient } from '@/utils/supabase/client'
import { auth } from '@clerk/nextjs/server'


// Initialize Supabase client
const supabase = createClient();

export async function getUserData() {
  // Get the user's Clerk session
  const { userId }: { userId: string | null } = await auth()
  console.log("id de usuario " + userId);
  if (!userId) {
    throw new Error('Not authenticated')
  }


  // Query Supabase for the user's data
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', userId)
    .single()
  if (error) {
    console.error('Error fetching user data:', error)
    throw new Error('Failed to fetch user data')
  }

  return data
}

// In app/api/handler.ts

export async function getUserProjects(userId: string) {
  const supabase = createClient();

  // Query Supabase for the projects of the current user
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('producer_id', userId); // Filter by the producer's user_id

  if (error) {
    console.error('Error fetching user projects:', error);
    throw new Error('Failed to fetch user projects');
  }

  return data;
}


export async function getAllProjects() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')

  if (error) {
    console.error('Error fetching user projects:', error);
    throw new Error('Failed to fetch user projects');
  }

  return data;
}


export async function getUserId() {
  // Get the user's Clerk session
  const { userId }: { userId: string | null } = await auth()
  if (!userId) {
    throw new Error('Not authenticated')
  }


  // Query Supabase for the user's data
  const { data, error } = await supabase
    .from('users')
    .select('user_id')
    .eq('auth_id', userId)
    .single()
  if (error) {
    console.error('Error fetching user data:', error)
    throw new Error('Failed to fetch user data')
  }
  if (!data) {
    throw new Error('User data not found');
  }

  return data
}

