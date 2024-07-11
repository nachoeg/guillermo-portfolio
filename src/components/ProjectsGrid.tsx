import { Project } from "./Project";
import { useStore } from "@nanostores/react";
import { tagStore } from "../store.js";
import { projectsStore } from "../store.js";

export function ProjectsGrid({ isAuth }: { isAuth: boolean }) {
  const selectedTag = useStore(tagStore);
  const projects = useStore(projectsStore);
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
    <main className="flex flex-col flex-grow gap-4 w-full mx-auto px-2 sm:px-10 max-w-screen-xl animate-fade-in">
      {!filteredProjects || filteredProjects.length === 0 ? (
        <div className="flex-grow h-full rounded-lg place-content-center text-center text-lg text-neutral-800 dark:text-neutral-300 ">
          No se encontraron proyectos
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredProjects.map((project, index) => (
            <Project
              key={index}
              data={project}
              index={index}
              isAuth={isAuth}
            ></Project>
          ))}
        </div>
      )}
    </main>
  );
}
