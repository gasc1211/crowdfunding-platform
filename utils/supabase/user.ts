import supabase from './client';
import {UsuarioProductor} from "@/lib/definitions"

export const getDataUser = async (userName : string | null) => {
    const { data, error } = await supabase
    .from('users')
    .select('username, first_name, last_name, email')
    .eq("username", userName);

  if (error) {
    console.error('Error fetching posts:', error.message);
    throw new Error('Error fetching posts');
  }
  
  const userData : UsuarioProductor = {
    username: data[0].username,
    first_name: data[0].first_name,
    last_name: data[0].last_name,
    email: data[0].email
  };

  return userData;
};
