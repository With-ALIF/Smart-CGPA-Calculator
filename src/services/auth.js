import { supabase } from './supabase';

export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const logIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const logOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) return null;
  return user;
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) return null;
  return session;
};

export const updateProfile = async (updates) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: { message: 'Not logged in' } };

  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id);
  
  return { data, error };
};
