import { supabase } from "../lib/supabase";

const getTags = async () => {
  const { data, error } = await supabase.from("projects").select("tags");
  if (error) console.error("Error loading projects", error);
  const PROJECTS = data;
  return [...new Set(PROJECTS?.flatMap((project) => project.tags))];
};

export default getTags;
