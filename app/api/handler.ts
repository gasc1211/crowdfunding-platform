//app/api/handler.ts
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

export async function getUserProjects(userId: string) {
  const supabase = createClient();

  // Query Supabase for the projects of the current user
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('producer_id', userId); 

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
  const { userId }: { userId: string | null } = await auth()
  if (!userId) {
    throw new Error('Not authenticated')
  }


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

//Categorias
export async function getCategories() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('categories') 
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }

  return data;
}

export async function getProjectsByCategory(categoryId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('projects')
    .select(`
        project_id,
        producer_id,
        project_banner_url,
        name,
        description,
        start_date,
        expected_finish_date,
        finish_date,
        progress,
        investment_goal,
        total_invested,
        location,
        project_categories!inner(category_id)
    `)
    .eq('project_categories.category_id', categoryId);

  if (error) {
    console.error('Error fetching projects by category:', error);
    throw new Error('Failed to fetch projects by category');
  }

  // Map the data to ensure category_id is included
  const mappedData = data.map((project) => ({
    ...project,
    category_id: categoryId, // Add the category_id to each project
  }));

  return mappedData;
}
