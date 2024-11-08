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

//Categorias
export async function getCategories() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('categories')  // Asumiendo que tienes una tabla 'categories'
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }

  return data;
}


export async function getNumberProjects(userId: string) {
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

  return data.length;
}

export async function getImageProfileUrl(bannerFile : File | null){
  if (bannerFile) {
    // Reemplazar espacios y caracteres especiales en el nombre del archivo
    // Normalizar el nombre del archivo eliminando espacios y caracteres especiales
    const sanitizedFileName = bannerFile.name
        .normalize("NFD") // Descompone caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
        .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
        .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres no permitidos

    // Sube la imagen al bucket de Supabase
    const { error: uploadError } = await supabase.storage
        .from("Images_Projects")
        .upload(`profiles/${sanitizedFileName}`, bannerFile);

    if (uploadError) {
        console.error("Error al subir la imagen:", uploadError.message);
        return;
    }

    // Obtener la URL pública de la imagen
    const { data: urlData } = supabase.storage
        .from("Images_Projects")
        .getPublicUrl(`profiles/${sanitizedFileName}`);

    const projectBannerUrl = urlData?.publicUrl || "";
    console.log(projectBannerUrl);

    if (!projectBannerUrl) {
        console.error("Error: No se pudo obtener la URL de la imagen");
        return;
    }
    return projectBannerUrl;
}
}

export async function getBannerProfileUrl(bannerFile : File | null){
  if (bannerFile) {
    // Reemplazar espacios y caracteres especiales en el nombre del archivo
    // Normalizar el nombre del archivo eliminando espacios y caracteres especiales
    const sanitizedFileName = bannerFile.name
        .normalize("NFD") // Descompone caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Elimina los acentos
        .replace(/\s+/g, "_") // Reemplaza espacios con guiones bajos
        .replace(/[^a-zA-Z0-9._-]/g, ""); // Elimina caracteres no permitidos

    // Sube la imagen al bucket de Supabase
    const { error: uploadError } = await supabase.storage
        .from("Images_Projects")
        .upload(`profiles/${sanitizedFileName}`, bannerFile);

    if (uploadError) {
        console.error("Error al subir la imagen:", uploadError.message);
        return;
    }

    // Obtener la URL pública de la imagen
    const { data: urlData } = supabase.storage
        .from("Images_Projects")
        .getPublicUrl(`profiles/${sanitizedFileName}`);

    const projectBannerUrl = urlData?.publicUrl || "";
    console.log(projectBannerUrl);

    if (!projectBannerUrl) {
        console.error("Error: No se pudo obtener la URL de la imagen");
        return;
    }
    return projectBannerUrl;
}
}