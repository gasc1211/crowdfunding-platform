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

//Obtener perfil de productor
export async function getProductorData( userId: string ) { 
  // Query Supabase
  const { data, error } = await supabase
    .from('producer')
    .select()
    .eq('user_id', userId)
  
  if (error) {
    console.error('Error fetching user data:', error)
    throw new Error('Failed to fetch user data')
  }

  // Verificar si el usuario no existe en la tabla
  if (!data || data.length === 0) {
    console.warn('User does not exist in the producer table');
  }

  return data
}

export async function getInversorData() {
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

  const { data, error } = await supabase
    .from('projects')
    .select(`
        project_id,
        producer_id,
        project_banner_url,
        name,
        description,
        beneficios,
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
  /* console.log("mapperData", mappedData) */
  return mappedData;
}


export async function getNumberProjects(userId: string) {

  // Query Supabase for the projects of the current user
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('producer_id', userId); // Filter by the producer's user_id

  if (error) {
    console.error('Error fetching user projects:', error);
    throw new Error('Failed to fetch user projects');
  }

  return data.length;
}


//Project Categories
export async function getAllProjectCategories() {
 
  const { data, error } = await supabase
    .from('project_categories') 
    .select('*')

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }

  return data;
}


export async function getUserByProjectId(producerId: string) {

  // Query Supabase for the user's data
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', producerId)
    .single()
  if (error) {
    console.error('Error fetching user data:', error)
    throw new Error('Failed to fetch user data')
  }

  return data
}


export async function getProject(projectId: string): Promise<Project | null> {

  // Query Supabase for the projects of the current user
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('project_id', projectId)
    .single(); 

  if (error) {
    console.error('Error fetching user projects:', error);
    throw new Error('Failed to fetch user projects');
  }

  return data as Project;
}


export async function getUrls(projectId: string) {
  console.log('ProjectId handler', projectId)
  // Query Supabase for the projects of the current user
  const { data, error } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', projectId); 

  if (error) {
    console.error('Error fetching user projects:', error);
    throw new Error('Failed to fetch user projects');
  }
  console.log('data from handler', data)
  return data;
}

export async function updateProject(project: Project) {
  // Update field
  const { data, error } = await supabase
    .from('projects')
    .update({ total_invested: project.total_invested})
    .eq('project_id', project.project_id)
    .select(); 

    if (error) {
      console.error('Error updating project data:', error);
      throw new Error('Failed to update the project'); 
    }

    console.log(data);
  }
