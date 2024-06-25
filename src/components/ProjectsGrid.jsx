import { Project } from "./Project";
import { useStore } from "@nanostores/react";
import { tagStore } from "../store.js";
import { supabase } from "../lib/supabase";
const { data, error } = await supabase.from("projects").select("*");
if (error) console.error("error", error);
const projects = data;

export function ProjectsGrid() {
  const selectedTag = useStore(tagStore);
  function filterProjects() {
    if (selectedTag === "Todo") {
      return projects;
    } else {
      return projects.filter((project) => {
        if (project.tags) return project.tags.includes(selectedTag);
      });
    }
  }
  const filteredProjects = filterProjects();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {!filteredProjects || filteredProjects.length === 0 ? (
        <div className="col-span-full h-96 rounded-lg place-content-center text-center text-lg text-neutral-800 dark:text-neutral-300 ">
          No se encontraron proyectos
        </div>
      ) : (
        filteredProjects.map((project, index) => (
          <Project key={project.id} data={project} index={index} />
        ))
      )}
    </div>
  );
}
