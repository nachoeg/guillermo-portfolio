import { supabase } from "../lib/supabase";

const { data, error } = await supabase.from("projects").select("*");
if (error) console.error("Error loading projects", error);
const PROJECTS = data;
const TAGS = [...new Set(PROJECTS.flatMap((project) => project.tags))];

export default TAGS;
