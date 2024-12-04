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

export async function isProducer(userId: string): Promise<boolean> {
  // Buscamos si el `user_id` existe en la tabla `producer`
  const { data, error } = await supabase
    .from("producer")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Retornamos false si no se encuentra el usuario
      return false;
    }
    console.error("Error checking producer status:", error);
    throw error;
  }

  return !!data; // Si hay datos, el usuario es productor
}

export async function isAdmin(userId: string): Promise<boolean> {
  // Buscamos si el `user_id` existe en la tabla `admin`
  const { data, error } = await supabase
    .from("admin")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Retornamos false si no se encuentra el usuario
      return false;
    }
    console.error("Error checking admin status:", error);
    throw error;
  }

  return !!data; // Si hay datos, el usuario es admin
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

export async function getProjectsByUserCategory(categoryId: string, producerId: string) {

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
    .eq('project_categories.category_id', categoryId)
    .eq('producer_id', producerId);

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

//Project Categories
export async function getProjectCategory(projectId: string) {
 
  const { data, error } = await supabase
    .from('project_categories') 
    .select('*')
    .eq('project_id', projectId);

  if (error) {
    console.error('Error fetching category:', error);
    throw new Error('Failed to fetch category');
  }

  return data as ProjectCategories[];
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
    console.error('Error fetching user project:', error);
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

export async function updateProjectTotalInvested(project: Project) {
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

export async function getComments(projectId: string) {

  // Query Supabase for the projects of the current user
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('project_id', projectId); 

  if (error) {
    console.error('Error fetching user projects:', error);
    throw new Error('Failed to fetch user projects');
  }

  return data;
}

export async function getUserByUserId(userId : string) {

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
}


export async function updateProject(project : ProjectUpdate) {
   // Update `projects` table
   const { error: projectError } = await supabase
   .from('projects')
   .update({
     name: project.name,
     description: project.description,
     beneficios: project.beneficios,
     investment_goal: project.investment_goal,
     location: project.location,
     progress: project.progress,
     project_banner_url: project.project_banner_url,
     start_date: project.start_date,
     expected_finish_date: project.expected_finish_date,
   })
   .eq('project_id', project.project_id)

   if (projectError) throw projectError
}


export async function updateProjectCategory(projectId : string, selectedCategories : string[]) {
  // Update `projects` table
  const { error: deleteCategoriesError } = await supabase
        .from('project_categories')
        .delete()
        .eq('project_id', projectId)

      if (deleteCategoriesError) throw deleteCategoriesError

      const categoryInserts = selectedCategories.map(categoryId => ({
        project_id: projectId,
        category_id: categoryId,
      }))
      const { error: insertCategoriesError } = await supabase
        .from('project_categories')
        .insert(categoryInserts)

      if (insertCategoriesError) throw insertCategoriesError
}


export async function deleteImage(imageId: string, imageUrl: string | null) {

    // Delete image from Supabase Storage
    const filePath = imageUrl!.replace(
      'https://gilshduccaooacxohhud.supabase.co/storage/v1/object/public/Images_Projects/',
      ''
    );
    
    const { error: storageError } = await supabase.storage
        .from('Images_Projects')
        .remove([filePath]);
        console.log("se borro: ", filePath)
        if (storageError) {
          console.error('Error deleting image from storage:', storageError.message);
          throw new Error('Failed to delete image from Supabase Storage.');
        }
    
    

    // Delete image record from `project_images` table
    const { error: tableError } = await supabase
      .from('project_images')
      .delete()
      .eq('image_id', imageId);

    if (tableError) throw tableError;
}

export async function deleteBannerImage(projectId: string, imageUrl: string | null) {

  // Delete image from Supabase Storage
  const filePath = imageUrl!.replace(
    'https://gilshduccaooacxohhud.supabase.co/storage/v1/object/public/Images_Projects/',
    ''
  );
  
  const { error: storageError } = await supabase.storage
      .from('Images_Projects')
      .remove([filePath]);
      console.log("se borro: ", filePath)
      if (storageError) {
        console.error('Error deleting image from storage:', storageError.message);
        throw new Error('Failed to delete image from Supabase Storage.');
      }
  
  
  // update image record from `projects` table
  const { error: tableError } = await supabase
    .from('projects')
    .update({project_banner_url: ""})
    .eq('project_id', projectId);

  if (tableError) throw tableError;
}



//Insert url's images to the database

export async function insertImageUrls(imageUrls: string[], projectId: string) {
  const imageInserts = imageUrls.map((url) => ({
    project_id: projectId,
    image_url: url,
  }));

  const { error } = await supabase.from("project_images").insert(imageInserts);

  if (error) {
    console.error("Error saving image URLs:", error);
    throw new Error("Failed to save image URLs to the database.");
  }
}


export async function getNotifications(userId: string) {
  const { data, error } = await supabase
    .from("notifications") // Your notifications table
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return data || [];
}


export async function updateRead(notificationId: string) {
  const { error } = await supabase
    .from("notifications") // Your notifications table
    .update({ read: true }) // Set the 'read' field to true
    .eq("notification_id", notificationId); // Match the notification by its ID

  if (error) {
    throw error;
  }
}
