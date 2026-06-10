import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase env vars missing')
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '')

export async function handleRegister({ email, password, firstName, lastName }) {
  try {
    const { data: authData, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error.message;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: authData.user.id, first_name: firstName, last_name: lastName, email });
    if (profileError) throw profileError;

    return authData.user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function userProfile(user_id) {
  try {
    const { data, error } = await supabase
      .from("profiles").select("*").eq("id", user_id).single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function handleLogin({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function addExpense({ user_id, title, amount, category }) {
  try {
    const { data, error } = await supabase
      .from("expenses")
      .insert({ user_id, title, amount, category })
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function handleExpense({ user_id }) {
  try {
    const { data, error } = await supabase
      .from("expenses").select("*").eq("user_id", user_id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

export async function addSubscriptions({ user_id, name, amount, category, billing_cycle, renewal_date }) {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .insert({ user_id, name, amount, category, billing_cycle, renewal_date })
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function handleSubscriptions({ user_id }) {
  try {
    const { data, error } = await supabase
      .from("subscriptions").select("*").eq("user_id", user_id)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

export async function deleteExpense(id) {
  try {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

export async function deleteSubscription(id) {
  try {
    const { error } = await supabase
      .from("subscriptions")
      .delete()
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}